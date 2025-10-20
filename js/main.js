import * as UI from './ui.js';
import { dbLogic, logError } from './database.js';
import * as API from './api.js';
import * as Google from './google.js';

// --- Global State ---
let stream, qrScanInterval;
let tagify;
let currentFilter = { searchTerm: '', activeTag: null };
let collaborationSession = { isActive: false, sessionId: null, sessionAcara: null, marketingName: null };
let userProfile = {};

// --- Core App Logic ---
function getLocalDateString() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${day}-${month}-${year}`;
}

function updateSigninStatus(isSignedIn) {
    if (document.getElementById('results-screen').classList.contains('hidden') === false) {
        UI.refreshResults(currentFilter);
    }
}

async function handleCollabSessionCreation(authCode) {
    const acara = document.getElementById('collab-session-name-input').value.trim();
    if (!acara) {
        UI.showToast(UI.getTranslation('toastEmptyEventName'));
        return;
    }
    await API.handleCollabSessionCreation(authCode, acara, UI);
}

// --- Camera & Scanning ---
function scanQRCode() {
    const video = document.getElementById('video');
    const canvas = document.getElementById('canvas');
    if (!video.srcObject || video.readyState !== video.HAVE_ENOUGH_DATA) return;

    const context = canvas.getContext('2d');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    const code = jsQR(imageData.data, imageData.width, imageData.height, { inversionAttempts: "dontInvert" });

    if (code) {
        stopCamera();
        if (code.data.includes('?sesi=') && code.data.includes('&acara=')) {
            window.location.href = code.data;
        } else {
            processQRCode(code.data);
        }
    }
}

async function startCamera() {
    try {
        if (stream) { stream.getTracks().forEach(track => track.stop()); }
        stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
        document.getElementById('video').srcObject = stream;
        qrScanInterval = setInterval(scanQRCode, 500);
        UI.showScreen('scanner');
    } catch (err) {
        logError("Error accessing camera", err);
        alert("Cannot access camera. Please ensure you have granted permission.");
        UI.showScreen('initial');
    }
}

function stopCamera() {
    if (qrScanInterval) clearInterval(qrScanInterval);
    qrScanInterval = null;
    if (stream) { stream.getTracks().forEach(track => track.stop()); }
}

async function captureAndProcess() {
    UI.showScreen('processing');
    UI.updateProcessingTitle('processingTakingPicture');

    const video = document.getElementById('video');
    const canvas = document.getElementById('canvas');
    const context = canvas.getContext('2d');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    stopCamera();

    const imageDataUrl = canvas.toDataURL('image/jpeg', 0.9);
    const finalData = await API.processImageWithAI(imageDataUrl, UI);
    if (finalData) {
        UI.openEditModalForNewContact(finalData, tagify);
    }
}

async function handleImageUpload(event) {
    const file = event.target.files[0];
    if (!file) return;

    UI.showScreen('processing');
    const reader = new FileReader();
    reader.onload = async (e) => {
        const finalData = await API.processImageWithAI(e.target.result, UI);
        if (finalData) {
            UI.openEditModalForNewContact(finalData, tagify);
        }
    };
    reader.readAsDataURL(file);
    event.target.value = '';
}

async function processQRCode(data) {
    UI.updateProcessingTitle('processingQRCode');
    UI.showScreen('processing');
    try {
        const contact = UI.parseVCard(data);
        UI.openEditModalForNewContact(contact, tagify);
    } catch(error) {
        logError("QR Processing Error:", error);
        UI.showToast(`Failed to process QR Code: ${error.message}`);
        UI.showScreen('initial');
    }
}

// --- Event Listeners Setup ---
function setupEventListeners() {
    // Navigation & Core Actions
    document.getElementById('start-scan-btn').addEventListener('click', startCamera);
    document.getElementById('upload-btn').addEventListener('click', () => document.getElementById('image-upload-input').click());
    document.getElementById('image-upload-input').addEventListener('change', handleImageUpload);
    document.getElementById('capture-btn').addEventListener('click', captureAndProcess);
    document.getElementById('cancel-scan-btn').addEventListener('click', () => { stopCamera(); UI.showScreen('initial'); });
    document.getElementById('view-results-btn').addEventListener('click', () => UI.showScreen('results'));
    document.getElementById('back-to-home-btn').addEventListener('click', () => UI.showScreen('initial'));
    document.getElementById('clear-all-btn').addEventListener('click', () => {
        UI.showConfirmModal(UI.getTranslation('confirmClearAll'), async () => {
            await dbLogic.clearAllContacts();
            UI.refreshResults(currentFilter);
            UI.showToast(UI.getTranslation('toastAllDataDeleted'));
        });
    });

    // Toggles
    document.querySelectorAll('#theme-toggle-initial, #theme-toggle-results').forEach(btn => btn.addEventListener('click', UI.toggleTheme));
    document.querySelectorAll('#lang-toggle-initial, #lang-toggle-results').forEach(btn => btn.addEventListener('click', UI.toggleLanguage));

    // Search and Filter
    document.getElementById('search-input').addEventListener('input', (e) => {
        currentFilter.searchTerm = e.target.value;
        UI.refreshResults(currentFilter);
    });
    document.getElementById('filter-btn').addEventListener('click', (e) => {
        e.stopPropagation();
        UI.toggleFilterDropdown();
    });
    document.getElementById('clear-filter-btn').addEventListener('click', () => {
        currentFilter.activeTag = null;
        UI.refreshResults(currentFilter);
    });
    document.body.addEventListener('click', () => UI.closeFilterDropdown());


    // Modals (Confirmation, Edit, etc.)
    document.getElementById('cancel-confirm-btn').addEventListener('click', UI.hideConfirmModal);
    document.getElementById('confirm-action-btn').addEventListener('click', () => {
        const callback = UI.getConfirmCallback();
        if (typeof callback === 'function') {
            callback();
        }
        UI.hideConfirmModal();
    });

    document.getElementById('save-edit-btn').addEventListener('click', saveContactChanges);
    document.getElementById('cancel-edit-btn').addEventListener('click', () => {
        const idValue = document.getElementById('edit-contact-id').value;
        UI.closeEditModal();
        if (!idValue) {
            UI.showToast(UI.getTranslation('toastScanCancelled'));
        }
    });
    document.getElementById('delete-contact-btn').addEventListener('click', handleDeleteContact);
    document.getElementById('close-action-modal-btn').addEventListener('click', UI.closeActionModal);

    // Profile Screen
    document.getElementById('profile-settings-btn').addEventListener('click', () => {
        UI.loadAndDisplayProfile(userProfile);
        UI.showScreen('profile');
    });
    document.getElementById('back-to-home-from-profile').addEventListener('click', () => UI.showScreen('initial'));
    document.getElementById('save-profile-btn').addEventListener('click', () => {
        userProfile = UI.saveProfile();
        UI.showToast(UI.getTranslation('toastProfileSaved'));
        UI.showScreen('initial');
    });

    // Session inputs
    document.getElementById('session-acara').addEventListener('input', (e) => localStorage.setItem('sessionAcara', e.target.value));
    document.getElementById('session-tanggal').addEventListener('input', (e) => localStorage.setItem('sessionTanggal', e.target.value));
    document.getElementById('session-catatan').addEventListener('input', (e) => localStorage.setItem('sessionCatatan', e.target.value));
}

async function saveContactChanges() {
    const idValue = document.getElementById('edit-contact-id').value;
    const isNewContact = !idValue;

    const contactData = {
        nama: document.getElementById('edit-nama').value,
        jabatan: document.getElementById('edit-jabatan').value,
        perusahaan: document.getElementById('edit-perusahaan').value,
        jenis_perusahaan: document.getElementById('edit-jenis_perusahaan').value,
        telepon_kantor: UI.formatKantor(document.getElementById('edit-telepon_kantor').value),
        whatsapp: UI.formatWA(document.getElementById('edit-whatsapp').value),
        email: document.getElementById('edit-email').value,
        acara: document.getElementById('edit-acara').value,
        tanggal: document.getElementById('edit-tanggal').value,
        catatan: document.getElementById('edit-catatan').value,
        tags: tagify.value.map(tag => tag.value)
    };

    if (isNewContact) {
        await dbLogic.addContact(contactData);
        UI.showToast(UI.getTranslation('toastContactSaved'));
    } else {
        contactData.id = parseInt(idValue);
        await dbLogic.updateContact(contactData);
        UI.showToast(UI.getTranslation('toastContactUpdated'));
    }

    if (collaborationSession.isActive) {
        UI.showToast('Sending data to Google Sheet...');
        await API.sendCollaborativeData({ ...contactData, marketingName: collaborationSession.marketingName }, UI);
    }

    UI.closeEditModal();
    UI.showScreen('results');
}

async function handleDeleteContact() {
    const idValue = document.getElementById('edit-contact-id').value;
    if (!idValue) {
        UI.closeEditModal();
        return;
    }

    UI.showConfirmModal(
        UI.getTranslation('confirmDeleteContact'),
        async () => {
            await dbLogic.deleteContact(parseInt(idValue));
            UI.showToast(UI.getTranslation('toastContactDeleted'));
            UI.closeEditModal();
            UI.refreshResults(currentFilter);
        }
    );
}

// --- Initialization ---
async function initializeApp() {
    UI.initializeSelectors();
    lucide.createIcons();

    // Load theme and language
    const savedTheme = localStorage.getItem('theme');
    UI.applyTheme(savedTheme ? savedTheme === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches);
    UI.setLanguage(localStorage.getItem('scannerLang') || 'id');

    // Load user profile
    userProfile = JSON.parse(localStorage.getItem('userProfile')) || {};
    UI.setUserProfile(userProfile);

    // Init Flatpickr & Tagify
    flatpickr("#session-tanggal", { dateFormat: "d-m-Y", defaultDate: "today" });
    flatpickr("#reminder-date", { dateFormat: "d-m-Y" });
    flatpickr("#edit-tanggal", { dateFormat: "d-m-Y" });
    tagify = new Tagify(document.getElementById('edit-tags'));

    try {
        await dbLogic.init();
        setupEventListeners();

        document.getElementById('session-acara').value = localStorage.getItem('sessionAcara') || '';
        document.getElementById('session-catatan').value = localStorage.getItem('sessionCatatan') || '';
        document.getElementById('session-tanggal').value = localStorage.getItem('sessionTanggal') || getLocalDateString();


        // Pass UI module to functions that need it
        UI.setAppLogic({
             saveToGoogleSheet: (button, contacts) => Google.saveAllToGoogleSheet(button, contacts, document.getElementById('session-acara').value, userProfile, collaborationSession, UI),
             generateAndOpenEmail: (contact) => API.generateAndOpenEmail(contact, userProfile, UI.getCurrentLanguage(), UI),
             generateAndOpenWa: (contact) => API.generateAndOpenWa(contact, userProfile, UI.getCurrentLanguage(), UI),
             openEditModal: async (id) => UI.openEditModal(await dbLogic.getContact(id), tagify),
        });

        Google.initializeGoogleClients(updateSigninStatus, handleCollabSessionCreation);
        UI.showScreen('initial');
        UI.refreshResults(currentFilter); // Initial count update

    } catch (error) {
        logError("Failed to initialize the app", error);
        document.body.innerHTML = `<div class="text-center p-8 text-red-500">Failed to load database. App cannot run.</div>`;
    }
}

function waitForGoogleApisAndInitialize() {
    if (typeof gapi !== 'undefined' && typeof google !== 'undefined') {
        initializeApp();
    } else {
        setTimeout(waitForGoogleApisAndInitialize, 100);
    }
}

document.addEventListener('DOMContentLoaded', waitForGoogleApisAndInitialize);
