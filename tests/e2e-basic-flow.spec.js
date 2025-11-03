const { test, expect } = require('@playwright/test');
const path = require('path');

test.describe('Scanner Pintar - End-to-End Basic Flow', () => {
  let page;

  test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();
    await page.goto('https://scankartunama.isparmo.com/');
    // Wait for the app to be initialized
    await page.waitForFunction(() => window.appInitialized === true, { timeout: 15000 });
  });

  test('should allow scanning a business card and verifying the result', async () => {
    // The "Scan" button is a label for a hidden file input. We interact directly with the input.
    const imagePath = path.join(__dirname, 'assets', 'kartu-nama_4.jpg');
    await page.locator('#image-upload-input').setInputFiles(imagePath);

    // The AI processing is fast. Instead of checking for a transient loading overlay,
    // we directly wait for and verify the result on the "Edit Kontak" screen.

    // Verify the extracted text. The `toHaveValue` command will implicitly wait for the element to appear.
    await expect(page.locator('#edit-jabatan')).toHaveValue('Engineering Manager', { timeout: 20000 });
    await expect(page.locator('#edit-perusahaan')).toHaveValue('PT. Geotechnical Systemindo', { timeout: 20000 });

    // Take a screenshot for final verification
    await page.screenshot({ path: 'tests/screenshots/scan-result-verified.png' });
  });
});
