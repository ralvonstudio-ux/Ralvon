"""
Prepares the RALVON logo assets for web use:
  - converts the flat background to real alpha transparency (luminance -> alpha,
    so anti-aliased edges stay smooth instead of a hard cutout)
  - autocrops to the glyph's bounding box (plus a small margin) so the mark
    fills its container instead of sitting in a sea of empty canvas

No glyph geometry is touched — only background removal and canvas cropping.
"""
from PIL import Image
import os

ASSET_DIR = os.path.join(os.path.dirname(__file__), "..", "public", "assets")

# (filename, mode) — "dark" = black glyph on white bg, "light" = white glyph on black bg
FILES = [
    ("logo-mark.png", "dark"),
    ("logo-wordmark-black.png", "dark"),
    ("logo-wordmark-white.png", "light"),
]

MARGIN_RATIO = 0.04  # 4% padding around the cropped glyph
NOISE_FLOOR = 14  # background isn't perfectly flat (JPEG-era noise); zero out anything this faint


def process(path, mode):
    img = Image.open(path).convert("RGBA")
    px = img.load()
    w, h = img.size

    for y in range(h):
        for x in range(w):
            r, g, b, a = px[x, y]
            luminance = (0.299 * r + 0.587 * g + 0.114 * b)
            raw_alpha = (255 - luminance) if mode == "dark" else luminance

            if raw_alpha <= NOISE_FLOOR:
                alpha = 0
            else:
                alpha = round((raw_alpha - NOISE_FLOOR) / (255 - NOISE_FLOOR) * 255)
                alpha = max(0, min(255, alpha))

            rgb = (0, 0, 0) if mode == "dark" else (255, 255, 255)
            px[x, y] = (*rgb, alpha)

    bbox = img.getbbox()
    if bbox:
        left, top, right, bottom = bbox
        mw = int((right - left) * MARGIN_RATIO)
        mh = int((bottom - top) * MARGIN_RATIO)
        left = max(0, left - mw)
        top = max(0, top - mh)
        right = min(w, right + mw)
        bottom = min(h, bottom + mh)
        img = img.crop((left, top, right, bottom))

    img.save(path)
    print(f"{os.path.basename(path)} -> {img.size}")


for filename, mode in FILES:
    process(os.path.join(ASSET_DIR, filename), mode)
