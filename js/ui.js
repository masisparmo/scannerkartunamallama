// This module handles all DOM manipulation and UI updates.
import { getErrorLogs, clearErrorLogs } from './database.js';

// --- State (managed by main.js, passed to UI) ---
let selectors = {};
let currentLang = 'id';
let confirmCallback = null;
let userProfile = {};
let appLogic = {}; // To call functions from main.js

// --- Translations ---
const translations = {
    id: {
        appTitle: "SCANNER PINTAR",
        appSubtitle: "Scanner Kartu Nama & QR Code Berbasis AI",
        mainMenuBtn: "MENU UTAMA",
        themeBtn: "TEMA",
        themeBtnResults: "TEMA",
        profileBtn: "PROFIL",
        cancelBtn: "BATAL",
        doneBtn: "SELESAI",
        joinBtn: "GABUNG",
        deleteBtn: "HAPUS",
        saveBtn: "SIMPAN",
        continueBtn: "LANJUTKAN",
        eventNameLabel: "Nama Acara",
        eventNamePlaceholder: "Contoh: Pameran Konstruksi 2025",
        dateLabel: "Tanggal",
        notesLabel: "Catatan",
        notesPlaceholder: "Opsional",
        scanCardBtn: "SCAN KARTU NAMA",
        uploadGalleryBtn: "UPLOAD DARI GALERI",
        collabModeBtn: "MODE KOLABURASI TIM",
        viewResultsBtn: "LIHAT HASIL SCAN",
        collabMode: "Mode Kolaborasi:",
        collabUser: "User:",
        createCollabTitle: "Buat Sesi Kolaborasi Baru",
        createCollabSubtitle: "Masukkan nama acara untuk membuat sesi yang dapat dibagikan.",
        collabSessionNameLabel: "Nama Acara / Sesi",
        collabSessionNamePlaceholder: "Contoh: Pameran Konstruksi 2025",
        createQrBtn: "Buat QR Code",
        joinCollabTitle: "Gabung Sesi Kolaborasi",
        joinCollabInvite: "Anda diundang ke sesi",
        joinCollabPrompt: "Masukkan nama Anda:",
        sessionCreatedTitle: "Sesi Dibuat!",
        sessionCreatedSubtitle: "Bagikan QR Code ini ke tim Anda untuk bergabung.",
        confirmExitCollab: "Anda yakin ingin keluar dari sesi kolaborasi?",
        myProfileTitle: "Profil Saya",
        yourNameLabel: "Nama Anda",
        yourNamePlaceholder: "Cth: Isparmo",
        yourPositionLabel: "Jabatan Anda",
        yourPositionPlaceholder: "Cth: Marketing Manager",
        yourCompanyLabel: "Nama Perusahaan Anda",
        yourCompanyPlaceholder: "Cth: PT Multibangun Rekatama Patria",
        companyDescLabel: "Deskripsi Singkat Perusahaan",
        companyDescPlaceholder: "Cth: Spesialis Geosintetik sejak 1995...",
        saveProfileBtn: "SIMPAN PROFIL",
        scanInstructions: "Arahkan ke Kartu Nama atau QR Code",
        scanBtn: "SCAN",
        processingTitle: "Tunggu... AI Sedang Memproses...",
        processingRefining: "Memfinalisasi & Menerjemahkan Data...",
        processingSubtitle: "Mohon tunggu sebentar...",
        processingTakingPicture: "Mengambil gambar...",
        processingQRCode: "Memproses QR Code...",
        scanResultTitle: "Hasil Scan",
        totalContactsPart2: "kontak ditemukan.",
        noDataSaved: "Belum ada data tersimpan.",
        deleteAllLocalDataBtn: "HAPUS SEMUA DATA LOKAL",
        filterByTag: "Filter Berdasarkan Tag",
        clearFilter: "Hapus Filter",
        searchPlaceholder: "Cari kontak...",
        editContactTitle: "Edit Kontak",
        nameLabel: "Nama",
        positionLabel: "Jabatan",
        companyLabel: "Perusahaan",
        companyTypeLabel: "Jenis Perusahaan",
        officePhoneLabel: "Telepon Kantor",
        eventLabel: "Acara",
        tagsLabel: "Tags (label)",
        actionSaveContact: "Simpan Kontak",
        actionOpenWA: "Buka WA",
        actionDraftWA: "Draf Pesan WA",
        actionDraftEmail: "Draf Email",
        actionReminder: "Pengingat Janji",
        reminderTitle: "Buat Pengingat Janji",
        reminderTypeLabel: "Reminder Apa",
        reminderLocationLabel: "Tempat",
        reminderDateLabel: "Tanggal",
        reminderTimeLabel: "Jam",
        reminderAlarmLabel: "Waktu Pengingat",
        reminderNotesLabel: "Catatan",
        createReminderBtn: "BUAT REMINDER",
        confirmActionTitle: "Konfirmasi Tindakan",
        confirmDeleteContact: "Apakah Anda yakin ingin menghapus kontak ini dari HP Anda? Tindakan ini tidak dapat dibatalkan.",
        confirmClearAll: "Anda yakin ingin menghapus semua data LOKAL? Tindakan ini tidak akan menghapus data di Google Sheet.",
        toastContactSaved: "Kontak baru berhasil disimpan!",
        toastContactUpdated: "Kontak berhasil diperbarui!",
        toastScanCancelled: "Scan dibatalkan.",
        toastContactDeleted: "Kontak berhasil dihapus.",
        toastAllDataDeleted: "Semua data lokal telah dihapus.",
        toastProfileSaved: "Profil berhasil disimpan!",
        toastWelcome: (name) => `Selamat datang, ${name}!`,
        toastExitCollab: "Keluar dari mode kolaborasi.",
        toastLogsCopied: "Log disalin ke clipboard!",
        toastNoLogs: "Tidak ada log untuk disalin.",
        toastCouldNotCopy: "Tidak dapat menyalin log.",
        toastNoDataExport: "Tidak ada data untuk diekspor.",
        toastDownloadingCSV: "File CSV sedang diunduh.",
        toastDownloadingVCF: "File VCF sedang diunduh.",
        toastDownloadingZIP: "File ZIP sedang diunduh.",
        toastNoContactSave: "Tidak ada kontak untuk disimpan.",
        toastGSheetSaveSuccess: (count, url) => `${count} kontak berhasil disimpan. <a href="${url}" target="_blank" class="underline">Lihat Sheet</a>`,
        toastGSheetSaveError: (msg) => `Error: ${msg}`,
        toastDataSentToGSheet: (name) => `Data terkirim ke Google Sheet: ${name}`,
        toastFailSendGSheet: (name) => `Gagal kirim: ${name}. Data aman di lokal.`,
        toastEmptyEventName: "Nama acara tidak boleh kosong.",
        toastEmptyMarketingName: "Nama marketing tidak boleh kosong.",
        toastProfileIncomplete: "Harap lengkapi profil Anda di menu Pengaturan terlebih dahulu.",
        toastReminderCreated: "Reminder berhasil dibuat dan file .ics telah diunduh.",
        footerAbout: "Tentang",
        footerHelp: "Bantuan",
        footerTerms: "Ketentuan",
        footerPrivacy: "Privasi",
        footerCopyright: "&copy; 2025 SCANNER PINTAR oleh Isparmo & M. Hasan",
        unnamedContact: "Tanpa Nama",
        qrCodeContactName: "Kontak dari QR Code",
        atCompany: "di",
        phoneLabel: "HP",
        eventLabelResult: "Acara",
        notesLabelResult: "Catatan",
        editBtn: "EDIT",
        exportCSV: "SIMPAN .csv",
        exportVCF: "SIMPAN .vcf",
        exportZIP: "SIMPAN VCF .zip",
        exportGSheet: "SIMPAN KE GOOGLE SHEET",
        exportGSheetSaving: "Menyimpan...",
        collabExportNote: "Data otomatis terkirim ke G-Sheet. Opsi ekspor di bawah hanya untuk data di HP ini."
    },
    en: {
        appTitle: "SCANNER PINTAR",
        appSubtitle: "AI-Powered Business Card Scanner",
        mainMenuBtn: "MAIN MENU",
        themeBtn: "THEME",
        themeBtnResults: "THEME",
        profileBtn: "PROFILE",
        cancelBtn: "CANCEL",
        doneBtn: "DONE",
        joinBtn: "JOIN",
        deleteBtn: "DELETE",
        saveBtn: "SAVE",
        continueBtn: "CONTINUE",
        eventNameLabel: "Event Name",
        eventNamePlaceholder: "Example: Construction Expo 2025",
        dateLabel: "Date",
        notesLabel: "Notes",
        notesPlaceholder: "Optional",
        scanCardBtn: "SCAN BUSINESS CARD",
        uploadGalleryBtn: "UPLOAD FROM GALLERY",
        collabModeBtn: "TEAM COLLABORATION MODE",
        viewResultsBtn: "VIEW SCAN RESULTS",
        collabMode: "Collaboration Mode:",
        collabUser: "User:",
        createCollabTitle: "Create New Collaboration Session",
        createCollabSubtitle: "Enter the event name to create a shareable session.",
        collabSessionNameLabel: "Event / Session Name",
        collabSessionNamePlaceholder: "Example: Construction Expo 2025",
        createQrBtn: "Create QR Code",
        joinCollabTitle: "Join Collaboration Session",
        joinCollabInvite: "You are invited to the session",
        joinCollabPrompt: "Enter your name:",
        sessionCreatedTitle: "Session Created!",
        sessionCreatedSubtitle: "Share this QR Code with your team to join.",
        confirmExitCollab: "Are you sure you want to exit the collaboration session?",
        myProfileTitle: "My Profile",
        yourNameLabel: "Your Name",
        yourNamePlaceholder: "e.g., John Doe",
        yourPositionLabel: "Your Position",
        yourPositionPlaceholder: "e.g., Marketing Manager",
        yourCompanyLabel: "Your Company Name",
        yourCompanyPlaceholder: "e.g., Global Innovations Inc.",
        companyDescLabel: "Short Company Description",
        companyDescPlaceholder: "e.g., Geosynthetics specialist since 1995...",
        saveProfileBtn: "SAVE PROFILE",
        scanInstructions: "Point at a Business Card or QR Code",
        scanBtn: "SCAN",
        processingTitle: "Wait... AI is Processing...",
        processingRefining: "Finalizing & Translating Data...",
        processingSubtitle: "Please wait a moment...",
        processingTakingPicture: "Taking picture...",
        processingQRCode: "Processing QR Code...",
        scanResultTitle: "Scan Results",
        totalContactsPart2: "contacts found.",
        noDataSaved: "No saved data yet.",
        deleteAllLocalDataBtn: "DELETE ALL LOCAL DATA",
        filterByTag: "Filter by Tag",
        clearFilter: "Clear Filter",
        searchPlaceholder: "Search contacts...",
        editContactTitle: "Edit Contact",
        nameLabel: "Name",
        positionLabel: "Position",
        companyLabel: "Company",
        companyTypeLabel: "Company Type",
        officePhoneLabel: "Office Phone",
        eventLabel: "Event",
        tagsLabel: "Tags",
        actionSaveContact: "Save Contact",
        actionOpenWA: "Open WA",
        actionDraftWA: "Draft WA",
        actionDraftEmail: "Draft Email",
        actionReminder: "Set Reminder",
        reminderTitle: "Create Appointment Reminder",
        reminderTypeLabel: "Reminder For",
        reminderLocationLabel: "Location",
        reminderDateLabel: "Date",
        reminderTimeLabel: "Time",
        reminderAlarmLabel: "Reminder Time",
        reminderNotesLabel: "Notes",
        createReminderBtn: "CREATE REMINDER",
        confirmActionTitle: "Confirm Action",
        confirmDeleteContact: "Are you sure you want to delete this contact from your phone? This action cannot be undone.",
        confirmClearAll: "Are you sure you want to delete all LOCAL data? This will not delete data in Google Sheets.",
        toastContactSaved: "New contact saved successfully!",
        toastContactUpdated: "Contact updated successfully!",
        toastScanCancelled: "Scan cancelled.",
        toastContactDeleted: "Contact deleted successfully.",
        toastAllDataDeleted: "All local data has been deleted.",
        toastProfileSaved: "Profile saved successfully!",
        toastWelcome: (name) => `Welcome, ${name}!`,
        toastExitCollab: "Exited collaboration mode.",
        toastLogsCopied: "Logs copied to clipboard!",
        toastNoLogs: "No logs to copy.",
        toastCouldNotCopy: "Could not copy logs.",
        toastNoDataExport: "No data to export.",
        toastDownloadingCSV: "CSV file is downloading.",
        toastDownloadingVCF: "VCF file is downloading.",
        toastDownloadingZIP: "ZIP file is downloading.",
        toastNoContactSave: "No contacts to save.",
        toastGSheetSaveSuccess: (count, url) => `${count} contacts saved. <a href="${url}" target="_blank" class="underline">View Sheet</a>`,
        toastGSheetSaveError: (msg) => `Error: ${msg}`,
        toastDataSentToGSheet: (name) => `Data sent to Google Sheet: ${name}`,
        toastFailSendGSheet: (name) => `Failed to send: ${name}. Data is safe locally.`,
        toastEmptyEventName: "Event name cannot be empty.",
        toastEmptyMarketingName: "Marketing name cannot be empty.",
        toastProfileIncomplete: "Please complete your profile in the Settings menu first.",
        toastReminderCreated: "Reminder created and .ics file downloaded successfully.",
        footerAbout: "About",
        footerHelp: "Help",
        footerTerms: "Terms",
        footerPrivacy: "Privacy",
        footerCopyright: "&copy; 2025 SCANNER PINTAR by Isparmo & M. Hasan",
        unnamedContact: "Unnamed",
        qrCodeContactName: "Contact from QR Code",
        atCompany: "at",
        phoneLabel: "Mobile",
        eventLabelResult: "Event",
        notesLabelResult: "Notes",
        editBtn: "EDIT",
        exportCSV: "SAVE .csv",
        exportVCF: "SAVE .vcf",
        exportZIP: "SAVE VCF .zip",
        exportGSheet: "SAVE TO GOOGLE SHEET",
        exportGSheetSaving: "Menyimpan...",
        collabExportNote: "Data otomatis terkirim ke G-Sheet. Opsi ekspor di bawah hanya untuk data di HP ini."
    }
};

