"""
Manual cutout (rembg mis-classified the dark laptop body + pedestal as
background, keeping only the bright screen). The background here is a
uniform light pastel gradient and the device/pedestal are near-black, so a
brightness threshold — plus always keeping the known screen quad — gives a
clean, reliable matte.
"""
import numpy as np
from PIL import Image, ImageDraw, ImageFilter

SRC = "hero-laptop-with-bg.webp"  # produced by edit-hero-laptop.py
OUT = "public/assets/hero-laptop-cutout.webp"

QUAD = [(124, 230), (656, 163), (643, 644), (113, 654)]
DARK_THRESHOLD = 160  # max(R,G,B) below this = device/pedestal (incl. its lit seam ~115-123); background is 198+

img = Image.open(SRC).convert("RGB")
arr = np.array(img)
w, h = img.size

brightness = arr.max(axis=2)
dark_mask = (brightness < DARK_THRESHOLD).astype(np.uint8) * 255

screen_mask = Image.new("L", (w, h), 0)
ImageDraw.Draw(screen_mask).polygon(QUAD, fill=255)

alpha = np.maximum(dark_mask, np.array(screen_mask))
alpha_img = Image.fromarray(alpha, "L").filter(ImageFilter.GaussianBlur(1.2))

result = img.convert("RGBA")
result.putalpha(alpha_img)

# Trim to the opaque bounding box so the exported asset has no dead transparent margin.
bbox = result.getbbox()
result = result.crop(bbox)

result.save(OUT, "WEBP", quality=90, method=6)
print("saved", OUT, result.size)
