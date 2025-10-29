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
        file_path = os.path.abspath('index.html')
        await page.goto(f'file://{file_path}')

        # Tunggu hingga aplikasi siap
        await page.wait_for_function('window.appInitialized === true')

        # Klik tombol "Lihat Hasil Scan" untuk pindah ke layar yang benar
        await page.click('#view-results-btn')

        # Temukan kontainer tombol impor/ekspor
        controls_selector = '#import-export-controls'
        controls_container = page.locator(controls_selector)

        # Pastikan kontainer terlihat
        await controls_container.wait_for(state='visible')

        # Ambil screenshot dari kontainer tersebut
        screenshot_path = os.path.join(output_dir, "swapped_icons_verification.png")
        await controls_container.screenshot(path=screenshot_path)

        print(f"Screenshot berhasil disimpan di: {screenshot_path}")

        await browser.close()

if __name__ == '__main__':
    asyncio.run(main())
