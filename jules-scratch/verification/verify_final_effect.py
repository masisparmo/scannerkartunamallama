import os
from playwright.sync_api import sync_playwright

def run_verification():
    """
    Buka presentasi.html, gerakkan mouse di atas kartu untuk menunjukkan
    efek cahaya bingkai neon, dan ambil screenshot.
    """
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        html_file_path = os.path.abspath('presentasi.html')
        page.goto(f'file://{html_file_path}')

        card_selector = '.card-interactive'
        card_element = page.locator(card_selector).first

        if card_element.is_visible():
            # Dapatkan kotak pembatas kartu untuk menggerakkan mouse di atasnya
            box = card_element.bounding_box()
            if box:
                # Gerakkan mouse ke pojok kiri atas untuk mengaktifkan efek hover
                page.mouse.move(box['x'] + 5, box['y'] + 5)
                page.wait_for_timeout(300) # Waktu untuk CSS transisi

                # Gerakkan mouse ke tengah kanan
                page.mouse.move(box['x'] + box['width'] - 5, box['y'] + box['height'] / 2)
                page.wait_for_timeout(300)

                # Gerakkan mouse ke pojok kanan bawah
                page.mouse.move(box['x'] + box['width'] - 5, box['y'] + box['height'] - 5)
                page.wait_for_timeout(300)

                # Ambil screenshot dari kartu tersebut setelah mouse bergerak
                screenshot_path = 'jules-scratch/verification/final_neon_frame_effect.png'
                card_element.screenshot(path=screenshot_path)
                print(f"Screenshot berhasil disimpan di {screenshot_path}")
            else:
                print("Tidak bisa mendapatkan bounding box dari elemen kartu.")
        else:
            print("Elemen kartu tidak ditemukan atau tidak terlihat.")

        browser.close()

if __name__ == "__main__":
    run_verification()
