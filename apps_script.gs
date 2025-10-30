// INSTRUCTIONS FOR HOST:
// 1. Open your Google Sheet.
// 2. Go to Extensions > Apps Script.
// 3. Copy all the code from this file and paste it into the `Code.gs` file in the Apps Script editor.
// 4. CHANGE THE `YOUR_SECRET_KEY` variable below to a strong, unique secret key.
// 5. Click the "Deploy" button > "New deployment".
// 6. For "Select type", choose "Web app".
// 7. In the "Description" field, you can write "Business Card Scanner Collaboration".
// 8. For "Execute as", select "Me".
// 9. For "Who has access", select "Anyone". **IMPORTANT: This is necessary for the script to receive data.**
// 10. Click "Deploy".
// 11. On the next screen, click "Authorize access" and approve the permissions for the script to edit your Google Sheets.
// 12. After authorization, it will show you a "Web app URL". COPY this URL. You will need it for the Scanner Pintar app.

// --- START OF SCRIPT ---

// CONFIGURATION: Change this key to your own secret password.
const SECRET_KEY = "YOUR_SECRET_KEY";

/**
 * Handles HTTP POST requests to the web app.
 * This is the main function that receives data from the team members' scanners.
 */
function doPost(e) {
  try {
    const requestData = JSON.parse(e.postData.contents);
    const { key, eventName, teamMember, cardData } = requestData;

    // 1. Security Check: Validate the secret key
    if (key !== SECRET_KEY) {
      return ContentService
        .createTextOutput(JSON.stringify({ "status": "error", "message": "Invalid Secret Key." }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    // 2. Data Validation: Ensure required data is present
    if (!eventName || !teamMember || !cardData) {
      return ContentService
        .createTextOutput(JSON.stringify({ "status": "error", "message": "Missing required data: eventName, teamMember, or cardData." }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    // 3. Get or Create the Sheet (Tab) for the event
    const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = spreadsheet.getSheetByName(eventName);

    if (!sheet) {
      sheet = spreadsheet.insertSheet(eventName);
      // Create headers for the new sheet
      const headers = [
        "Timestamp",
        "Team Member",
        "Contact Name",
        "Company",
        "Position",
        "WhatsApp",
        "Phone",
        "Email",
        "Website",
        "Address",
        "Notes"
      ];
      sheet.appendRow(headers);
    }

    // 4. Prepare and Append the Data
    const timestamp = new Date();
    const newRow = [
      timestamp,
      teamMember,
      cardData.nama || "",
      cardData.perusahaan || "",
      cardData.jabatan || "",
      cardData.hp || "",
      cardData.telepon || "",
      cardData.email || "",
      cardData.website || "",
      cardData.alamat || "",
      cardData.catatan || ""
    ];

    sheet.appendRow(newRow);

    // 5. Return a Success Response
    return ContentService
      .createTextOutput(JSON.stringify({ "status": "success", "message": "Data saved successfully to " + eventName }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    // Error Handling
    Logger.log(error.toString());
    return ContentService
      .createTextOutput(JSON.stringify({ "status": "error", "message": "An error occurred: " + error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
