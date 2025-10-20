let errorLogs = [];

export function logError(message, errorObject = null) {
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
    // renderLogs() will be handled by the UI module
}

export const dbLogic = {
    db: null,
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
    addContact: function(contact) { return new Promise((resolve, reject) => { const transaction = this.db.transaction(['contacts'], 'readwrite'); const store = transaction.objectStore('contacts'); const request = store.add(contact); request.onsuccess = resolve; request.onerror = (e) => { logError("Add contact DB error", e.target.error); reject(e.target.error); }; }); },
    getContact: function(id) { return new Promise((resolve, reject) => { const transaction = this.db.transaction(['contacts'], 'readonly'); const store = transaction.objectStore('contacts'); const request = store.get(id); request.onsuccess = (event) => resolve(event.target.result); request.onerror = (e) => { logError("Get contact DB error", e.target.error); reject(e.target.error); }; }); },
    updateContact: function(contact) { return new Promise((resolve, reject) => { const transaction = this.db.transaction(['contacts'], 'readwrite'); const store = transaction.objectStore('contacts'); const request = store.put(contact); request.onsuccess = resolve; request.onerror = (e) => { logError("Update contact DB error", e.target.error); reject(e.target.error); }; }); },
    deleteContact: function(id) { return new Promise((resolve, reject) => { const transaction = this.db.transaction(['contacts'], 'readwrite'); const store = transaction.objectStore('contacts'); const request = store.delete(id); request.onsuccess = resolve; request.onerror = (e) => { logError("Delete contact DB error", e.target.error); reject(e.target.error); }; }); },
    getAllContacts: function() { return new Promise((resolve, reject) => { const transaction = this.db.transaction(['contacts'], 'readonly'); const store = transaction.objectStore('contacts'); const request = store.getAll(); request.onsuccess = (event) => resolve(event.target.result); request.onerror = (e) => { logError("Get all contacts DB error", e.target.error); reject(e.target.error); }; }); },
    clearAllContacts: function() { return new Promise((resolve, reject) => { const transaction = this.db.transaction(['contacts'], 'readwrite'); const store = transaction.objectStore('contacts'); const request = store.clear(); request.onsuccess = resolve; request.onerror = (e) => { logError("Clear contacts DB error", e.target.error); reject(e.target.error); }; }); }
};

export function getErrorLogs() {
    return errorLogs;
}

export function clearErrorLogs() {
    errorLogs = [];
}
