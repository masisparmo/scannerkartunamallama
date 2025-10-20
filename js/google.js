import { GOOGLE_CLIENT_ID, GOOGLE_SCOPES } from './config.js';
import { logError } from './database.js';

let tokenClient;
let codeClient;
let gapiInited = false;
let gisInited = false;

export function isGapiInited() { return gapiInited; }
export function isGisInited() { return gisInited; }
export function getCodeClient() { return codeClient; }

export function initializeGoogleClients(updateSigninStatus, handleCollabSessionCreation) {
    gapi.load('client', async () => {
        try {
            await gapi.client.init({});
            await gapi.client.load('https://www.googleapis.com/discovery/v1/apis/drive/v3/rest');
            await gapi.client.load('https://sheets.googleapis.com/$discovery/rest?version=v4');
            gapiInited = true;
            updateSigninStatus(gapi.client.getToken() !== null);
        } catch (err) {
            logError("GAPI client initialization error", err);
        }
    });

    tokenClient = google.accounts.oauth2.initTokenClient({
        client_id: GOOGLE_CLIENT_ID,
        scope: GOOGLE_SCOPES,
        callback: (tokenResponse) => {
            if (tokenResponse.error) {
                logError("GIS Token Error", tokenResponse);
                // This callback is now generic, UI will handle toast
            } else {
                 gapi.client.setToken({ 'access_token': tokenResponse.access_token });
                 updateSigninStatus(true);
            }
        },
    });

    codeClient = google.accounts.oauth2.initCodeClient({
        client_id: GOOGLE_CLIENT_ID,
        scope: GOOGLE_SCOPES,
        ux_mode: 'popup',
        callback: (response) => {
            if (response.code) {
                handleCollabSessionCreation(response.code);
            } else {
                logError("Google Code Client Error", response);
                // UI will handle toast
            }
        },
    });

    gisInited = true;
}

async function findOrCreateSpreadsheet(fileName) {
    try {
        const response = await gapi.client.drive.files.list({
            q: `name='${fileName}' and mimeType='application/vnd.google-apps.spreadsheet' and trashed=false`,
            fields: 'files(id, name)',
            spaces: 'drive'
        });

        if (response.result.files.length > 0) {
            return response.result.files[0].id;
        } else {
            const spreadsheet = await gapi.client.sheets.spreadsheets.create({
                properties: { title: fileName }
            });
            return spreadsheet.result.spreadsheetId;
        }
    } catch (err) {
        logError("Error finding or creating spreadsheet", err);
        throw new Error("Gagal mencari atau membuat file di Google Drive.");
    }
}

async function findOrCreateSheetTab(spreadsheetId, sheetName) {
    try {
        const response = await gapi.client.sheets.spreadsheets.get({
            spreadsheetId: spreadsheetId,
            fields: 'sheets.properties.title'
        });
        const sheetExists = response.result.sheets.some(sheet => sheet.properties.title === sheetName);

        if (!sheetExists) {
            await gapi.client.sheets.spreadsheets.batchUpdate({
                spreadsheetId: spreadsheetId,
                resource: { requests: [{ addSheet: { properties: { title: sheetName } } }] }
            });
        }
    } catch (err) {
        logError("Error finding or creating sheet tab", err);
        throw new Error("Gagal memeriksa atau membuat tab di Google Sheet.");
    }
}

