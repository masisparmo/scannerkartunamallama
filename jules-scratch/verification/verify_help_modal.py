
from playwright.sync_api import sync_playwright, expect

def run_verification():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # 1. Go to the application
        page.goto('http://localhost:8000')
        page.wait_for_function("() => window.appInitialized")

        # 2. Navigate to the collaboration screen
        page.click('#create-session-btn')
        page.wait_for_selector('#create-session-screen:not(.hidden)')

        # 3. Click the help link
        page.click('#show-collab-help-btn')

        # 4. Wait for the help modal to be visible
        help_modal = page.locator('#collab-help-modal')
        expect(help_modal).to_be_visible()

        # 5. Take a screenshot of the modal
        page.screenshot(path='jules-scratch/verification/collab_help_modal.png')

        print('Verification script for help modal ran successfully.')

        browser.close()

if __name__ == "__main__":
    run_verification()
