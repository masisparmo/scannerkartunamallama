// INSTRUCTIONS FOR HOST (v2):
// 1. Open your Google Sheet.
// 2. Go to Extensions > Apps Script.
// 3. Copy all the code from this file and paste it into the `Code.gs` file in the Apps Script editor.
// 4. CHANGE THE `YOUR_SECRET_KEY` variable below to a strong, unique secret key.
// 5. Click the "Deploy" button > "New deployment".
// 6. For "Select type", choose "Web app".
// 7. In the "Description" field, you can write "Business Card Scanner Collaboration v2".
// 8. For "Execute as", select "Me".
// 9. For "Who has access", select "Anyone". **IMPORTANT: This is necessary for the script to receive data.**
// 10. Click "Deploy".
// 11. On the next screen, click "Authorize access" and approve the permissions for the script to edit your Google Sheets.
// 12. After authorization, it will show you a "Web app URL". COPY this URL. You will need it for the Scanner Pintar app.

// --- START OF SCRIPT ---

// CONFIGURATION: Change this key to your own secret password.
const SECRET_KEY = "YOUR_SECRET_KEY";

// Define the exact header columns and their order to match the app's "Edit Kontak" form.
const HEADERS = [
  "Timestamp", "Team Member", "Nama", "Jabatan", "Perusahaan", "Jenis Perusahaan",
  "Telepon Kantor", "WhatsApp", "Email", "Tags", "Acara", "Tanggal", "Catatan"
];

/**
 * Handles HTTP POST requests to the web app.
 * This function now supports updating existing entries to prevent duplicates.
 */
function doPost(e) {
  try {
    const requestData = JSON.parse(e.postData.contents);
    const { key, eventName, teamMember, cardData } = requestData;

    // 1. Security Check: Validate the secret key
    if (key !== SECRET_KEY) {
      return createJsonResponse({ "status": "error", "message": "Invalid Secret Key." });
    }

    // 2. Data Validation: Ensure required data is present
    if (!eventName || !teamMember || !cardData) {
      return createJsonResponse({ "status": "error", "message": "Missing required data: eventName, teamMember, or cardData." });
    }

    // 3. Get or Create the Sheet (Tab) for the event
    const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = spreadsheet.getSheetByName(eventName);
    if (!sheet) {
      sheet = spreadsheet.insertSheet(eventName);
      sheet.appendRow(HEADERS);
    }

    // 4. Find existing row or prepare for a new one
    const dataRange = sheet.getDataRange();
    const values = dataRange.getValues();

    // Find column indices for Nama, Perusahaan, and WhatsApp for matching
    const headerRow = values[0];
    const nameIndex = headerRow.indexOf("Nama");
    const companyIndex = headerRow.indexOf("Perusahaan");
    const whatsappIndex = headerRow.indexOf("WhatsApp");

    let existingRowIndex = -1;
    if (nameIndex > -1 && companyIndex > -1 && whatsappIndex > -1) {
      for (let i = 1; i < values.length; i++) {
        const row = values[i];
        if (row[nameIndex] === cardData.nama &&
            row[companyIndex] === cardData.perusahaan &&
            row[whatsappIndex] === cardData.whatsapp) {
          existingRowIndex = i + 1; // +1 because sheet rows are 1-indexed
          break;
        }
      }
    }

    // 5. Prepare the new row data in the correct order
    const timestamp = new Date();
    const newRowData = HEADERS.map(header => {
        switch(header) {
            case "Timestamp": return timestamp;
            case "Team Member": return teamMember;
            case "Nama": return cardData.nama || "";
            case "Jabatan": return cardData.jabatan || "";
            case "Perusahaan": return cardData.perusahaan || "";
            case "Jenis Perusahaan": return cardData.jenis_perusahaan || "";
            case "Telepon Kantor": return cardData.telepon_kantor ? "'" + cardData.telepon_kantor : "";
            case "WhatsApp": return cardData.whatsapp || "";
            case "Email": return cardData.email || "";
            case "Tags": return (cardData.tags || []).join(', ');
            case "Acara": return cardData.acara || "";
            case "Tanggal": return cardData.tanggal || "";
            case "Catatan": return cardData.catatan || "";
            default: return "";
        }
    });

    // 6. Update existing row or append new row
    if (existingRowIndex !== -1) {
      // Update the existing row
      const range = sheet.getRange(existingRowIndex, 1, 1, HEADERS.length);
      range.setValues([newRowData]);
      return createJsonResponse({ "status": "success", "message": `Data for ${cardData.nama} updated in ${eventName}.` });
    } else {
      // Append a new row
      sheet.appendRow(newRowData);
      return createJsonResponse({ "status": "success", "message": `Data for ${cardData.nama} saved to ${eventName}.` });
    }

  } catch (error) {
    Logger.log(error.toString());
    return createJsonResponse({ "status": "error", "message": "An error occurred: " + error.toString() });
  }
}

/**
 * Helper function to create a JSON response.
 */
function createJsonResponse(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
