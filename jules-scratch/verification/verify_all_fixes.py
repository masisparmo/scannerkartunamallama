import asyncio
from playwright.async_api import async_playwright, expect
import os

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page()

        # --- Verification Step 1: Test the inactive button fix ---
        print("Verifying fix for inactive buttons...")

        # Get the absolute path to the index.html file
        index_path = os.path.abspath('index.html')

        # Navigate to the local HTML file
        await page.goto(f'file://{index_path}')

        # Click the "View Scan Results" button
        await page.get_by_role("button", name="LIHAT HASIL SCAN").click()

        # Assert the results screen is visible
        await expect(page.get_by_role("heading", name="Hasil Scan")).to_be_visible()

        # Assert that the "Login with Google" button becomes enabled
        login_button = page.get_by_role("button", name="LOGIN DENGAN GOOGLE")
        await expect(login_button).to_be_enabled(timeout=15000)

        # Take a screenshot to visually confirm the button is active
        await page.locator("#results-footer").screenshot(path="jules-scratch/verification/button_fix_verification.png")
        print("Button fix verification successful. Screenshot saved.")

        # --- Verification Step 2: Test the error log page ---
        print("\nVerifying error log page...")

        # Get the absolute path to the errorlogs.html file
        error_page_path = os.path.abspath('errorlogs.html')

        # Navigate to the error log page
        await page.goto(f'file://{error_page_path}')

        # Assert the main heading is visible
        await expect(page.get_by_role("heading", name="Application Error Logs")).to_be_visible()

        # Assert the "Copy Logs" button is visible
        await expect(page.get_by_role("button", name="Copy Logs")).to_be_visible()

        # Take a screenshot to visually confirm the page layout
        await page.screenshot(path="jules-scratch/verification/error_page_verification.png")
        print("Error log page verification successful. Screenshot saved.")

        await browser.close()
        print("\nAll verification steps completed successfully.")

if __name__ == "__main__":
    asyncio.run(main())