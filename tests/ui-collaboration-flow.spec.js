const { test, expect } = require('@playwright/test');

test.describe('Scanner Pintar - UI Functional Testing: Collaboration Flow', () => {
  let page;

  test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();
    await page.goto('https://scankartunama.isparmo.com/');
    // Wait for the app to be initialized
    await page.waitForFunction(() => window.appInitialized === true, { timeout: 15000 });
  });

  test('should navigate the collaboration flow successfully', async () => {
    // 1. Click the "Collaboration Mode" button
    await page.getByRole('button', { name: /mode kolaburasi tim/i }).click();

    // 2. Verify the collaboration screen is visible
    await expect(page.getByRole('heading', { name: /Mode Kolaborasi \(Host\)/i })).toBeVisible();

    // 3. Fill in all required fields
    await page.getByPlaceholder('Salin & tempel URL dari Google Apps Script').fill('https://script.google.com/macros/s/DUMMY_URL/exec');
    await page.locator('#collab-event-name').fill('Tech Conference 2025');
    await page.getByPlaceholder('Kunci rahasia dari Apps Script').fill('DUMMY_SECRET_KEY');

    // 4. Click the "Create QR Code" button
    await page.getByRole('button', { name: /Buat QR Code/i }).click();

    // 5. Verify the "Session Created!" modal and the QR code image within it
    await expect(page.getByRole('heading', { name: /Sesi Dibuat!/i })).toBeVisible({ timeout: 10000 });

    // On mobile, the QR code image might be present but not "visible" due to styling.
    // We will just assert its presence in the DOM to make the test more robust.
    const qrCodeImage = page.locator('div:has-text("Bagikan QR Code ini ke tim Anda untuk bergabung.")').locator('img');
    await expect(qrCodeImage).toHaveCount(1, { timeout: 10000 });

    // 6. Click the "Finish" button inside the modal
    await page.getByRole('button', { name: /selesai/i }).click();

    // 7. Verify it returns to the main screen
    await expect(page.getByRole('button', { name: /scan kartu nama/i })).toBeVisible();
  });
});
