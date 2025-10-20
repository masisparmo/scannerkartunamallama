import { BACKEND_API_URL, EMAIL_GENERATOR_URL, WA_GENERATOR_URL } from './config.js';
import { logError } from './database.js';

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

export async function processImageWithAI(imageDataUrl, ui) {
    try {
        ui.updateProcessingTitle('processingTitle');
        const finalImageDataUrl = await resizeImage(imageDataUrl);

        const extractResponse = await fetch(`${BACKEND_API_URL}/processBusinessCard`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ imageDataUrl: finalImageDataUrl })
        });
        if (!extractResponse.ok) { const errorText = await extractResponse.text(); throw new Error(`Backend Error: ${extractResponse.status}. Detail: ${errorText}`); }
        const extractResult = await extractResponse.json();
        const jsonString = extractResult.data;
        if (!jsonString) { throw new Error("Invalid response from Backend."); }
        const extractedData = JSON.parse(jsonString);

        ui.updateProcessingTitle('processingRefining');
        const refineResponse = await fetch(`${BACKEND_API_URL}/refineAndTranslate`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ extractedData })
        });
        if (!refineResponse.ok) { const errorText = await refineResponse.text(); throw new Error(`Refinement Error: ${refineResponse.status}. Detail: ${errorText}`); }
        const refineResult = await refineResponse.json();
        const refinedJsonString = refineResult.data;
        if (!refinedJsonString) { throw new Error("Invalid response from finalization process."); }
        const finalData = JSON.parse(refinedJsonString);

        return finalData;

    } catch (error) {
        if (error instanceof TypeError && error.message.includes('Failed to fetch')) {
            const errorMessage = "Failed to connect to the scan server. This might be due to a browser extension (Ad-Blocker) or a network issue. Try Incognito mode.";
            logError("Processing Error (Fetch Error):", error);
            ui.showToast(errorMessage, 5000);
        } else {
            logError("Processing Error (General Error):", error);
            ui.showToast(`Failed to process image: ${error.message}`);
        }
        ui.showScreen('initial');
        return null;
    }
}


export async function generateAndOpenEmail(contact, profile, currentLang, ui) {
    const emailBtn = document.getElementById('action-email');
    ui.setButtonLoading(emailBtn, true);

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
        logError("Failed to generate email:", error);
        ui.showToast(error.message);
    } finally {
        ui.setButtonLoading(emailBtn, false, ui.getTranslation('actionDraftEmail'));
    }
}

export async function generateAndOpenWa(contact, profile, currentLang, ui) {
    const waAiBtn = document.getElementById('action-whatsapp-ai');
    ui.setButtonLoading(waAiBtn, true);

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
            const waNumber = ui.formatWA(contact.whatsapp);
            const url = `https://wa.me/${waNumber}?text=${message}`;
            window.open(url, '_blank');
            ui.closeActionModal();
        } else { throw new Error('Invalid AI response for WA.'); }
    } catch (error) {
        logError("Failed to generate WA message:", error);
        ui.showToast(error.message);
    } finally {
        ui.setButtonLoading(waAiBtn, false, ui.getTranslation('actionDraftWA'));
    }
}

export async function sendCollaborativeData(contact, ui) {
    try {
        const response = await fetch(`${BACKEND_API_URL}/simpan-gsheet`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ contact: contact })
        });
        const result = await response.json();
        if (!response.ok || !result.success) throw new Error(result.error || 'Failed to send data.');
        ui.showToast(ui.getTranslation('toastDataSentToGSheet', contact.nama));
    } catch (error) {
        logError("Failed to send collaborative data", error);
        ui.showToast(ui.getTranslation('toastFailSendGSheet', contact.nama));
    }
}

export async function handleCollabSessionCreation(authCode, acara, ui) {
    const btn = document.getElementById('generate-session-qr-btn');
    ui.setButtonLoading(btn, true);

    try {
        const response = await fetch(`${BACKEND_API_URL}/initiate-collab-session`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ authCode, acara })
        });

        const result = await response.json();
        if (!response.ok || !result.success) {
            throw new Error(result.error || 'Gagal memulai sesi kolaborasi di server.');
        }

        const { sessionId } = result;
        const baseUrl = window.location.origin + window.location.pathname;
        const collabUrl = `${baseUrl}?sesi=${sessionId}&acara=${encodeURIComponent(acara)}`;

        ui.showQRCodeModal(collabUrl);

    } catch (error) {
        logError("Error initiating collaboration session", error);
        ui.showToast(`Error: ${error.message}`);
    } finally {
        ui.setButtonLoading(btn, false);
    }
}
