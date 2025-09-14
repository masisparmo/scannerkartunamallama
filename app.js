/**
 * Listener yang dijalankan setelah seluruh konten DOM dimuat.
 * Ini adalah titik masuk utama untuk semua logika JavaScript aplikasi.
 */
document.addEventListener('DOMContentLoaded', () => {
    // Pendaftaran Service Worker untuk fungsionalitas PWA (Progressive Web App)
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('/sw.js')
                .then(registration => {
                    console.log('ServiceWorker pendaftaran berhasil dengan cakupan: ', registration.scope);
                })
                .catch(error => {
                    console.log('ServiceWorker pendaftaran gagal: ', error);
                });
        });
    }

    // Variabel global dan konstanta
    let currentLang = 'id'; // Bahasa default aplikasi

    const translations = {
        id: {
            // Judul & Teks Umum
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
            // Layar Awal
            eventNameLabel: "Nama Acara",
            eventNamePlaceholder: "Contoh: Pameran Konstruksi 2025",
            dateLabel: "Tanggal",
            notesLabel: "Catatan",
            notesPlaceholder: "Opsional",
            scanCardBtn: "SCAN KARTU NAMA",
            uploadGalleryBtn: "UPLOAD DARI GALERI",
            collabModeBtn: "MODE KOLABURASI TIM",
            viewResultsBtn: "LIHAT HASIL SCAN",
            // Mode Kolaborasi
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
            // Profil
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
            // Scanner & Proses
            scanInstructions: "Arahkan ke Kartu Nama atau QR Code",
            scanBtn: "SCAN",
            processingTitle: "Tunggu... AI Sedang Memproses...",
            processingRefining: "Memfinalisasi & Menerjemahkan Data...",
            processingSubtitle: "Mohon tunggu sebentar...",
            processingTakingPicture: "Mengambil gambar...",
            processingQRCode: "Memproses QR Code...",
            // Layar Hasil
            scanResultTitle: "Hasil Scan",
            totalContactsPart1: "Total",
            totalContactsPart2: "kontak ditemukan.",
            noDataSaved: "Belum ada data tersimpan.",
            deleteAllLocalDataBtn: "HAPUS SEMUA DATA LOKAL",
            filterByTag: "Filter Berdasarkan Tag",
            clearFilter: "Hapus Filter",
            searchPlaceholder: "Cari kontak...",
            // Modal Edit Kontak
            editContactTitle: "Edit Kontak",
            nameLabel: "Nama",
            positionLabel: "Jabatan",
            companyLabel: "Perusahaan",
            companyTypeLabel: "Jenis Perusahaan",
            officePhoneLabel: "Telepon Kantor",
            eventLabel: "Acara",
            tagsLabel: "Tags (label)",
            // Modal Aksi
            actionSaveContact: "Simpan Kontak",
            actionOpenWA: "Buka WA",
            actionDraftWA: "Draf Pesan WA",
            actionDraftEmail: "Draf Email",
            actionReminder: "Pengingat Janji",
            // Modal Pengingat
            reminderTitle: "Buat Pengingat Janji",
            reminderTypeLabel: "Reminder Apa",
            reminderLocationLabel: "Tempat",
            reminderDateLabel: "Tanggal",
            reminderTimeLabel: "Jam",
            reminderAlarmLabel: "Waktu Pengingat",
            reminderNotesLabel: "Catatan",
            createReminderBtn: "BUAT REMINDER",
            // Modal Konfirmasi
            confirmActionTitle: "Konfirmasi Tindakan",
            confirmDeleteContact: "Apakah Anda yakin ingin menghapus kontak ini dari HP Anda? Tindakan ini tidak dapat dibatalkan.",
            confirmClearAll: "Anda yakin ingin menghapus semua data LOKAL? Tindakan ini tidak akan menghapus data di Google Sheet.",
            // Toast/Notifikasi
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
            toastGSheetSaveSuccess: (count) => `${count} kontak berhasil disimpan.`,
            toastGSheetSaveError: (msg) => `Error: ${msg}`,
            toastDataSentToGSheet: (name) => `Data terkirim ke Google Sheet: ${name}`,
            toastFailSendGSheet: (name) => `Gagal kirim: ${name}. Data aman di lokal.`,
            toastEmptyEventName: "Nama acara tidak boleh kosong.",
            toastEmptyMarketingName: "Nama marketing tidak boleh kosong.",
            toastProfileIncomplete: "Harap lengkapi profil Anda di menu Pengaturan terlebih dahulu.",
            toastReminderCreated: "Reminder berhasil dibuat dan file .ics telah diunduh.",
            // Footer
            footerAbout: "Tentang",
            footerHelp: "Bantuan",
            footerTerms: "Ketentuan",
            footerPrivacy: "Privasi",
            footerCopyright: "&copy; 2025 SCANNER PINTAR oleh Isparmo & M. Hasan",
            // Lain-lain
            unnamedContact: "Tanpa Nama",
            qrCodeContactName: "Kontak dari QR Code",
            atCompany: "di",
            phoneLabel: "HP",
            eventLabelResult: "Acara",
            notesLabelResult: "Catatan",
            editBtn: "EDIT",
            // Export
            exportCSV: "SIMPAN .csv",
            exportVCF: "SIMPAN .vcf",
            exportZIP: "SIMPAN VCF .zip",
            exportGSheet: "SIMPAN KE GOOGLE SHEET",
            exportGSheetSaving: "Menyimpan...",
            collabExportNote: "Data otomatis terkirim ke G-Sheet. Opsi ekspor di bawah hanya untuk data di HP ini."
        },
        en: {
            // Common Titles & Text
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
            // Initial Screen
            eventNameLabel: "Event Name",
            eventNamePlaceholder: "Example: Construction Expo 2025",
            dateLabel: "Date",
            notesLabel: "Notes",
            notesPlaceholder: "Optional",
            scanCardBtn: "SCAN BUSINESS CARD",
            uploadGalleryBtn: "UPLOAD FROM GALLERY",
            collabModeBtn: "TEAM COLLABORATION MODE",
            viewResultsBtn: "VIEW SCAN RESULTS",
            // Collaboration Mode
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
            // Profile
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
            // Scanner & Processing
            scanInstructions: "Point at a Business Card or QR Code",
            scanBtn: "SCAN",
            processingTitle: "Wait... AI is Processing...",
            processingRefining: "Finalizing & Translating Data...",
            processingSubtitle: "Please wait a moment...",
            processingTakingPicture: "Taking picture...",
            processingQRCode: "Processing QR Code...",
            // Results Screen
            scanResultTitle: "Scan Results",
            totalContactsPart1: "Total of",
            totalContactsPart2: "contacts found.",
            noDataSaved: "No saved data yet.",
            deleteAllLocalDataBtn: "DELETE ALL LOCAL DATA",
            filterByTag: "Filter by Tag",
            clearFilter: "Clear Filter",
            searchPlaceholder: "Search contacts...",
            // Edit Contact Modal
            editContactTitle: "Edit Contact",
            nameLabel: "Name",
            positionLabel: "Position",
            companyLabel: "Company",
            companyTypeLabel: "Company Type",
            officePhoneLabel: "Office Phone",
            eventLabel: "Event",
            tagsLabel: "Tags",
            // Action Modal
            actionSaveContact: "Save Contact",
            actionOpenWA: "Open WA",
            actionDraftWA: "Draft WA",
            actionDraftEmail: "Draft Email",
            actionReminder: "Set Reminder",
            // Reminder Modal
            reminderTitle: "Create Appointment Reminder",
            reminderTypeLabel: "Reminder For",
            reminderLocationLabel: "Location",
            reminderDateLabel: "Date",
            reminderTimeLabel: "Time",
            reminderAlarmLabel: "Reminder Time",
            reminderNotesLabel: "Notes",
            createReminderBtn: "CREATE REMINDER",
            // Confirm Modal
            confirmActionTitle: "Confirm Action",
            confirmDeleteContact: "Are you sure you want to delete this contact from your phone? This action cannot be undone.",
            confirmClearAll: "Are you sure you want to delete all LOCAL data? This will not delete data in Google Sheets.",
            // Toasts/Notifications
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
            toastGSheetSaveSuccess: (count) => `${count} contacts saved successfully.`,
            toastGSheetSaveError: (msg) => `Error: ${msg}`,
            toastDataSentToGSheet: (name) => `Data sent to Google Sheet: ${name}`,
            toastFailSendGSheet: (name) => `Failed to send: ${name}. Data is safe locally.`,
            toastEmptyEventName: "Event name cannot be empty.",
            toastEmptyMarketingName: "Marketing name cannot be empty.",
            toastProfileIncomplete: "Please complete your profile in the Settings menu first.",
            toastReminderCreated: "Reminder created and .ics file downloaded successfully.",
            // Footer
            footerAbout: "About",
            footerHelp: "Help",
            footerTerms: "Terms",
            footerPrivacy: "Privacy",
            footerCopyright: "&copy; 2025 SCANNER PINTAR by Isparmo & M. Hasan",
            // Misc
            unnamedContact: "Unnamed",
            qrCodeContactName: "Contact from QR Code",
            atCompany: "at",
            phoneLabel: "Mobile",
            eventLabelResult: "Event",
            notesLabelResult: "Notes",
            editBtn: "EDIT",
            // Export
            exportCSV: "SAVE .csv",
            exportVCF: "SAVE .vcf",
            exportZIP: "SAVE VCF .zip",
            exportGSheet: "SAVE TO GOOGLE SHEET",
            exportGSheetSaving: "Saving...",
            collabExportNote: "Data is automatically sent to G-Sheet. The export options below are only for data on this phone."
        }
    };

    /**
     * Mengambil string terjemahan berdasarkan kunci dan bahasa saat ini.
     * Mendukung argumen untuk string dinamis.
     * @param {string} key - Kunci untuk string terjemahan yang diinginkan.
     * @param {...*} args - Argumen untuk dimasukkan ke dalam string terjemahan jika itu adalah fungsi.
     * @returns {string} String yang sudah diterjemahkan atau kunci itu sendiri jika tidak ditemukan.
     */
    function getTranslation(key, ...args) {
        const translation = translations[currentLang][key];
        if (typeof translation === 'function') {
            return translation(...args);
        }
        return translation || key;
    }

    /**
     * Memperbarui seluruh antarmuka pengguna (UI) dengan string terjemahan saat ini.
     */
    function updateUI() {
        document.documentElement.lang = currentLang;
        const langToggles = document.querySelectorAll('#lang-toggle-initial, #lang-toggle-results');
        langToggles.forEach(toggle => {
            toggle.textContent = currentLang === 'id' ? 'EN' : 'ID';
        });

        document.querySelectorAll('[data-translate-key]').forEach(el => {
            const key = el.getAttribute('data-translate-key');
            el.innerHTML = getTranslation(key);
        });

        document.querySelectorAll('[data-translate-key-placeholder]').forEach(el => {
            const key = el.getAttribute('data-translate-key-placeholder');
            el.placeholder = getTranslation(key);
        });

        refreshResults();
    }

    /**
     * Mengatur bahasa aplikasi dan menyimpannya di Local Storage.
     * @param {string} lang - Kode bahasa yang akan diatur ('id' atau 'en').
     */
    function setLanguage(lang) {
        currentLang = lang;
        localStorage.setItem('scannerLang', lang);
        updateUI();
    }

    /**
     * Mengganti antara bahasa Indonesia dan Inggris.
     */
    function toggleLanguage() {
        const newLang = currentLang === 'id' ? 'en' : 'id';
        setLanguage(newLang);
    }

    // Konfigurasi URL backend
    const BACKEND_API_URL = 'https://scanner-api-328921559379.asia-southeast1.run.app';
    const GSHEET_BACKEND_URL = `${BACKEND_API_URL}/simpan-gsheet`;
    const EMAIL_GENERATOR_URL = `${BACKEND_API_URL}/generateFollowUpEmail`;
    const WA_GENERATOR_URL = `${BACKEND_API_URL}/generateFollowUpWa`;

    // State aplikasi
    let collaborationSession = { isActive: false, sessionId: null, sessionAcara: null, marketingName: null };
    let errorLogs = [];
    let stream, qrScanInterval, confirmCallback = null;
    let tagify;
    let currentFilter = { searchTerm: '', activeTag: null };

    // Pengambilan elemen DOM
    const logIcon = document.getElementById('log-icon');
    const logViewerModal = document.getElementById('log-viewer-modal');
    const closeLogViewerBtn = document.getElementById('close-log-viewer-btn');
    const clearLogsBtn = document.getElementById('clear-logs-btn');
    const copyLogsBtn = document.getElementById('copy-logs-btn');
    const logList = document.getElementById('log-list');
    const editTagsInput = document.getElementById('edit-tags');
    const searchInput = document.getElementById('search-input');
    const filterBtn = document.getElementById('filter-btn');
    const filterDropdown = document.getElementById('filter-dropdown');
    const tagFilterList = document.getElementById('tag-filter-list');
    const clearFilterBtn = document.getElementById('clear-filter-btn');
    const createSessionBtn = document.getElementById('create-session-btn');
    const cancelCreateSessionBtn = document.getElementById('cancel-create-session-btn');
    const generateSessionQRBtn = document.getElementById('generate-session-qr-btn');
    const collabSessionNameInput = document.getElementById('collab-session-name-input');
    const showSessionQRModal = document.getElementById('show-session-qr-modal');
    const qrCodeContainer = document.getElementById('qr-code-container');
    const closeQrModalBtn = document.getElementById('close-qr-modal-btn');
    const joinSessionModal = document.getElementById('join-session-modal');
    const joinSessionName = document.getElementById('join-session-name');
    const marketingNameInput = document.getElementById('marketing-name-input');
    const cancelJoinBtn = document.getElementById('cancel-join-btn');
    const confirmJoinBtn = document.getElementById('confirm-join-btn');
    const collaborationModeIndicator = document.getElementById('collaboration-mode-indicator');
    const collabSessionName = document.getElementById('collab-session-name');
    const collabUserName = document.getElementById('collab-user-name');
    const exitCollabBtn = document.getElementById('exit-collab-btn');
    const { ...otherSelectors } = initializeSelectors();

    /**
     * Menginisialisasi dan mengembalikan objek yang berisi semua selector elemen DOM utama.
     * @returns {object} Objek dengan semua elemen DOM yang diperlukan.
     */
    function initializeSelectors() {
        return {
            screens: { initial: document.getElementById('initial-screen'), scanner: document.getElementById('scanner-screen'), processing: document.getElementById('processing-screen'), results: document.getElementById('results-screen'), createSession: document.getElementById('create-session-screen'), profile: document.getElementById('profile-screen') },
            startScanBtn: document.getElementById('start-scan-btn'), uploadBtn: document.getElementById('upload-btn'), viewResultsBtn: document.getElementById('view-results-btn'), imageUploadInput: document.getElementById('image-upload-input'), captureBtn: document.getElementById('capture-btn'), cancelScanBtn: document.getElementById('cancel-scan-btn'), backToHomeBtn: document.getElementById('back-to-home-btn'), exportButtonsContainer: document.getElementById('export-buttons-container'), clearAllBtn: document.getElementById('clear-all-btn'), homeContactCount: document.getElementById('home-contact-count'), resultsContactCount: document.getElementById('results-contact-count').querySelector('span'), resultsList: document.getElementById('results-list'), video: document.getElementById('video'), canvas: document.getElementById('canvas'), toast: document.getElementById('toast'), toastMessage: document.getElementById('toast-message'), processingTitle: document.getElementById('processing-title'), sessionAcaraInput: document.getElementById('session-acara'), sessionTanggalInput: document.getElementById('session-tanggal'), sessionCatatanInput: document.getElementById('session-catatan'), editModal: document.getElementById('edit-modal'), editModalContent: document.getElementById('edit-modal').querySelector('.modal-content'), cancelEditBtn: document.getElementById('cancel-edit-btn'), saveEditBtn: document.getElementById('save-edit-btn'), deleteContactBtn: document.getElementById('delete-contact-btn'), themeToggleInitial: document.getElementById('theme-toggle-initial'), themeToggleResults: document.getElementById('theme-toggle-results'), confirmModal: document.getElementById('confirm-modal'), confirmModalContent: document.getElementById('confirm-modal').querySelector('.modal-content'), confirmMessage: document.getElementById('confirm-message'), cancelConfirmBtn: document.getElementById('cancel-confirm-btn'), confirmActionBtn: document.getElementById('confirm-action-btn'),
            profileSettingsBtn: document.getElementById('profile-settings-btn'), backToHomeFromProfile: document.getElementById('back-to-home-from-profile'), saveProfileBtn: document.getElementById('save-profile-btn'),
            actionModal: document.getElementById('action-modal'), actionModalContent: document.getElementById('action-modal').querySelector('.modal-content'), closeActionModalBtn: document.getElementById('close-action-modal-btn'), actionModalHeader: document.getElementById('action-modal-header'), actionModalBody: document.getElementById('action-modal-body'), actionModalFooter: document.getElementById('action-modal-footer'),
            langToggleInitial: document.getElementById('lang-toggle-initial'),
            langToggleResults: document.getElementById('lang-toggle-results')
        };
    }

    /**
     * Memformat nomor telepon kantor ke format lokal (0xxx).
     * @param {string} phone - Nomor telepon mentah.
     * @returns {string} Nomor telepon yang diformat.
     */
    function formatKantor(phone) {
        if (!phone) return '';
        let digits = phone.replace(/\D/g, '');
        if (digits.startsWith('62')) {
            digits = '0' + digits.substring(2);
        }
        return digits;
    }

    /**
     * Memformat nomor telepon ke format internasional WhatsApp (62xxx).
     * @param {string} phone - Nomor telepon mentah.
     * @returns {string} Nomor telepon yang diformat untuk WhatsApp.
     */
    function formatWA(phone) {
        if (!phone) return '';
        let digits = phone.replace(/\D/g, '');
        if (digits.startsWith('0')) {
            digits = '62' + digits.substring(1);
        }
        return digits;
    }

    /**
     * Mencatat pesan error ke konsol dan menyimpannya di array log untuk ditampilkan di UI.
     * @param {string} message - Pesan error utama.
     * @param {Error|null} errorObject - Objek error asli untuk detail tambahan.
     */
    function logError(message, errorObject = null) {
        console.error(message, errorObject);
        const timestamp = new Date().toLocaleTimeString();

        let details = '';
        if (errorObject) {
            details = `Error Type: ${errorObject.name}\nMessage: ${errorObject.message}\n`;
            if(errorObject.stack) {
                details += `Stack Trace:\n${errorObject.stack}`;
            }
        }

        errorLogs.push({ timestamp, message, details });
        renderLogs();
    }

    /**
     * Merender log error ke dalam modal penampil log di UI.
     */
    function renderLogs() {
        logList.innerHTML = '';
        if (errorLogs.length === 0) {
            logList.innerHTML = '<p class="text-gray-500">No errors logged yet.</p>';
        } else {
            errorLogs.forEach(log => {
                const logEntry = document.createElement('div');
                logEntry.className = 'log-entry p-2';
                const sanitizedDetails = log.details.replace(/</g, "&lt;").replace(/>/g, "&gt;");
                logEntry.innerHTML = `<p class="text-gray-400 text-xs">${log.timestamp}</p><p class="text-red-400 font-semibold">${log.message}</p><pre class="text-gray-300 text-xs whitespace-pre-wrap">${sanitizedDetails}</pre>`;
                logList.appendChild(logEntry);
            });
        }
    }

    /**
     * Objek yang mengelola semua operasi database IndexedDB.
     */
    const dbLogic = {
        db: null,
        /**
         * Menginisialisasi koneksi ke IndexedDB.
         * @returns {Promise<void>} Promise yang selesai saat database berhasil terhubung.
         */
        init: function() {
            return new Promise((resolve, reject) => {
                const request = indexedDB.open('SmartScannerDB', 2);
                request.onerror = (event) => { logError("Database error", event.target.error); reject("Database error"); };
                request.onsuccess = (event) => { this.db = event.target.result; resolve(); };
                request.onupgradeneeded = (event) => {
                    const db = event.target.result;
                    const store = db.createObjectStore('contacts', { keyPath: 'id', autoIncrement: true });
                    store.createIndex('tags', 'tags', { multiEntry: true });
                };
            });
        },
        /**
         * Menambahkan kontak baru ke database.
         * @param {object} contact - Objek kontak yang akan ditambahkan.
         * @returns {Promise<Event>} Promise yang selesai saat kontak berhasil ditambahkan.
         */
        addContact: function(contact) { return new Promise((resolve, reject) => { const transaction = this.db.transaction(['contacts'], 'readwrite'); const store = transaction.objectStore('contacts'); const request = store.add(contact); request.onsuccess = resolve; request.onerror = (e) => { logError("Add contact DB error", e.target.error); reject(e.target.error); }; }); },
        /**
         * Mengambil satu kontak berdasarkan ID.
         * @param {number} id - ID kontak.
         * @returns {Promise<object>} Promise yang mengembalikan objek kontak.
         */
        getContact: function(id) { return new Promise((resolve, reject) => { const transaction = this.db.transaction(['contacts'], 'readonly'); const store = transaction.objectStore('contacts'); const request = store.get(id); request.onsuccess = (event) => resolve(event.target.result); request.onerror = (e) => { logError("Get contact DB error", e.target.error); reject(e.target.error); }; }); },
        /**
         * Memperbarui data kontak yang ada.
         * @param {object} contact - Objek kontak dengan data yang diperbarui.
         * @returns {Promise<Event>} Promise yang selesai saat kontak berhasil diperbarui.
         */
        updateContact: function(contact) { return new Promise((resolve, reject) => { const transaction = this.db.transaction(['contacts'], 'readwrite'); const store = transaction.objectStore('contacts'); const request = store.put(contact); request.onsuccess = resolve; request.onerror = (e) => { logError("Update contact DB error", e.target.error); reject(e.target.error); }; }); },
        /**
         * Menghapus kontak dari database berdasarkan ID.
         * @param {number} id - ID kontak yang akan dihapus.
         * @returns {Promise<Event>} Promise yang selesai saat kontak berhasil dihapus.
         */
        deleteContact: function(id) { return new Promise((resolve, reject) => { const transaction = this.db.transaction(['contacts'], 'readwrite'); const store = transaction.objectStore('contacts'); const request = store.delete(id); request.onsuccess = resolve; request.onerror = (e) => { logError("Delete contact DB error", e.target.error); reject(e.target.error); }; }); },
        /**
         * Mengambil semua kontak dari database.
         * @returns {Promise<Array<object>>} Promise yang mengembalikan array semua kontak.
         */
        getAllContacts: function() { return new Promise((resolve, reject) => { const transaction = this.db.transaction(['contacts'], 'readonly'); const store = transaction.objectStore('contacts'); const request = store.getAll(); request.onsuccess = (event) => resolve(event.target.result); request.onerror = (e) => { logError("Get all contacts DB error", e.target.error); reject(e.target.error); }; }); },
        /**
         * Menghapus semua kontak dari database.
         * @returns {Promise<Event>} Promise yang selesai saat semua kontak berhasil dihapus.
         */
        clearAllContacts: function() { return new Promise((resolve, reject) => { const transaction = this.db.transaction(['contacts'], 'readwrite'); const store = transaction.objectStore('contacts'); const request = store.clear(); request.onsuccess = resolve; request.onerror = (e) => { logError("Clear contacts DB error", e.target.error); reject(e.target.error); }; }); }
    };

    /**
     * Menampilkan notifikasi toast singkat di bagian bawah layar.
     * @param {string} message - Pesan yang akan ditampilkan.
     * @param {number} [duration=3000] - Durasi tampilan toast dalam milidetik.
     */
    function showToast(message, duration = 3000) {
        otherSelectors.toastMessage.textContent = message;
        otherSelectors.toast.classList.remove('opacity-0', 'translate-y-5');
        setTimeout(() => { otherSelectors.toast.classList.add('opacity-0', 'translate-y-5'); }, duration);
    }

    /**
     * Menampilkan layar tertentu dan menyembunyikan yang lain.
     * @param {string} screenName - Nama layar yang akan ditampilkan (misal: 'initial', 'scanner').
     */
    function showScreen(screenName) {
        Object.values(otherSelectors.screens).forEach(screen => { if (screen) screen.classList.add('hidden'); });
        if (otherSelectors.screens[screenName]) {
            otherSelectors.screens[screenName].classList.remove('hidden');
            if (screenName === 'results') {
                refreshResults();
            }
        }
    }

    /**
     * Menerapkan tema terang atau gelap ke aplikasi.
     * @param {boolean} isDark - True untuk tema gelap, false untuk tema terang.
     */
    function applyTheme(isDark) {
        document.documentElement.classList.toggle('dark', isDark);
        [otherSelectors.themeToggleInitial, otherSelectors.themeToggleResults].forEach(toggle => {
            if (!toggle) return;
            const sunIcon = toggle.querySelector('[data-lucide="sun"]');
            const moonIcon = toggle.querySelector('[data-lucide="moon"]');
            if (sunIcon && moonIcon) {
                if (isDark) { moonIcon.classList.add('hidden'); sunIcon.classList.remove('hidden'); }
                else { sunIcon.classList.add('hidden'); moonIcon.classList.remove('hidden'); }
            }
        });
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    }

    /**
     * Mengganti antara tema terang dan gelap.
     */
    function toggleTheme() {
        applyTheme(!document.documentElement.classList.contains('dark'));
    }

    /**
     * Menampilkan modal konfirmasi untuk tindakan penting.
     * @param {string} message - Pesan konfirmasi yang akan ditampilkan kepada pengguna.
     * @param {function} onConfirm - Fungsi callback yang akan dijalankan jika pengguna mengonfirmasi.
     */
    function showConfirmModal(message, onConfirm) {
        otherSelectors.confirmMessage.textContent = message;
        confirmCallback = onConfirm;
        otherSelectors.confirmModal.classList.remove('hidden');
        setTimeout(() => {
            otherSelectors.confirmModal.classList.remove('opacity-0');
            otherSelectors.confirmModalContent.classList.remove('scale-95', 'opacity-0');
        }, 10);
    }

    /**
     * Menyembunyikan modal konfirmasi.
     */
    function hideConfirmModal() {
        otherSelectors.confirmModal.classList.add('opacity-0');
        otherSelectors.confirmModalContent.classList.add('scale-95', 'opacity-0');
        setTimeout(() => {
            otherSelectors.confirmModal.classList.add('hidden');
            confirmCallback = null;
        }, 300);
    }

    /**
     * Memindai frame video saat ini untuk mencari QR code. Jika ditemukan, proses QR code tersebut.
     */
    function scanQRCode() {
        if (!otherSelectors.video.srcObject || otherSelectors.video.readyState !== otherSelectors.video.HAVE_ENOUGH_DATA) return;
        const context = otherSelectors.canvas.getContext('2d');
        otherSelectors.canvas.width = otherSelectors.video.videoWidth;
        otherSelectors.canvas.height = otherSelectors.video.videoHeight;
        context.drawImage(otherSelectors.video, 0, 0, otherSelectors.canvas.width, otherSelectors.canvas.height);
        const imageData = context.getImageData(0, 0, otherSelectors.canvas.width, otherSelectors.canvas.height);
        const code = jsQR(imageData.data, imageData.width, imageData.height, { inversionAttempts: "dontInvert" });
        if (code) {
            stopCamera();
            if (code.data.includes('?sesi=') && code.data.includes('&acara=')) {
                window.location.href = code.data; // Bergabung dengan sesi kolaborasi
            } else {
                processQRCode(code.data); // Proses sebagai kontak vCard atau teks biasa
            }
        }
    }

    /**
     * Memulai streaming kamera dan menampilkan layar pemindai.
     * @returns {Promise<void>}
     */
    async function startCamera() {
        try {
            if (stream) { stream.getTracks().forEach(track => track.stop()); }
            stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
            otherSelectors.video.srcObject = stream;
            otherSelectors.video.onloadedmetadata = () => {
                otherSelectors.canvas.width = otherSelectors.video.videoWidth;
                otherSelectors.canvas.height = otherSelectors.video.videoHeight;
                if(qrScanInterval) clearInterval(qrScanInterval);
                qrScanInterval = setInterval(scanQRCode, 500); // Mulai memindai QR code secara berkala
            };
            showScreen('scanner');
        } catch (err) {
            console.error("Error mengakses kamera:", err);
            alert("Tidak dapat mengakses kamera. Pastikan Anda telah memberikan izin.");
            showScreen('initial');
        }
    }

    /**
     * Menghentikan streaming kamera dan interval pemindaian QR.
     */
    function stopCamera() {
        if (qrScanInterval) clearInterval(qrScanInterval);
        qrScanInterval = null;
        if (stream) { stream.getTracks().forEach(track => track.stop()); }
    }

    /**
     * Mengubah ukuran gambar (jika terlalu besar) untuk mengoptimalkan pengiriman ke backend.
     * @param {string} base64Str - String base64 dari gambar.
     * @param {number} [maxWidth=1024] - Lebar maksimum gambar.
     * @param {number} [maxHeight=1024] - Tinggi maksimum gambar.
     * @returns {Promise<string>} Promise yang mengembalikan string base64 dari gambar yang telah diubah ukurannya.
     */
    function resizeImage(base64Str, maxWidth = 1024, maxHeight = 1024) {
        return new Promise((resolve) => {
            let img = new Image();
            img.src = base64Str;
            img.onload = () => {
                let canvas = document.createElement('canvas');
                let width = img.width, height = img.height;
                if (width > height) { if (width > maxWidth) { height *= maxWidth / width; width = maxWidth; } }
                else { if (height > maxHeight) { width *= maxHeight / height; height = maxHeight; } }
                canvas.width = width; canvas.height = height;
                let ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0, width, height);
                resolve(canvas.toDataURL('image/jpeg', 0.8));
            };
        });
    }

    /**
     * Menangani unggahan file gambar dari galeri pengguna.
     * @param {Event} event - Event 'change' dari input file.
     * @returns {Promise<void>}
     */
    async function handleImageUpload(event) {
        const file = event.target.files[0];
        if (!file) return;
        showScreen('processing');
        otherSelectors.processingTitle.textContent = getTranslation('processingTitle');
        const reader = new FileReader();
        reader.onload = async (e) => {
            const finalImageDataUrl = await resizeImage(e.target.result);
            await processImageWithAI(finalImageDataUrl);
        };
        reader.readAsDataURL(file);
        otherSelectors.imageUploadInput.value = ''; // Reset input
    }

    /**
     * Mengambil gambar dari video stream, menghentikan kamera, dan memprosesnya dengan AI.
     * @returns {Promise<void>}
     */
    async function captureAndProcess() {
        showScreen('processing');
        otherSelectors.processingTitle.textContent = getTranslation('processingTakingPicture');
        const context = otherSelectors.canvas.getContext('2d');
        otherSelectors.canvas.width = otherSelectors.video.videoWidth;
        otherSelectors.canvas.height = otherSelectors.video.videoHeight;
        context.drawImage(otherSelectors.video, 0, 0, otherSelectors.canvas.width, otherSelectors.canvas.height);
        stopCamera();
        const imageDataUrl = otherSelectors.canvas.toDataURL('image/jpeg', 0.9);
        const finalImageDataUrl = await resizeImage(imageDataUrl);
        await processImageWithAI(finalImageDataUrl);
    }

    /**
     * Mengirim gambar ke backend untuk diproses oleh AI, kemudian menampilkan hasilnya di modal edit.
     * @param {string} imageDataUrl - String base64 dari gambar yang akan diproses.
     * @returns {Promise<void>}
     */
    async function processImageWithAI(imageDataUrl) {
        try {
            otherSelectors.processingTitle.textContent = getTranslation('processingTitle');
            // Panggilan API pertama untuk ekstraksi data mentah
            const extractResponse = await fetch(`${BACKEND_API_URL}/processBusinessCard`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ imageDataUrl }) });
            if (!extractResponse.ok) { const errorText = await extractResponse.text(); throw new Error(`Backend Error: ${extractResponse.status}. Detail: ${errorText}`); }
            const extractResult = await extractResponse.json();
            const jsonString = extractResult.data;
            if (!jsonString) { throw new Error("Invalid response from Backend."); }
            const extractedData = JSON.parse(jsonString);

            otherSelectors.processingTitle.textContent = getTranslation('processingRefining');
            // Panggilan API kedua untuk membersihkan dan menerjemahkan data
            const refineResponse = await fetch(`${BACKEND_API_URL}/refineAndTranslate`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ extractedData }) });
            if (!refineResponse.ok) { const errorText = await refineResponse.text(); throw new Error(`Refinement Error: ${refineResponse.status}. Detail: ${errorText}`); }
            const refineResult = await refineResponse.json();
            const refinedJsonString = refineResult.data;
            if (!refinedJsonString) { throw new Error("Invalid response from finalization process."); }
            const finalData = JSON.parse(refinedJsonString);

            finalData.telepon_kantor = formatKantor(finalData.telepon_kantor);
            finalData.whatsapp = formatWA(finalData.whatsapp);

            await openEditModalForNewContact(finalData);

        } catch (error) {
            logError("Processing Error:", error);
            showToast(`Gagal memproses gambar: ${error.message}`);
            showScreen('initial');
        }
    }

    /**
     * Memproses data dari QR code, baik vCard maupun teks biasa.
     * @param {string} data - Data mentah dari QR code.
     * @returns {Promise<void>}
     */
    async function processQRCode(data) {
        otherSelectors.processingTitle.textContent = getTranslation('processingQRCode');
        showScreen('processing');
        try {
            const contact = data.startsWith('BEGIN:VCARD') ? parseVCard(data) : { nama: getTranslation('qrCodeContactName'), catatan: data };
            contact.telepon_kantor = formatKantor(contact.telepon_kantor);
            contact.whatsapp = formatWA(contact.whatsapp);
            await openEditModalForNewContact(contact);
        } catch(error) {
            logError("QR Processing Error:", error);
            showToast(`Gagal memproses QR Code: ${error.message}`);
            showScreen('initial');
        }
    }

    /**
     * Mengurai string vCard menjadi objek kontak.
     * @param {string} vcardString - String data dalam format vCard.
     * @returns {object} Objek kontak yang telah diurai.
     */
    function parseVCard(vcardString) {
        const contact = {};
        const lines = vcardString.split(/[\n\r]+/);
        lines.forEach(line => {
            if (!line.includes(':')) return;
            let [key, ...valueParts] = line.split(':');
            let value = valueParts.join(':').trim();
            const keyParts = key.split(';');
            const mainKey = keyParts[0].toUpperCase();
            const params = {};
            if (keyParts.length > 1) {
                keyParts.slice(1).forEach(p => {
                    const [paramKey, paramValue] = p.split('=');
                    if (paramKey && paramValue) {
                        const pKey = paramKey.toUpperCase();
                        if (pKey === 'TYPE') {
                            params[pKey] = (params[pKey] || []).concat(paramValue.split(','));
                        } else {
                            params[pKey] = paramValue;
                        }
                    }
                });
            }
            if (mainKey === 'FN' && !contact.nama) contact.nama = value;
            else if (mainKey === 'N' && !contact.nama) { const nameParts = value.split(';'); contact.nama = `${nameParts[1] || ''} ${nameParts[0] || ''}`.trim(); }
            else if (mainKey === 'TITLE' && !contact.jabatan) contact.jabatan = value;
            else if (mainKey === 'ORG' && !contact.perusahaan) contact.perusahaan = value;
            else if (mainKey === 'EMAIL' && !contact.email) contact.email = value;
            else if (mainKey === 'CATEGORIES' && !contact.jenis_perusahaan) { contact.jenis_perusahaan = value.split(',').map(s => s.trim()).join(', '); }
            else if (mainKey === 'TEL') {
                const types = params.TYPE || [];
                if (types.includes('WORK') && !contact.telepon_kantor) { contact.telepon_kantor = value; }
                else if (types.includes('CELL') && !contact.whatsapp) { contact.whatsapp = value; }
                else if (!contact.telepon_kantor && !contact.whatsapp) { contact.whatsapp = value; }
            }
            else if (mainKey === 'X-WHATSAPP' && !contact.whatsapp) { contact.whatsapp = value; }
        });
        return contact;
    }

    /**
     * Memuat ulang dan menampilkan daftar kontak dari database, menerapkan filter dan pencarian.
     * @returns {Promise<void>}
     */
    async function refreshResults() {
        if (!dbLogic.db) return;
        const allContacts = await dbLogic.getAllContacts();

        const searchTerm = currentFilter.searchTerm.toLowerCase();
        const activeTag = currentFilter.activeTag;

        const filteredContacts = allContacts.filter(contact => {
            const matchesSearch = searchTerm === '' ||
                (contact.nama && contact.nama.toLowerCase().includes(searchTerm)) ||
                (contact.perusahaan && contact.perusahaan.toLowerCase().includes(searchTerm)) ||
                (contact.jabatan && contact.jabatan.toLowerCase().includes(searchTerm)) ||
                (contact.acara && contact.acara.toLowerCase().includes(searchTerm));

            const matchesTag = !activeTag || (contact.tags && contact.tags.includes(activeTag));

            return matchesSearch && matchesTag;
        });

        const count = filteredContacts.length;
        otherSelectors.homeContactCount.textContent = allContacts.length;
        document.getElementById('results-contact-count').textContent = count;
        otherSelectors.resultsList.innerHTML = '';

        if (count === 0) {
            otherSelectors.resultsList.innerHTML = `<p class="text-center text-gray-500 dark:text-gray-400 py-8">${getTranslation('noDataSaved')}</p>`;
        } else {
            filteredContacts.reverse().forEach(contact => {
                const card = document.createElement('div');
                card.className = 'contact-card bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-4 rounded-xl';
                card.dataset.id = contact.id;

                const tagsHTML = (contact.tags && contact.tags.length > 0)
                    ? `<div class="mt-2 flex flex-wrap gap-2">${contact.tags.map(tag =>
                        `<span class="text-xs font-semibold text-purple-600 dark:text-purple-400 bg-purple-100 dark:bg-purple-900/50 px-2 py-0.5 rounded-full">${tag}</span>`
                      ).join('')}</div>`
                    : '';

                card.innerHTML = `
                    <div class="flex justify-between items-start">
                        <div>
                            <div class="flex items-center gap-3"> <p class="font-bold text-lg text-gray-900 dark:text-white">${contact.nama || getTranslation('unnamedContact')}</p> ${contact.jenis_perusahaan ? `<span class="text-xs font-semibold text-indigo-600 dark:text-indigo-400 bg-indigo-100 dark:bg-indigo-900/50 px-2 py-0.5 rounded-full">${contact.jenis_perusahaan}</span>` : ''} </div>
                            <p class="text-sm text-gray-600 dark:text-gray-400">${contact.jabatan || ''} ${getTranslation('atCompany')} ${contact.perusahaan || ''}</p>
                        </div>
                        <button class="edit-btn p-2 text-gray-500 hover:text-indigo-600 dark:hover:text-indigo-400 flex-shrink-0" data-id="${contact.id}">${getTranslation('editBtn')}</button>
                    </div>
                    <div class="mt-2 text-xs text-gray-500 dark:text-gray-400"> ${contact.whatsapp ? `<span>${getTranslation('phoneLabel')}: ${contact.whatsapp}</span>` : ''} ${contact.email ? `<span class="ml-2">Email: ${contact.email}</span>` : ''} </div>
                    ${tagsHTML}
                    ${(contact.acara || contact.catatan) ? `<div class="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700 text-xs text-gray-500 dark:text-gray-400"> ${contact.acara ? `<p><strong>${getTranslation('eventLabelResult')}:</strong> ${contact.acara} (${contact.tanggal || ''})</p>` : ''} ${contact.catatan ? `<p><strong>${getTranslation('notesLabelResult')}:</strong> ${contact.catatan}</p>` : ''} </div>` : ''}`;
                otherSelectors.resultsList.appendChild(card);
            });
             document.querySelectorAll('.contact-card').forEach(card => {
                card.addEventListener('click', (e) => {
                    if (e.target.closest('.edit-btn')) {
                        openEditModal(parseInt(e.currentTarget.dataset.id));
                    } else {
                        openActionModal(parseInt(e.currentTarget.dataset.id));
                    }
                });
            });
        }
        updateExportButtons(filteredContacts);
        updateFilterDropdown(allContacts);
        lucide.createIcons();
    }

    /**
     * Memperbarui dropdown filter dengan semua tag unik yang ada.
     * @param {Array<object>} allContacts - Array semua kontak dari database.
     */
    function updateFilterDropdown(allContacts) {
        const allTags = new Set(allContacts.flatMap(c => c.tags || []));
        tagFilterList.innerHTML = '';
        if (allTags.size === 0) {
            tagFilterList.innerHTML = `<p class="text-xs text-gray-400">Tidak ada tag.</p>`;
        } else {
            allTags.forEach(tag => {
                const button = document.createElement('button');
                button.textContent = tag;
                button.className = `text-xs font-semibold px-2 py-1 rounded-full border transition-colors ${currentFilter.activeTag === tag
                    ? 'bg-indigo-600 text-white border-indigo-600'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 border-gray-300 dark:border-gray-600 hover:bg-gray-200 dark:hover:bg-gray-600'}`;
                button.onclick = () => {
                    currentFilter.activeTag = currentFilter.activeTag === tag ? null : tag;
                    refreshResults();
                    filterDropdown.classList.add('hidden', 'opacity-0', 'scale-95');
                };
                tagFilterList.appendChild(button);
            });
        }
    }


    /**
     * Membuka modal aksi untuk kontak yang dipilih.
     * @param {number} id - ID kontak.
     * @returns {Promise<void>}
     */
    async function openActionModal(id) {
        const contact = await dbLogic.getContact(id);
        if (!contact) return;

        otherSelectors.actionModalHeader.innerHTML = `<h3 class="text-xl font-bold text-gray-900 dark:text-white">${contact.nama || getTranslation('unnamedContact')}</h3>`;
        otherSelectors.actionModalBody.innerHTML = `<p>${contact.jabatan || ''} ${getTranslation('atCompany')} ${contact.perusahaan || ''}</p><p class="mt-1">${getTranslation('eventLabel')}: ${contact.acara || '-'}</p>`;

        let footerHTML = '';
        footerHTML += `<button id="action-save-vcf" class="modal-button bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 flex items-center justify-center gap-2 uppercase">${getTranslation('actionSaveContact')}</button>`;

        if (contact.whatsapp) {
            footerHTML += `<button id="action-reminder" data-contact-id="${id}" class="modal-button bg-purple-600 text-white hover:bg-purple-700 flex items-center justify-center gap-2 uppercase">${getTranslation('actionReminder')}</button>`;
            footerHTML += `<button id="action-whatsapp-ai" class="modal-button bg-teal-500 text-white hover:bg-teal-600 flex items-center justify-center gap-2 uppercase">${getTranslation('actionDraftWA')}</button>`;
        }

        if (contact.email) {
            footerHTML += `<button id="action-email" class="modal-button bg-blue-600 text-white hover:bg-blue-700 flex items-center justify-center gap-2 uppercase">${getTranslation('actionDraftEmail')}</button>`;
        }

        otherSelectors.actionModalFooter.innerHTML = footerHTML;
        lucide.createIcons();

        document.getElementById('action-save-vcf').addEventListener('click', () => exportVCF(contact));

        if(contact.whatsapp) {
            if(document.getElementById('action-reminder')) {
                document.getElementById('action-reminder').addEventListener('click', (e) => {
                    const contactId = parseInt(e.currentTarget.dataset.contactId, 10);
                    openReminderModal(contactId);
                });
            }
            if(document.getElementById('action-whatsapp-ai')) {
                document.getElementById('action-whatsapp-ai').addEventListener('click', () => generateAndOpenWa(contact));
            }
        }

        if(contact.email && document.getElementById('action-email')) {
            document.getElementById('action-email').addEventListener('click', () => generateAndOpenEmail(contact));
        }

        otherSelectors.actionModal.classList.remove('hidden');
        setTimeout(() => {
            otherSelectors.actionModal.classList.remove('opacity-0');
            otherSelectors.actionModalContent.classList.remove('translate-y-full', 'sm:scale-95', 'sm:translate-y-0', 'opacity-0');
        }, 10);
    }

    /**
     * Menghasilkan draf email follow-up menggunakan AI dan membukanya di mail client.
     * @param {object} contact - Objek kontak target.
     * @returns {Promise<void>}
     */
    async function generateAndOpenEmail(contact) {
        const profile = JSON.parse(localStorage.getItem('userProfile'));
        if (!profile || !profile.nama || !profile.jabatan || !profile.perusahaan) {
            showToast(getTranslation('toastProfileIncomplete')); return;
        }

        const emailBtn = document.getElementById('action-email');
        emailBtn.disabled = true;
        emailBtn.innerHTML = `<div class="loader btn-loader"></div>`;

        try {
            const response = await fetch(EMAIL_GENERATOR_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ contact, profile, lang: currentLang })
            });

            if (!response.ok) { const errorText = await response.text(); throw new Error(`Failed to create email draft. Status: ${response.status}. Detail: ${errorText}`); }

            const result = await response.json();
            if (result.success && result.data) {
                const emailData = JSON.parse(result.data);
                const subject = encodeURIComponent(emailData.subject || `Introduction from ${profile.perusahaan}`);
                const body = encodeURIComponent(emailData.body || '');
                window.location.href = `mailto:${contact.email}?subject=${subject}&body=${body}`;
            } else { throw new Error('Invalid AI response.'); }
        } catch (error) {
            if (error instanceof TypeError && error.message.includes('Failed to fetch')) {
                const errorMessage = "Failed to connect to server. This might be due to a browser extension (Ad-Blocker) or network issue.";
                logError("Failed to generate email (Fetch Error):", error);
                showToast(errorMessage, 5000);
            } else {
                logError("Failed to generate email (General Error):", error);
                showToast(error.message);
            }
        } finally {
            emailBtn.disabled = false;
            emailBtn.innerHTML = getTranslation('actionDraftEmail');
        }
    }

    /**
     * Menghasilkan draf pesan WhatsApp menggunakan AI dan membukanya di tab baru.
     * @param {object} contact - Objek kontak target.
     * @returns {Promise<void>}
     */
    async function generateAndOpenWa(contact) {
        const profile = JSON.parse(localStorage.getItem('userProfile'));
        if (!profile || !profile.nama) {
            showToast(getTranslation('toastProfileIncomplete')); return;
        }

        const waAiBtn = document.getElementById('action-whatsapp-ai');
        waAiBtn.disabled = true;
        waAiBtn.innerHTML = `<div class="loader btn-loader"></div>`;

        try {
            const response = await fetch(WA_GENERATOR_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ contact, profile, lang: currentLang })
            });

            if (!response.ok) { const errorText = await response.text(); throw new Error(`Failed to create WA draft. Status: ${response.status}. Detail: ${errorText}`); }

            const result = await response.json();
            if (result.success && result.data) {
                const message = encodeURIComponent(result.data);
                const waNumber = formatWA(contact.whatsapp);
                const url = `https://wa.me/${waNumber}?text=${message}`;
                window.open(url, '_blank');
                closeActionModal();
            } else { throw new Error('Invalid AI response for WA.'); }
        } catch (error) {
            logError("Failed to generate WA message:", error);
            showToast(error.message);
        } finally {
            waAiBtn.disabled = false;
            waAiBtn.innerHTML = getTranslation('actionDraftWA');
        }
    }

    /**
     * Menutup modal aksi.
     */
    function closeActionModal() {
         otherSelectors.actionModal.classList.add('opacity-0');
         otherSelectors.actionModalContent.classList.add('translate-y-full', 'sm:scale-95', 'sm:translate-y-0', 'opacity-0');
        setTimeout(() => { otherSelectors.actionModal.classList.add('hidden'); }, 300);
    }

    /**
     * Membuka modal untuk membuat pengingat kalender.
     * @param {number} contactId - ID kontak yang terkait dengan pengingat.
     */
    function openReminderModal(contactId) {
        document.getElementById('reminder-contact-id').value = contactId;
        const reminderModal = document.getElementById('reminder-modal');
        reminderModal.classList.remove('hidden');
        setTimeout(() => {
            reminderModal.classList.remove('opacity-0');
            reminderModal.querySelector('.modal-content').classList.remove('scale-95', 'opacity-0');
        }, 10);
    }

    /**
     * Menutup modal pengingat.
     */
    function closeReminderModal() {
        const reminderModal = document.getElementById('reminder-modal');
        reminderModal.classList.add('opacity-0');
        reminderModal.querySelector('.modal-content').classList.add('scale-95', 'opacity-0');
        setTimeout(() => {
            reminderModal.classList.add('hidden');
        }, 300);
    }

    /**
     * Membuat dan mengunduh file .ics untuk pengingat kalender.
     */
    function createICSFile() {
        const contactId = document.getElementById('reminder-contact-id').value;
        let reminderType = document.getElementById('reminder-type').value;
        if (reminderType === 'Lainnya') {
            reminderType = document.getElementById('reminder-type-other').value;
        }
        const location = document.getElementById('reminder-location').value;
        const date = document.getElementById('reminder-date').value;
        const time = document.getElementById('reminder-time').value;
        let alarm = document.getElementById('reminder-alarm').value;
        if (alarm === 'lainnya') {
            alarm = document.getElementById('reminder-alarm-other').value;
        }
        const notes = document.getElementById('reminder-notes').value;

        if (!reminderType || !date || !time) {
            showToast("Harap isi semua kolom yang diperlukan.");
            return;
        }

        const dtstart = new Date(`${date}T${time}`);
        const dtend = new Date(dtstart.getTime() + 60 * 60 * 1000); // 1 hour duration

        const pad = (i) => (i < 10 ? `0${i}` : i);
        const toUTC = (d) => `${d.getUTCFullYear()}${pad(d.getUTCMonth() + 1)}${pad(d.getUTCDate())}T${pad(d.getUTCHours())}${pad(d.getUTCMinutes())}${pad(d.getUTCSeconds())}Z`;

        const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//ScannerPintar//EN
BEGIN:VEVENT
UID:${Date.now()}@scannner-pintar.com
DTSTAMP:${toUTC(new Date())}
DTSTART:${toUTC(dtstart)}
DTEND:${toUTC(dtend)}
SUMMARY:${reminderType}
LOCATION:${location}
DESCRIPTION:${notes}
BEGIN:VALARM
TRIGGER:${alarm}
ACTION:DISPLAY
DESCRIPTION:Reminder
END:VALARM
END:VEVENT
END:VCALENDAR`;

        const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8;' });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = `reminder.ics`;
        link.click();

        showToast(getTranslation('toastReminderCreated'));
        closeReminderModal();
    }

    /**
     * Membuka modal edit untuk kontak yang baru dipindai (belum disimpan).
     * @param {object} contact - Objek kontak hasil pemindaian AI.
     * @returns {Promise<void>}
     */
    async function openEditModalForNewContact(contact) {
        document.querySelector('.app-container').classList.add('hidden');

        document.getElementById('edit-contact-id').value = '';
        document.getElementById('edit-nama').value = contact.nama || '';
        document.getElementById('edit-jabatan').value = contact.jabatan || '';
        document.getElementById('edit-perusahaan').value = contact.perusahaan || '';
        document.getElementById('edit-jenis_perusahaan').value = contact.jenis_perusahaan || '';
        document.getElementById('edit-telepon_kantor').value = contact.telepon_kantor || '';
        document.getElementById('edit-whatsapp').value = contact.whatsapp || '';
        document.getElementById('edit-email').value = contact.email || '';

        tagify.removeAllTags();
        if(contact.tags && contact.tags.length > 0) {
            tagify.addTags(contact.tags);
        }

        document.getElementById('edit-acara').value = otherSelectors.sessionAcaraInput.value;
        document.getElementById('edit-tanggal').value = otherSelectors.sessionTanggalInput.value;
        document.getElementById('edit-catatan').value = contact.catatan || otherSelectors.sessionCatatanInput.value;

        otherSelectors.editModal.classList.remove('hidden');
        setTimeout(() => {
            otherSelectors.editModal.classList.remove('opacity-0');
            otherSelectors.editModalContent.classList.remove('scale-95', 'opacity-0');
        }, 10);
    }

    /**
     * Membuka modal edit untuk kontak yang sudah ada.
     * @param {number} id - ID kontak yang akan diedit.
     * @returns {Promise<void>}
     */
    async function openEditModal(id) {
        const contact = await dbLogic.getContact(id);
        if (!contact) return;

        document.querySelector('.app-container').classList.add('hidden');

        document.getElementById('edit-contact-id').value = contact.id;
        document.getElementById('edit-nama').value = contact.nama || '';
        document.getElementById('edit-jabatan').value = contact.jabatan || '';
        document.getElementById('edit-perusahaan').value = contact.perusahaan || '';
        document.getElementById('edit-jenis_perusahaan').value = contact.jenis_perusahaan || '';
        document.getElementById('edit-telepon_kantor').value = contact.telepon_kantor || '';
        document.getElementById('edit-whatsapp').value = contact.whatsapp || '';
        document.getElementById('edit-email').value = contact.email || '';

        tagify.removeAllTags();
        if(contact.tags && contact.tags.length > 0) {
            tagify.addTags(contact.tags);
        }

        document.getElementById('edit-acara').value = contact.acara || '';
        document.getElementById('edit-tanggal').value = contact.tanggal || '';
        document.getElementById('edit-catatan').value = contact.catatan || '';
        otherSelectors.editModal.classList.remove('hidden');
        setTimeout(() => { otherSelectors.editModal.classList.remove('opacity-0'); otherSelectors.editModalContent.classList.remove('scale-95', 'opacity-0'); }, 10);
    }

    /**
     * Menutup modal edit dan kembali ke layar utama.
     */
    function closeEditModal() {
        otherSelectors.editModal.classList.add('opacity-0');
        otherSelectors.editModalContent.classList.add('scale-95', 'opacity-0');
        setTimeout(() => {
            otherSelectors.editModal.classList.add('hidden');
            document.querySelector('.app-container').classList.remove('hidden');
            showScreen('initial');
        }, 300);
    }

    /**
     * Menyimpan perubahan dari modal edit, baik untuk kontak baru maupun yang sudah ada.
     * @returns {Promise<void>}
     */
    async function saveContactChanges() {
        const idValue = document.getElementById('edit-contact-id').value;
        const isNewContact = !idValue;

        const contactData = {
            nama: document.getElementById('edit-nama').value,
            jabatan: document.getElementById('edit-jabatan').value,
            perusahaan: document.getElementById('edit-perusahaan').value,
            jenis_perusahaan: document.getElementById('edit-jenis_perusahaan').value,
            telepon_kantor: formatKantor(document.getElementById('edit-telepon_kantor').value),
            whatsapp: formatWA(document.getElementById('edit-whatsapp').value),
            email: document.getElementById('edit-email').value,
            acara: document.getElementById('edit-acara').value,
            tanggal: document.getElementById('edit-tanggal').value,
            catatan: document.getElementById('edit-catatan').value,
            tags: tagify.value.map(tag => tag.value)
        };

        if (isNewContact) {
            await dbLogic.addContact(contactData);
            showToast(getTranslation('toastContactSaved'));
        } else {
            contactData.id = parseInt(idValue);
            await dbLogic.updateContact(contactData);
            showToast(getTranslation('toastContactUpdated'));
        }

        if (collaborationSession.isActive) {
            showToast('Sending data to Google Sheet...');
            await sendCollaborativeData({ ...contactData, marketingName: collaborationSession.marketingName });
        }

        showScreen('results');
        closeEditModal();
    }

    /**
     * Menangani proses penghapusan kontak dari modal edit.
     * @returns {Promise<void>}
     */
    async function handleDeleteContact() {
        const idValue = document.getElementById('edit-contact-id').value;
        const isNewContact = !idValue;

        if (isNewContact) {
            closeEditModal();
            showToast(getTranslation('toastScanCancelled'));
            return;
        }

        const id = parseInt(idValue);
        showConfirmModal(
            getTranslation('confirmDeleteContact'),
            async () => {
                try {
                    await dbLogic.deleteContact(id);
                    showToast(getTranslation('toastContactDeleted'));
                    closeEditModal();
                    refreshResults();
                } catch (error) {
                    logError("Failed to delete contact:", error);
                    showToast("Failed to delete contact.");
                }
            }
        );
    }

    /**
     * Mengatur UI untuk mode kolaborasi setelah berhasil bergabung atau membuat sesi.
     */
    function setupCollaborationModeUI() {
        collaborationSession.isActive = true;
        document.getElementById('session-form-container').classList.add('opacity-50', 'pointer-events-none');
        createSessionBtn.classList.add('hidden');

        collaborationModeIndicator.classList.remove('hidden');
        collabSessionName.textContent = collaborationSession.sessionAcara;
        collabUserName.textContent = collaborationSession.marketingName;

        otherSelectors.sessionAcaraInput.value = collaborationSession.sessionAcara;
        otherSelectors.sessionTanggalInput.value = new Date().toISOString().slice(0, 10);
    }

    /**
     * Keluar dari mode kolaborasi.
     */
    function exitCollaborationMode() {
        showConfirmModal(getTranslation('confirmExitCollab'), () => {
            localStorage.removeItem('collaborationSession');
            collaborationSession = { isActive: false, sessionId: null, sessionAcara: null, marketingName: null };

            const url = new URL(window.location);
            url.searchParams.delete('sesi');
            url.searchParams.delete('acara');
            window.history.pushState({}, '', url);

            collaborationModeIndicator.classList.add('hidden');
            document.getElementById('session-form-container').classList.remove('opacity-50', 'pointer-events-none');
            createSessionBtn.classList.remove('hidden');
            showToast(getTranslation('toastExitCollab'));
        });
    }

    /**
     * Mengirim data kontak ke Google Sheet dalam mode kolaborasi.
     * @param {object} contact - Objek kontak yang akan dikirim.
     * @returns {Promise<void>}
     */
    async function sendCollaborativeData(contact) {
        try {
            const response = await fetch(GSHEET_BACKEND_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ contact: contact })
            });
            const result = await response.json();
            if (!response.ok || !result.success) throw new Error(result.error || 'Failed to send data.');
            showToast(getTranslation('toastDataSentToGSheet', contact.nama));
        } catch (error) {
            logError("Failed to send collaborative data", error);
            showToast(getTranslation('toastFailSendGSheet', contact.nama));
        }
    }

    /**
     * Memperbarui visibilitas dan fungsionalitas tombol ekspor berdasarkan jumlah kontak.
     * @param {Array<object>} contacts - Array kontak yang akan diekspor.
     */
    function updateExportButtons(contacts) {
        let buttonsHTML = '';
        if (collaborationSession.isActive) {
            buttonsHTML = `
                <p class="col-span-2 text-xs text-center text-gray-500 dark:text-gray-400">${getTranslation('collabExportNote')}</p>
                <button id="export-csv-btn" class="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-full shadow-lg flex items-center justify-center gap-2 text-base">${getTranslation('exportCSV')}</button>
                <button id="export-zip-btn" class="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-full shadow-lg flex items-center justify-center gap-2 text-base">${getTranslation('exportZIP')}</button>
            `;
        } else {
            if (contacts.length === 1) {
                buttonsHTML = `
                    <button id="export-csv-btn" class="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-full shadow-lg flex items-center justify-center gap-2 text-base">${getTranslation('exportCSV')}</button>
                    <button id="export-vcf-btn" class="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-full shadow-lg flex items-center justify-center gap-2 text-base">${getTranslation('exportVCF')}</button>
                `;
            } else if (contacts.length > 1) {
                 buttonsHTML = `
                    <button id="export-csv-btn" class="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-full shadow-lg flex items-center justify-center gap-2 text-base">${getTranslation('exportCSV')}</button>
                    <button id="export-zip-btn" class="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-full shadow-lg flex items-center justify-center gap-2 text-base">${getTranslation('exportZIP')}</button>
                `;
            }
            if (contacts.length > 0) {
                buttonsHTML += `
                    <button id="export-gsheet-btn" class="col-span-2 w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-4 rounded-full shadow-lg flex items-center justify-center gap-2 text-base mt-2">
                        ${getTranslation('exportGSheet')}
                    </button>
                `;
            }
        }
        otherSelectors.exportButtonsContainer.innerHTML = buttonsHTML;

        if (contacts.length > 0) {
            if (document.getElementById('export-csv-btn')) document.getElementById('export-csv-btn').addEventListener('click', () => exportCSV(contacts));
            if (document.getElementById('export-vcf-btn')) document.getElementById('export-vcf-btn').addEventListener('click', () => exportVCF(contacts[0]));
            if (document.getElementById('export-zip-btn')) document.getElementById('export-zip-btn').addEventListener('click', () => exportZIP(contacts));
            if (document.getElementById('export-gsheet-btn')) {
                 const gsheetBtn = document.getElementById('export-gsheet-btn');
                 gsheetBtn.addEventListener('click', () => saveAllToGoogleSheet(gsheetBtn));
            }
        }
    }

    /**
     * Menyimpan semua kontak yang disaring ke Google Sheet.
     * @param {HTMLElement} button - Tombol yang diklik untuk memicu aksi.
     * @returns {Promise<void>}
     */
    async function saveAllToGoogleSheet(button) {
         const originalHTML = button.innerHTML;
        button.disabled = true;
        button.innerHTML = `<div class="loader btn-loader"></div><span class="ml-2">${getTranslation('exportGSheetSaving')}</span>`;
        try {
            const contacts = await dbLogic.getAllContacts();
            if (contacts.length === 0) { showToast(getTranslation('toastNoContactSave')); return; }
            const response = await fetch(GSHEET_BACKEND_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ contacts: contacts })
            });
            const result = await response.json();
            if (!response.ok || !result.success) throw new Error(result.error || 'Failed to save data.');
            showToast(result.message || getTranslation('toastGSheetSaveSuccess', contacts.length));
        } catch (error) {
            logError("Error saving all to Google Sheet", error);
            showToast(getTranslation('toastGSheetSaveError', error.message));
        } finally {
            button.disabled = false;
            button.innerHTML = getTranslation('exportGSheet');
        }
    }

    /**
     * Mengekspor daftar kontak ke dalam file CSV.
     * @param {Array<object>} contacts - Kontak yang akan diekspor.
     */
    function exportCSV(contacts) {
        if (contacts.length === 0) { showToast(getTranslation('toastNoDataExport')); return; }
        const headers = ['Name', 'Position', 'Company', 'Company Type', 'Office Phone', 'WhatsApp', 'Email', 'Event', 'Date', 'Notes', 'Tags'];
        let csvContent = headers.join(',') + '\n';
        const escapeCSV = (field) => `"${String(field || '').replace(/"/g, '""')}"`;
        contacts.forEach(c => {
            const row = [c.nama, c.jabatan, c.perusahaan, c.jenis_perusahaan, c.telepon_kantor, c.whatsapp, c.email, c.acara, c.tanggal, c.catatan, (c.tags || []).join(';')];
            csvContent += row.map(escapeCSV).join(',') + '\n';
        });
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = `business_card_contacts_${new Date().toISOString().slice(0,10)}.csv`;
        link.click();
        showToast(getTranslation('toastDownloadingCSV'));
    }

    /**
     * Membuat string data dalam format vCard dari objek kontak.
     * @param {object} contact - Objek kontak.
     * @returns {string} String berformat vCard.
     */
    function createVCardString(contact) {
        let vCard = `BEGIN:VCARD\nVERSION:3.0\nFN:${contact.nama || ''}\nORG:${contact.perusahaan || ''}\nTITLE:${contact.jabatan || ''}\n`;
        if(contact.jenis_perusahaan) vCard += `CATEGORIES:${contact.jenis_perusahaan}\n`;
        if(contact.tags && contact.tags.length > 0) vCard += `KEYWORDS:${contact.tags.join(',')}\n`;
        if (contact.telepon_kantor) vCard += `TEL;TYPE=WORK,VOICE:${contact.telepon_kantor}\n`;
        if (contact.whatsapp) vCard += `TEL;TYPE=CELL,VOICE:${contact.whatsapp}\n`;
        if (contact.email) vCard += `EMAIL:${contact.email}\n`;
        let note = [];
        if (contact.acara) note.push(`${getTranslation('eventLabel')}: ${contact.acara} (${contact.tanggal || ''})`);
        if (contact.catatan) note.push(`${getTranslation('notesLabel')}: ${contact.catatan}`);
        if (note.length > 0) vCard += `NOTE:${note.join(' | ')}\n`;
        vCard += `END:VCARD`;
        return vCard;
    }

    /**
     * Mengekspor satu kontak ke dalam file .vcf.
     * @param {object} contact - Kontak yang akan diekspor.
     */
    function exportVCF(contact) {
        const vCardString = createVCardString(contact);
        const blob = new Blob([vCardString], { type: 'text/vcard;charset=utf-8;' });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        const filename = (contact.nama || `contact`).replace(/\s+/g, '_').toLowerCase();
        link.download = `${filename}.vcf`;
        link.click();
        showToast(getTranslation('toastDownloadingVCF'));
    }

    /**
     * Mengekspor beberapa kontak ke dalam satu file .zip yang berisi file .vcf.
     * @param {Array<object>} contacts - Kontak yang akan diekspor.
     */
    function exportZIP(contacts) {
        if (contacts.length === 0) { showToast(getTranslation('toastNoDataExport')); return; }
        const zip = new JSZip();
        contacts.forEach((c, i) => {
            const vCardString = createVCardString(c);
            const filename = (c.nama || `contact_${i + 1}`).replace(/\s+/g, '_').toLowerCase() + '.vcf';
            zip.file(filename, vCardString);
        });
        zip.generateAsync({ type: "blob" }).then(content => {
            const link = document.createElement("a");
            link.href = URL.createObjectURL(content);
            link.download = `vcf_contacts_${new Date().toISOString().slice(0,10)}.zip`;
            link.click();
            showToast(getTranslation('toastDownloadingZIP'));
        });
    }

    /**
     * Memuat profil pengguna dari Local Storage dan menampilkannya di layar profil.
     */
    function loadAndDisplayProfile() {
        const profile = JSON.parse(localStorage.getItem('userProfile')) || {};
        document.getElementById('profile-nama').value = profile.nama || '';
        document.getElementById('profile-jabatan').value = profile.jabatan || '';
        document.getElementById('profile-perusahaan').value = profile.perusahaan || '';
        document.getElementById('profile-deskripsi').value = profile.deskripsi || '';
    }

    /**
     * Fungsi inisialisasi utama aplikasi.
     * @returns {Promise<void>}
     */
    async function initializeApp() {
        lucide.createIcons();
        const savedTheme = localStorage.getItem('theme');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        applyTheme(savedTheme ? savedTheme === 'dark' : prefersDark);
        otherSelectors.sessionAcaraInput.value = localStorage.getItem('sessionAcara') || '';
        otherSelectors.sessionTanggalInput.value = localStorage.getItem('sessionTanggal') || new Date().toISOString().slice(0, 10);
        otherSelectors.sessionCatatanInput.value = localStorage.getItem('sessionCatatan') || '';

        tagify = new Tagify(editTagsInput);

        try {
            await dbLogic.init();

            let preferredLang = localStorage.getItem('scannerLang');
            if (preferredLang !== 'id' && preferredLang !== 'en') {
                preferredLang = 'id';
                localStorage.setItem('scannerLang', 'id');
            }
            setLanguage(preferredLang);

            const urlParams = new URLSearchParams(window.location.search);
            const sessionIdFromUrl = urlParams.get('sesi');
            const sessionAcaraFromUrl = urlParams.get('acara');
            const savedSession = JSON.parse(localStorage.getItem('collaborationSession'));

            if (sessionIdFromUrl && sessionAcaraFromUrl) {
                if (savedSession && savedSession.sessionId === sessionIdFromUrl && savedSession.marketingName) {
                    collaborationSession = savedSession;
                    setupCollaborationModeUI();
                } else {
                    joinSessionName.textContent = sessionAcaraFromUrl;
                    joinSessionModal.classList.remove('hidden');
                }
            } else if (savedSession) {
                collaborationSession = savedSession;
                setupCollaborationModeUI();
            }

            showScreen('initial');
        } catch (error) {
            logError("Failed to initialize the app", error);
            document.body.innerHTML = `<div class="text-center p-8 text-red-500">Failed to load database. App cannot run.</div>`;
        }
    }

    // --- EVENT LISTENERS ---
    // Menghubungkan semua fungsi di atas ke elemen UI yang sesuai.
    [otherSelectors.langToggleInitial, otherSelectors.langToggleResults].forEach(btn => btn.addEventListener('click', toggleLanguage));
    createSessionBtn.addEventListener('click', () => showScreen('createSession'));
    cancelCreateSessionBtn.addEventListener('click', () => showScreen('initial'));
    generateSessionQRBtn.addEventListener('click', () => {
        const acara = collabSessionNameInput.value.trim();
        if (!acara) { showToast(getTranslation('toastEmptyEventName')); return; }
        const sessionId = acara.replace(/\s+/g, '-') + '-' + Date.now().toString(36);
        const baseUrl = window.location.origin + window.location.pathname;
        const collabUrl = `${baseUrl}?sesi=${sessionId}&acara=${encodeURIComponent(acara)}`;
        qrCodeContainer.innerHTML = '';
        new QRCode(qrCodeContainer, { text: collabUrl, width: 256, height: 256 });
        showSessionQRModal.classList.remove('hidden');
    });
    closeQrModalBtn.addEventListener('click', () => {
        showSessionQRModal.classList.add('hidden');
        showScreen('initial');
    });
    confirmJoinBtn.addEventListener('click', () => {
        const marketingName = marketingNameInput.value.trim();
        if (!marketingName) { showToast(getTranslation('toastEmptyMarketingName')); return; }
        const urlParams = new URLSearchParams(window.location.search);
        collaborationSession = {
            isActive: true,
            sessionId: urlParams.get('sesi'),
            sessionAcara: urlParams.get('acara'),
            marketingName: marketingName
        };
        localStorage.setItem('collaborationSession', JSON.stringify(collaborationSession));
        joinSessionModal.classList.add('hidden');
        setupCollaborationModeUI();
        showToast(getTranslation('toastWelcome', marketingName));
    });
    cancelJoinBtn.addEventListener('click', () => {
        joinSessionModal.classList.add('hidden');
        const url = new URL(window.location);
        url.searchParams.delete('sesi');
        url.searchParams.delete('acara');
        window.history.pushState({}, '', url);
        showScreen('initial');
    });
    exitCollabBtn.addEventListener('click', exitCollaborationMode);
    otherSelectors.startScanBtn.addEventListener('click', startCamera);
    otherSelectors.uploadBtn.addEventListener('click', () => otherSelectors.imageUploadInput.click());
    otherSelectors.imageUploadInput.addEventListener('change', handleImageUpload);
    otherSelectors.captureBtn.addEventListener('click', captureAndProcess);
    otherSelectors.cancelScanBtn.addEventListener('click', () => { stopCamera(); showScreen('initial'); });
    otherSelectors.viewResultsBtn.addEventListener('click', () => showScreen('results'));
    otherSelectors.backToHomeBtn.addEventListener('click', () => showScreen('initial'));
    otherSelectors.clearAllBtn.addEventListener('click', () => {
        showConfirmModal(getTranslation('confirmClearAll'),
            async () => {
                await dbLogic.clearAllContacts();
                refreshResults();
                showToast(getTranslation('toastAllDataDeleted'));
            }
        );
    });
    otherSelectors.saveEditBtn.addEventListener('click', saveContactChanges);
    otherSelectors.cancelEditBtn.addEventListener('click', () => {
        const idValue = document.getElementById('edit-contact-id').value;
        const isNewContact = !idValue;

        if (isNewContact) {
            closeEditModal();
            showToast(getTranslation('toastScanCancelled'));
        } else {
            closeEditModal();
        }
    });
    otherSelectors.deleteContactBtn.addEventListener('click', handleDeleteContact);
    [otherSelectors.themeToggleInitial, otherSelectors.themeToggleResults].forEach(btn => btn.addEventListener('click', toggleTheme));
    otherSelectors.sessionAcaraInput.addEventListener('input', (e) => localStorage.setItem('sessionAcara', e.target.value));
    otherSelectors.sessionTanggalInput.addEventListener('input', (e) => localStorage.setItem('sessionTanggal', e.target.value));
    otherSelectors.sessionCatatanInput.addEventListener('input', (e) => localStorage.setItem('sessionCatatan', e.target.value));
    otherSelectors.cancelConfirmBtn.addEventListener('click', hideConfirmModal);
    otherSelectors.confirmActionBtn.addEventListener('click', () => {
        if (typeof confirmCallback === 'function') {
            confirmCallback();
        }
        hideConfirmModal();
    });
    otherSelectors.profileSettingsBtn.addEventListener('click', () => {
        loadAndDisplayProfile();
        showScreen('profile');
    });
    otherSelectors.backToHomeFromProfile.addEventListener('click', () => showScreen('initial'));
    otherSelectors.saveProfileBtn.addEventListener('click', () => {
        const profile = {
            nama: document.getElementById('profile-nama').value,
            jabatan: document.getElementById('profile-jabatan').value,
            perusahaan: document.getElementById('profile-perusahaan').value,
            deskripsi: document.getElementById('profile-deskripsi').value,
        };
        localStorage.setItem('userProfile', JSON.stringify(profile));
        showToast(getTranslation('toastProfileSaved'));
        showScreen('initial');
    });
    otherSelectors.closeActionModalBtn.addEventListener('click', closeActionModal);

    logIcon.addEventListener('click', () => {
        logViewerModal.classList.remove('hidden');
        lucide.createIcons();
    });
    closeLogViewerBtn.addEventListener('click', () => logViewerModal.classList.add('hidden'));
    clearLogsBtn.addEventListener('click', () => {
        errorLogs = [];
        renderLogs();
    });
    copyLogsBtn.addEventListener('click', () => {
        if (errorLogs.length === 0) {
            showToast(getTranslation('toastNoLogs'));
            return;
        }
        const logText = errorLogs.map(log => `[${log.timestamp}] ${log.message}\n${log.details}`).join('\n\n');

        if (navigator.clipboard && window.isSecureContext) {
            navigator.clipboard.writeText(logText).then(() => {
                showToast(getTranslation('toastLogsCopied'));
            }).catch(err => {
                logError('Failed to copy logs with Clipboard API', err);
                showToast(getTranslation('toastCouldNotCopy'));
            });
        } else {
            const textArea = document.createElement('textarea');
            textArea.value = logText;
            textArea.style.position = 'fixed';  textArea.style.top = '-9999px'; textArea.style.left = '-9999px';
            document.body.appendChild(textArea);
            textArea.focus();
            textArea.select();
            try {
                document.execCommand('copy');
                showToast(getTranslation('toastLogsCopied'));
            } catch (err) {
                logError('Failed to copy logs with fallback', err);
                showToast(getTranslation('toastCouldNotCopy'));
            } finally {
                document.body.removeChild(textArea);
            }
        }
    });

    searchInput.addEventListener('input', (e) => {
        currentFilter.searchTerm = e.target.value;
        refreshResults();
    });
    filterBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        filterDropdown.classList.toggle('hidden');
        setTimeout(() => {
            filterDropdown.classList.toggle('opacity-0');
            filterDropdown.classList.toggle('scale-95');
        }, 10)
    });
    clearFilterBtn.addEventListener('click', () => {
        currentFilter.activeTag = null;
        refreshResults();
    });
    document.body.addEventListener('click', () => {
        if (!filterDropdown.classList.contains('hidden')) {
            filterDropdown.classList.add('hidden', 'opacity-0', 'scale-95');
        }
    });


    document.getElementById('cancel-reminder-btn').addEventListener('click', closeReminderModal);
    document.getElementById('create-reminder-btn').addEventListener('click', createICSFile);

    document.getElementById('reminder-type').addEventListener('change', (e) => {
        const otherInput = document.getElementById('reminder-type-other');
        if (e.target.value === 'Lainnya') {
            otherInput.classList.remove('hidden');
        } else {
            otherInput.classList.add('hidden');
        }
    });
    document.getElementById('reminder-alarm').addEventListener('change', (e) => {
        const otherInput = document.getElementById('reminder-alarm-other');
        if (e.target.value === 'lainnya') {
            otherInput.classList.remove('hidden');
        } else {
            otherInput.classList.add('hidden');
        }
    });


    initializeApp();
});
