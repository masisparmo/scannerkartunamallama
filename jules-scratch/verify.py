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

        # Temukan kartu pertama di bagian "Problem"
        card_selector = '#problem .card-interactive'
        card = page.locator(card_selector).first

        # Pastikan elemen ada sebelum melanjutkan
        await card.wait_for(state='visible')

        # Arahkan mouse ke sudut kanan atas kartu untuk mengaktifkan efek
        bounding_box = await card.bounding_box()
        if bounding_box:
            hover_x = bounding_box['x'] + bounding_box['width'] - 20
            hover_y = bounding_box['y'] + 20
            await page.mouse.move(hover_x, hover_y)

        # Beri sedikit waktu agar efek transisi CSS selesai
        await page.wait_for_timeout(500)

        # Ambil screenshot hanya dari elemen kartu tersebut
        screenshot_path = os.path.join(output_dir, "glowing_border_effect.png")
        await card.screenshot(path=screenshot_path)

        print(f"Screenshot berhasil disimpan di: {screenshot_path}")

        await browser.close()

if __name__ == '__main__':
    asyncio.run(main())
