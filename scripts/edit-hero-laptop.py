"""
Takes the user-supplied laptop mockup photo, erases the on-screen UI/text
(replacing it with a gradient sampled from the photo's own background so the
patch blends seamlessly), then bakes in new minimal RALVON text — perspective
-warped into the exact same skewed screen plane as the original content, so
it reads as if it were really on that tilted display.
"""
import numpy as np
from PIL import Image, ImageDraw, ImageFont

SRC = "AI Operations - Landing Page (original backup).jpg"  # original source photo (kept outside public/assets)
OUT = "hero-laptop-with-bg.webp"  # intermediate (pre-cutout) — see cutout-hero-laptop.py

# Screen content quadrilateral, detected from the source photo (top-left,
# top-right, bottom-right, bottom-left), clockwise.
QUAD = [(124, 230), (656, 163), (643, 644), (113, 654)]

FONT_DIR = "C:/Windows/Fonts/"


def find_coeffs(pb, pa):
    """Coefficients for PIL's PERSPECTIVE transform mapping pa -> pb."""
    matrix = []
    for p1, p2 in zip(pa, pb):
        matrix.append([p1[0], p1[1], 1, 0, 0, 0, -p2[0] * p1[0], -p2[0] * p1[1]])
        matrix.append([0, 0, 0, p1[0], p1[1], 1, -p2[1] * p1[0], -p2[1] * p1[1]])
    A = np.array(matrix, dtype=float)
    B = np.array(pb).reshape(8)
    res = np.linalg.solve(A, B)
    return res.tolist()


def bilinear_gradient(size, c_tl, c_tr, c_br, c_bl):
    w, h = size
    arr = np.zeros((h, w, 3), dtype=np.float64)
    top = np.linspace(c_tl, c_tr, w)
    bottom = np.linspace(c_bl, c_br, w)
    for y in range(h):
        t = y / max(h - 1, 1)
        row = top * (1 - t) + bottom * t
        arr[y] = row
    return Image.fromarray(arr.astype(np.uint8), "RGB")


def main():
    base = Image.open(SRC).convert("RGBA")
    w, h = base.size

    xs = [p[0] for p in QUAD]
    ys = [p[1] for p in QUAD]
    bbox = (min(xs), min(ys), max(xs), max(ys))
    bw, bh = bbox[2] - bbox[0], bbox[3] - bbox[1]

    # --- 1. Erase existing UI: fill the quad with a gradient sampled from
    # the photo's own screen background (kept blank at these sample points).
    fill = bilinear_gradient(
        (bw, bh),
        base.getpixel((145, 250))[:3],
        base.getpixel((610, 210))[:3],
        base.getpixel((600, 610))[:3],
        base.getpixel((140, 600))[:3],
    )
    mask = Image.new("L", (w, h), 0)
    ImageDraw.Draw(mask).polygon(QUAD, fill=255)
    fill_full = Image.new("RGB", (w, h), (255, 255, 255))
    fill_full.paste(fill, (bbox[0], bbox[1]))
    base = Image.composite(fill_full.convert("RGBA"), base, mask)

    # --- 2. Build the new minimal text layer on a flat rectangle sized to
    # roughly match the quad's own proportions, then perspective-warp it in.
    scale = 2  # supersample for crisp small text
    tw, th = int(bw * scale), int(bh * scale)
    layer = Image.new("RGBA", (tw, th), (0, 0, 0, 0))
    draw = ImageDraw.Draw(layer)

    ink = (37, 36, 34, 255)
    graphite = (64, 61, 57, 235)
    accent = (235, 94, 40, 255)
    ivory = (255, 252, 239, 255)

    sans = ImageFont.truetype(FONT_DIR + "arial.ttf", int(15 * scale))
    sans_bold = ImageFont.truetype(FONT_DIR + "arialbd.ttf", int(14 * scale))
    serif = ImageFont.truetype(FONT_DIR + "georgia.ttf", int(40 * scale))
    serif_italic = ImageFont.truetype(FONT_DIR + "georgiai.ttf", int(40 * scale))

    pad = int(36 * scale)

    # Nav row: wordmark left, single CTA pill right
    draw.text((pad, int(28 * scale)), "RALVON", font=sans_bold, fill=ink)
    btn_w, btn_h = int(118 * scale), int(30 * scale)
    btn_x, btn_y = tw - pad - btn_w, int(20 * scale)
    draw.rounded_rectangle(
        [btn_x, btn_y, btn_x + btn_w, btn_y + btn_h], radius=btn_h // 2, fill=ink
    )
    draw.text(
        (btn_x + btn_w / 2, btn_y + btn_h / 2),
        "Start a Project",
        font=sans,
        fill=ivory,
        anchor="mm",
    )

    # Headline, roughly vertically centered — two lines, second word italic
    cy = th * 0.46
    draw.text((pad, cy - int(26 * scale)), "Digital products,", font=serif, fill=ink)
    line2_y = cy + int(20 * scale)
    draw.text((pad, line2_y), "built to ", font=serif, fill=ink)
    w1 = draw.textlength("built to ", font=serif)
    draw.text((pad + w1, line2_y), "last.", font=serif_italic, fill=accent)

    # Small supporting line
    sub_y = line2_y + int(60 * scale)
    draw.text(
        (pad, sub_y),
        "Websites, applications and systems — engineered to endure.",
        font=sans,
        fill=graphite,
    )

    layer = layer.resize((bw, bh), Image.LANCZOS)

    # --- 3. Warp the flat text rectangle into the detected screen quad.
    rect = [(0, 0), (bw, 0), (bw, bh), (0, bh)]
    quad_local = [(x - bbox[0], y - bbox[1]) for x, y in QUAD]
    coeffs = find_coeffs(rect, quad_local)
    warped_local = layer.transform((bw, bh), Image.PERSPECTIVE, coeffs, Image.BICUBIC)

    warped_full = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    warped_full.paste(warped_local, (bbox[0], bbox[1]), warped_local)

    result = Image.alpha_composite(base, warped_full).convert("RGB")
    result.save(OUT, "WEBP", quality=85, method=6)
    print("saved", OUT, result.size)


if __name__ == "__main__":
    main()