export function getTranslation(key, ...args) {
    const translation = translations[currentLang][key];
    return typeof translation === 'function' ? translation(...args) : (translation || key);
}
export function getCurrentLanguage() { return currentLang; }

function updateUIText() {
    document.documentElement.lang = currentLang;
    selectors.langToggles.forEach(toggle => {
        toggle.textContent = currentLang === 'id' ? 'EN' : 'ID';
    });
    document.querySelectorAll('[data-translate-key]').forEach(el => {
        el.innerHTML = getTranslation(el.getAttribute('data-translate-key'));
    });
    document.querySelectorAll('[data-translate-key-placeholder]').forEach(el => {
        el.placeholder = getTranslation(el.getAttribute('data-translate-key-placeholder'));
    });
}

// --- Initialization ---
export function initializeSelectors() {
    selectors = {
        screens: { initial: document.getElementById('initial-screen'), scanner: document.getElementById('scanner-screen'), processing: document.getElementById('processing-screen'), results: document.getElementById('results-screen'), createSession: document.getElementById('create-session-screen'), profile: document.getElementById('profile-screen') },
        toast: document.getElementById('toast'), toastMessage: document.getElementById('toast-message'),
        themeToggles: document.querySelectorAll('#theme-toggle-initial, #theme-toggle-results'),
        langToggles: document.querySelectorAll('#lang-toggle-initial, #lang-toggle-results'),
        confirmModal: document.getElementById('confirm-modal'), confirmModalContent: document.getElementById('confirm-modal').querySelector('.modal-content'), confirmMessage: document.getElementById('confirm-message'),
        processingTitle: document.getElementById('processing-title'),
        homeContactCount: document.getElementById('home-contact-count'), resultsContactCount: document.getElementById('results-contact-count'), resultsList: document.getElementById('results-list'),
        exportButtonsContainer: document.getElementById('export-buttons-container'),
        actionModal: document.getElementById('action-modal'), actionModalContent: document.getElementById('action-modal').querySelector('.modal-content'), actionModalHeader: document.getElementById('action-modal-header'), actionModalBody: document.getElementById('action-modal-body'), actionModalFooter: document.getElementById('action-modal-footer'),
        editModal: document.getElementById('edit-modal'), editModalContent: document.getElementById('edit-modal').querySelector('.modal-content'),
        filterDropdown: document.getElementById('filter-dropdown'),
        tagFilterList: document.getElementById('tag-filter-list'),
    };
}
export function setAppLogic(logic) { appLogic = logic; }
export function setUserProfile(profile) { userProfile = profile; }

