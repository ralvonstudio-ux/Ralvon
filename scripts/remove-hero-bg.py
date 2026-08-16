"""Cuts the laptop+pedestal out of the hero photo, discarding the pastel background."""
from rembg import remove
from PIL import Image

SRC = "public/assets/hero-laptop.webp"
OUT = "public/assets/hero-laptop-cutout.png"

with open(SRC, "rb") as f:
    input_bytes = f.read()

output_bytes = remove(input_bytes)

with open(OUT, "wb") as f:
    f.write(output_bytes)

img = Image.open(OUT)
print("saved", OUT, img.size, img.mode)
