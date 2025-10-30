
import { test, expect } from '@playwright/test';

test('verifies contact count and phone number formatting', async ({ page }) => {
  // 1. Go to the application
  await page.goto('http://localhost:8000');
  await page.waitForFunction(() => window.appInitialized);

  // 2. Check initial contact count on the home screen
  const initialHomeCount = await page.textContent('#home-contact-count');
  expect(initialHomeCount).toBe('0');

  // 3. Simulate creating a new contact
  await page.evaluate(() => {
    const mockContact = {
      nama: 'Budi Darmawan',
      jabatan: 'Kepala Proyek',
      perusahaan: 'PT Konstruksi Jaya',
      telepon_kantor: '02188776655', // Phone number with leading zero
      whatsapp: '6281234567890',
      email: 'budi.darmawan@konstruksi.com',
      acara: 'Pameran Konstruksi 2025'
    };
    window.openEditModalForNewContact(mockContact);
  });

  // 4. Wait for the edit modal to be visible and save the contact
  await page.waitForSelector('#edit-modal:not(.hidden)');
  await expect(page.locator('#edit-telepon_kantor')).toHaveValue('02188776655');
  await page.click('#save-edit-btn');

  // 5. Wait for the modal to disappear. The app should now be on the results screen.
  await page.locator('#edit-modal').waitFor({ state: 'hidden', timeout: 5000 });

  // 6. Verify we are on the results screen and the count is correct there
  await page.waitForSelector('#results-screen:not(.hidden)');
  const resultsCountText = await page.textContent('#results-contact-count');
  expect(resultsCountText).toBe('1');
  await expect(page.locator('.contact-card .font-bold')).toHaveText('Budi Darmawan');

  // 7. Click the "Main Menu" button to go back to the home screen
  await page.click('#back-to-home-btn');

  // 8. Verify we are back on the initial screen
  await page.waitForSelector('#initial-screen:not(.hidden)');

  // 9. Verify the contact count on the home screen has updated to 1
  const finalHomeCount = await page.textContent('#home-contact-count');
  expect(finalHomeCount).toBe('1');

  console.log('Verification complete: Test passed all steps successfully.');

  // 10. Take a screenshot for final visual confirmation
  await page.screenshot({ path: 'verification_screenshot.png' });
});