// --- Core UI Functions ---
export function showScreen(screenName) {
    Object.values(selectors.screens).forEach(screen => screen.classList.add('hidden'));
    selectors.screens[screenName]?.classList.remove('hidden');
    if (screenName === 'results') {
        refreshResults();
    }
}
export function showToast(message, duration = 3000) {
    selectors.toastMessage.innerHTML = message;
    selectors.toast.classList.remove('opacity-0', 'translate-y-5', 'pointer-events-none');
    setTimeout(() => {
        selectors.toast.classList.add('opacity-0', 'translate-y-5', 'pointer-events-none');
    }, duration);
}
export function applyTheme(isDark) {
    document.documentElement.classList.toggle('dark', isDark);
    selectors.themeToggles.forEach(toggle => {
        const sunIcon = toggle.querySelector('[data-lucide="sun"]');
        const moonIcon = toggle.querySelector('[data-lucide="moon"]');
        if(sunIcon && moonIcon){
             sunIcon.classList.toggle('hidden', isDark);
             moonIcon.classList.toggle('hidden', !isDark);
        }
    });
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
}
export function toggleTheme() { applyTheme(!document.documentElement.classList.contains('dark')); }
export function setLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('scannerLang', lang);
    updateUIText();
    refreshResults();
}
export function toggleLanguage() { setLanguage(currentLang === 'id' ? 'en' : 'id'); }
export function updateProcessingTitle(key) { selectors.processingTitle.textContent = getTranslation(key); }

