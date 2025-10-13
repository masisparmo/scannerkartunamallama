import asyncio
from playwright.async_api import async_playwright, expect
import os

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        page = await browser.new_page()

        file_path = os.path.abspath('index.html')
        await page.goto(f'file://{file_path}', wait_until='load')

        # Add data to IndexedDB before any UI navigation.
        await page.evaluate("""() => {
            return new Promise((resolve, reject) => {
                const request = indexedDB.open('SmartScannerDB', 2);
                request.onerror = reject;
                request.onsuccess = (event) => {
                    const db = event.target.result;
                    const transaction = db.transaction(['contacts'], 'readwrite');
                    transaction.oncomplete = () => resolve();
                    transaction.onerror = (e) => reject(e.target.error);

                    const store = transaction.objectStore('contacts');
                    const contact = {
                        nama: 'Test Contact',
                        perusahaan: 'Test Company',
                        tags: ['test'],
                    };
                    store.add(contact);
                };
            });
        }""")

        # Navigate to the results screen.
        view_results_button = page.locator('[data-translate-key="viewResultsBtn"]')
        await expect(view_results_button).to_be_visible(timeout=10000)
        await view_results_button.click()

        # Assertions on the results screen.
        await expect(page.locator("#results-screen")).to_be_visible()
        await expect(page.locator(".contact-card")).to_be_visible()

        gsheet_button = page.locator('[data-translate-key="exportGSheet"]')
        await expect(gsheet_button).to_be_visible()
        await expect(gsheet_button).to_be_enabled()

        # Take the screenshot of the results page.
        screenshot_path = 'jules-scratch/verification/verification.png'
        await page.screenshot(path=screenshot_path)
        print(f"Screenshot saved to {screenshot_path}")

        await browser.close()

if __name__ == "__main__":
    asyncio.run(main())