import asyncio
from playwright.async_api import async_playwright, expect
import os
import sys

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page()

        # Listen for any uncaught page errors and fail the test if they occur
        page.on("pageerror", lambda err: {
            print(f"FATAL PAGE ERROR: {err}"),
            os._exit(1) # Exit with a non-zero code to fail the step
        })

        # Get the full path to the HTML file
        file_path = "file://" + os.path.abspath("index.html")
        await page.goto(file_path)

        # Clear local storage and reload to ensure a clean state
        await page.evaluate("localStorage.clear()")
        await page.reload()

        # 1. Verify buttons on the initial screen are functional
        await expect(page.get_by_role("button", name="LIHAT HASIL SCAN")).to_be_enabled()
        await page.get_by_role("button", name="LIHAT HASIL SCAN").click()

        # 2. Assert that we are on the results screen and the login button is visible and enabled
        await expect(page.locator("#results-screen")).to_be_visible()
        login_button = page.locator("#google-login-btn")
        await expect(login_button).to_be_visible()
        await expect(login_button).to_be_enabled()

        # 3. Inject data to simulate having a scanned card
        await page.evaluate("""
            () => {
                return new Promise((resolve, reject) => {
                    const request = indexedDB.open('SmartScannerDB', 2);
                    request.onerror = reject;
                    request.onsuccess = (event) => {
                        const db = event.target.result;
                        const transaction = db.transaction(['contacts'], 'readwrite');
                        const store = transaction.objectStore('contacts');
                        store.add({
                            nama: 'Final Test Corrected',
                            jabatan: 'Verifier',
                            perusahaan: 'Test Corp',
                            email: 'final-corrected@example.com',
                            whatsapp: '6281234567890',
                            acara: 'Final Test Corrected Event'
                        });
                        transaction.oncomplete = resolve;
                        transaction.onerror = reject;
                    };
                });
            }
        """)

        # 4. Manually call refreshResults() to update the view
        await page.evaluate("window.refreshResults()")

        # 5. Verify the "Save to Google Sheet" button is now visible and enabled
        save_button = page.locator("#export-gsheet-btn")
        await expect(save_button).to_be_visible()
        await expect(save_button).to_be_enabled()

        # 6. Take a screenshot of the final state of the footer
        footer_element = page.locator("#results-footer")
        await footer_element.screenshot(path="jules-scratch/verification/verification.png")

        print("Verification successful, no page errors detected.")
        await browser.close()

if __name__ == "__main__":
    asyncio.run(main())