// --- Modals ---
export function showConfirmModal(message, onConfirm) {
    selectors.confirmMessage.textContent = message;
    confirmCallback = onConfirm;
    selectors.confirmModal.classList.remove('hidden', 'opacity-0');
    selectors.confirmModalContent.classList.remove('scale-95', 'opacity-0');
}
export function hideConfirmModal() {
    selectors.confirmModal.classList.add('opacity-0');
    selectors.confirmModalContent.classList.add('scale-95', 'opacity-0');
    setTimeout(() => { selectors.confirmModal.classList.add('hidden'); confirmCallback = null; }, 300);
}
export function getConfirmCallback() { return confirmCallback; }
export function closeActionModal() {
    selectors.actionModal.classList.add('opacity-0');
    selectors.actionModalContent.classList.add('translate-y-full', 'sm:scale-95', 'sm:translate-y-0', 'opacity-0');
   setTimeout(() => { selectors.actionModal.classList.add('hidden'); }, 300);
}
export function closeEditModal() {
    selectors.editModal.classList.add('opacity-0');
    selectors.editModalContent.classList.add('scale-95', 'opacity-0');
    setTimeout(() => {
        selectors.editModal.classList.add('hidden');
        document.querySelector('.app-container').classList.remove('hidden');
    }, 300);
}
export function openEditModalForNewContact(contact, tagify) {
    document.querySelector('.app-container').classList.add('hidden');
    document.getElementById('edit-contact-id').value = '';
    fillEditForm(contact, tagify);
    selectors.editModal.classList.remove('hidden');
    setTimeout(() => {
        selectors.editModal.classList.remove('opacity-0');
        selectors.editModalContent.classList.remove('scale-95', 'opacity-0');
    }, 10);
}
export function openEditModal(contact, tagify) {
    if (!contact) return;
    document.querySelector('.app-container').classList.add('hidden');
    document.getElementById('edit-contact-id').value = contact.id;
    fillEditForm(contact, tagify);
    selectors.editModal.classList.remove('hidden');
    setTimeout(() => { selectors.editModal.classList.remove('opacity-0'); selectors.editModalContent.classList.remove('scale-95', 'opacity-0'); }, 10);
}
function fillEditForm(contact, tagify) {
    document.getElementById('edit-nama').value = contact.nama || '';
    document.getElementById('edit-jabatan').value = contact.jabatan || '';
    document.getElementById('edit-perusahaan').value = contact.perusahaan || '';
    document.getElementById('edit-jenis_perusahaan').value = contact.jenis_perusahaan || '';
    document.getElementById('edit-telepon_kantor').value = contact.telepon_kantor || '';
    document.getElementById('edit-whatsapp').value = contact.whatsapp || '';
    document.getElementById('edit-email').value = contact.email || '';
    tagify.removeAllTags();
    if (contact.tags && contact.tags.length > 0) {
        tagify.addTags(contact.tags);
    }
    document.getElementById('edit-acara').value = contact.acara || document.getElementById('session-acara').value;
    document.getElementById('edit-tanggal').value = contact.tanggal || document.getElementById('session-tanggal').value;
    document.getElementById('edit-catatan').value = contact.catatan || document.getElementById('session-catatan').value;
}
export function showQRCodeModal(url) {
    const qrCodeContainer = document.getElementById('qr-code-container');
    qrCodeContainer.innerHTML = '';
    new QRCode(qrCodeContainer, { text: url, width: 256, height: 256 });
    document.getElementById('show-session-qr-modal').classList.remove('hidden');
}


