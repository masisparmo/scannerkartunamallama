import asyncio
from playwright.async_api import async_playwright
import os

async def main():
    # Pastikan direktori untuk menyimpan screenshot ada
    output_dir = "jules-scratch/verification"
    os.makedirs(output_dir, exist_ok=True)

    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page()

        # Menggunakan path absolut untuk file lokal
        file_path = os.path.abspath('presentasi.html')
        await page.goto(f'file://{file_path}')

        # Temukan kartu "Pro" di bagian "Business Model"
        card_selector = '#businessmodel .card-interactive'
        card = page.locator(card_selector).nth(1) # Kartu kedua adalah kartu "Pro"

        # Pastikan elemen ada sebelum melanjutkan
        await card.wait_for(state='visible')

        # Scroll ke elemen agar terlihat
        await card.scroll_into_view_if_needed()

        # Ambil screenshot hanya dari elemen kartu tersebut
        screenshot_path = os.path.join(output_dir, "pro_card_no_badge.png")
        await card.screenshot(path=screenshot_path)

        print(f"Screenshot berhasil disimpan di: {screenshot_path}")

        await browser.close()

if __name__ == '__main__':
    asyncio.run(main())
