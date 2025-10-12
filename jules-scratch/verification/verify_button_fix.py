import asyncio
from playwright.async_api import async_playwright, expect
import os

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page()

        # Get the absolute path to the index.html file
        file_path = os.path.abspath('index.html')

        # Navigate to the local HTML file
        await page.goto(f'file://{file_path}')

        # Click the "View Scan Results" button to navigate to the results screen
        await page.get_by_role("button", name="LIHAT HASIL SCAN").click()

        # The results screen should now be visible
        await expect(page.get_by_role("heading", name="Hasil Scan")).to_be_visible()

        # The key element to check is the Google Login button.
        # It starts as disabled and should now be enabled by the logic in showScreen.
        login_button = page.get_by_role("button", name="LOGIN DENGAN GOOGLE")

        # Wait for the button to be enabled. This implicitly waits for the Google Auth
        # libraries to load and our script to enable the button.
        # We give it a generous timeout because of potential network latency for the GSI script.
        await expect(login_button).to_be_enabled(timeout=15000)

        # Take a screenshot of the results footer to visually confirm the state
        results_footer = page.locator("#results-footer")
        await results_footer.screenshot(path="jules-scratch/verification/button_fix_verification.png")

        print("Verification for button fix completed successfully. Button is enabled.")

        await browser.close()

if __name__ == "__main__":
    asyncio.run(main())