// --- Profile ---
export function loadAndDisplayProfile(profile) {
    document.getElementById('profile-nama').value = profile.nama || '';
    document.getElementById('profile-jabatan').value = profile.jabatan || '';
    document.getElementById('profile-perusahaan').value = profile.perusahaan || '';
    document.getElementById('profile-deskripsi').value = profile.deskripsi || '';
}
export function saveProfile() {
    const profile = {
        nama: document.getElementById('profile-nama').value,
        jabatan: document.getElementById('profile-jabatan').value,
        perusahaan: document.getElementById('profile-perusahaan').value,
        deskripsi: document.getElementById('profile-deskripsi').value,
    };
    localStorage.setItem('userProfile', JSON.stringify(profile));
    return profile;
}

// --- Results & Filtering ---
export async function refreshResults(filter = { searchTerm: '', activeTag: null }) {
    // This is a placeholder as dbLogic is not directly available.
    // In a real scenario, main.js would fetch the contacts and pass them here.
}
export function toggleFilterDropdown(){
    selectors.filterDropdown.classList.toggle('hidden');
    setTimeout(() => {
        selectors.filterDropdown.classList.toggle('opacity-0');
        selectors.filterDropdown.classList.toggle('scale-95');
    }, 10);
}
export function closeFilterDropdown(){
    if (!selectors.filterDropdown.classList.contains('hidden')) {
        selectors.filterDropdown.classList.add('hidden', 'opacity-0', 'scale-95');
    }
}


