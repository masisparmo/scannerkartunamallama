import asyncio
from playwright.async_api import async_playwright, expect

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        context = await browser.new_context()
        page = await context.new_page()

        errors = []
        page.on("pageerror", lambda err: errors.append(err))

        # Navigate to the local file
        await page.goto("file:///app/index.html")

        # Go to the results screen
        await page.click("#view-results-btn")

        # Wait for the Google login button to be visible and enabled
        google_login_btn = page.locator("#google-login-btn")
        await expect(google_login_btn).to_be_visible(timeout=10000)
        await expect(google_login_btn).to_be_enabled(timeout=10000)

        # Check if there were any console errors
        if len(errors) > 0:
            print(f"Encountered {len(errors)} console errors.")
            for error in errors:
                print(error)
            raise Exception("Console errors detected during verification.")

        # Take a screenshot
        await page.screenshot(path="jules-scratch/verification/verification.png")

        await browser.close()

asyncio.run(main())