async function writeDataToSheet(spreadsheetId, sheetName, contacts, profile, collaborationSession) {
    const HEADER = ['Nama', 'Jabatan', 'Perusahaan', 'Jenis Perusahaan', 'Telepon Kantor', 'WhatsApp', 'Email', 'Acara', 'Tanggal', 'Catatan', 'Tags', 'Marketing', 'Timestamp'];
    try {
        const fullRange = `'${sheetName}'!A:M`;
        const response = await gapi.client.sheets.spreadsheets.values.get({ spreadsheetId, range: fullRange });
        const existingValues = response.result.values || [];
        let headerExists = existingValues.length > 0 && JSON.stringify(existingValues[0]) === JSON.stringify(HEADER);
        const existingDataMap = new Map();
        if (headerExists) {
            for (let i = 1; i < existingValues.length; i++) {
                const row = existingValues[i];
                const key = `${row[0]}|${row[2]}|${row[5]}`; // Nama|Perusahaan|WhatsApp
                existingDataMap.set(key, { row, rowIndex: i + 1 });
            }
        }

        const marketingName = collaborationSession.marketingName || (profile || {}).nama || '';
        const newContactsData = contacts.map(c => [ c.nama || '', c.jabatan || '', c.perusahaan || '', c.jenis_perusahaan || '', c.telepon_kantor || '', c.whatsapp || '', c.email || '', c.acara || '', c.tanggal || '', c.catatan || '', (c.tags || []).join(', '), marketingName, new Date().toISOString() ]);
        const rowsToAppend = [];
        const rowsToUpdate = [];
        newContactsData.forEach(newRow => {
            const key = `${newRow[0]}|${newRow[2]}|${newRow[5]}`;
            if (existingDataMap.has(key)) {
                const { rowIndex } = existingDataMap.get(key);
                rowsToUpdate.push({ range: `'${sheetName}'!A${rowIndex}:M${rowIndex}`, values: [newRow] });
            } else {
                rowsToAppend.push(newRow);
            }
        });
        if (!headerExists) {
            rowsToAppend.unshift(HEADER);
        }
        if (rowsToAppend.length > 0) {
            await gapi.client.sheets.spreadsheets.values.append({ spreadsheetId, range: `'${sheetName}'!A1`, valueInputOption: 'USER_ENTERED', resource: { values: rowsToAppend } });
        }
        if (rowsToUpdate.length > 0) {
            await gapi.client.sheets.spreadsheets.values.batchUpdate({ spreadsheetId, resource: { valueInputOption: 'USER_ENTERED', data: rowsToUpdate } });
        }

    } catch (err) {
        logError("Error writing data to sheet", err);
        throw new Error(`Gagal menulis data ke Sheet: ${err.result ? err.result.error.message : err.message}`);
    }
}


async function executeSaveToSheet(button, contacts, sessionAcara, profile, collaborationSession, ui) {
    ui.setButtonLoading(button, true, ui.getTranslation('exportGSheetSaving'));
    try {
        const fileName = "Data Scan Kartu Nama";
        let sheetName = sessionAcara.trim() || "Data Kartu Nama";
        let spreadsheetId = await findOrCreateSpreadsheet(fileName);
        await findOrCreateSheetTab(spreadsheetId, sheetName);
        if (contacts.length === 0) {
            ui.showToast(ui.getTranslation('toastNoContactSave'));
        } else {
            await writeDataToSheet(spreadsheetId, sheetName, contacts, profile, collaborationSession);
            const spreadsheetUrl = `https://docs.google.com/spreadsheets/d/${spreadsheetId}`;
            ui.showToast(ui.getTranslation('toastGSheetSaveSuccess', contacts.length, spreadsheetUrl), 8000);
        }
    } catch (error) {
        logError("Error executing save to Google Sheet", error);
        ui.showToast(ui.getTranslation('toastGSheetSaveError', error.message));
    } finally {
        ui.setButtonLoading(button, false, ui.getTranslation('exportGSheet'));
    }
}

export async function saveAllToGoogleSheet(button, contacts, sessionAcara, profile, collaborationSession, ui) {
    try {
        if (!gapiInited || !gisInited) {
            throw new Error("Layanan Google belum siap. Mohon tunggu sebentar.");
        }
        if (gapi.client.getToken() === null) {
            tokenClient.callback = (resp) => {
                if (resp.error) {
                    logError("GIS Auth Error", resp);
                    ui.showToast(`Gagal otentikasi: ${resp.error}`);
                    return;
                }
                gapi.client.setToken({ 'access_token': resp.access_token });
                executeSaveToSheet(button, contacts, sessionAcara, profile, collaborationSession, ui);
            };
            tokenClient.requestAccessToken({ prompt: 'consent' });
        } else {
            await executeSaveToSheet(button, contacts, sessionAcara, profile, collaborationSession, ui);
        }
    } catch (error) {
        logError("Error in saveAllToGoogleSheet flow", error);
        ui.showToast(ui.getTranslation('toastGSheetSaveError', error.message));
    }
}
