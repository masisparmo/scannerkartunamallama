
import { test, expect } from '@playwright/test';

test.describe('Profile vCard QR Code Feature', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:8000');
    // Wait for the app to be fully initialized
    await page.waitForFunction(() => window.appInitialized === true);
  });

  test('should generate and display the vCard QR code', async ({ page }) => {
    // 1. Open Profile Modal
    await page.click('#profile-settings-btn');
    await expect(page.locator('#profile-screen')).toBeVisible();

    // 2. Fill in the profile data
    const profileData = {
      nama: 'Budi Darmawan',
      jabatan: 'Software Engineer',
      perusahaan: 'PT Teknologi Canggih',
      whatsapp: '081234567890',
      email: 'budi.darmawan@tech.co',
      website: 'https://tech.co',
      telp_kantor: '0215551234',
      deskripsi: 'Pengembang perangkat lunak.',
    };

    await page.fill('#profile-nama', profileData.nama);
    await page.fill('#profile-jabatan', profileData.jabatan);
    await page.fill('#profile-perusahaan', profileData.perusahaan);
    await page.fill('#profile-whatsapp', profileData.whatsapp);
    await page.fill('#profile-email', profileData.email);
    await page.fill('#profile-website', profileData.website);
    await page.fill('#profile-telp-kantor', profileData.telp_kantor);
    await page.fill('#profile-deskripsi', profileData.deskripsi);

    // 3. Save the profile
    await page.click('#save-profile-btn');

    // Re-open profile to check the QR code
    await page.click('#profile-settings-btn');

    // 4. Switch to the vCard QR Code tab
    await page.click('#tab-qrcode');

    // 5. Wait for rendering and take a screenshot for manual verification
    await page.waitForTimeout(500); // Wait half a second for everything to settle.
    await page.screenshot({ path: 'final_verification_qrcode.png' });

    console.log('Visual verification screenshot saved as final_verification_qrcode.png');
  });
});