// --- Utilities ---
export function formatKantor(phone) {
    if (!phone) return '';
    let digits = phone.replace(/\D/g, '');
    if (digits.startsWith('62')) {
        digits = '0' + digits.substring(2);
    }
    return digits;
}
export function formatWA(phone) {
    if (!phone) return '';
    let digits = phone.replace(/\D/g, '');
    if (digits.startsWith('0')) {
        digits = '62' + digits.substring(1);
    }
    return digits;
}
export function setButtonLoading(button, isLoading, text = '') {
    if(!button) return;
    button.disabled = isLoading;
    if (isLoading) {
        if(!button.dataset.originalText) button.dataset.originalText = button.innerHTML;
        button.innerHTML = `<div class="loader btn-loader"></div><span class="ml-2">${text}</span>`;
    } else {
        button.innerHTML = text || button.dataset.originalText || '';
        delete button.dataset.originalText;
    }
}
export function parseVCard(vcardString) {
    const contact = {};
    vcardString.split(/[\n\r]+/).forEach(line => {
        if (!line.includes(':')) return;
        let [key, ...valueParts] = line.split(':');
        let value = valueParts.join(':').trim();
        const mainKey = key.split(';')[0].toUpperCase();

        if (mainKey === 'FN' && !contact.nama) contact.nama = value;
        else if (mainKey === 'N' && !contact.nama) { const nameParts = value.split(';'); contact.nama = `${nameParts[1] || ''} ${nameParts[0] || ''}`.trim(); }
        else if (mainKey === 'TITLE' && !contact.jabatan) contact.jabatan = value;
        else if (mainKey === 'ORG' && !contact.perusahaan) contact.perusahaan = value;
        else if (mainKey === 'EMAIL' && !contact.email) contact.email = value;
        else if (mainKey === 'TEL') {
            if (key.toUpperCase().includes('WORK') && !contact.telepon_kantor) { contact.telepon_kantor = value; }
            else if (key.toUpperCase().includes('CELL') && !contact.whatsapp) { contact.whatsapp = value; }
            else if (!contact.telepon_kantor && !contact.whatsapp) { contact.whatsapp = value; }
        }
    });
    return contact;
}
