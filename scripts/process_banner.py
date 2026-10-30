import os
import shutil
from PIL import Image

src_img = "/Users/ath1614/.gemini/antigravity-ide/brain/33e866db-d1aa-4e8e-9a2e-fb0ce930feda/ofrendaviva_cover_banner_1793389388375.jpg"
assets_dir = "/Users/ath1614/Dadi-s-Dawai-Diary/OfrendaViva-AI/docs/assets"

dest_raw = os.path.join(assets_dir, "ofrendaviva_cover_banner.jpg")
dest_1000x420 = os.path.join(assets_dir, "ofrendaviva_cover_1000x420.png")

# Copy raw
shutil.copyfile(src_img, dest_raw)
print(f"Copied raw cover to {dest_raw}")

# Crop and resize to 1000x420
img = Image.open(src_img)
w, h = img.size

target_ratio = 1000.0 / 420.0
current_ratio = w / h

if current_ratio > target_ratio:
    new_w = int(h * target_ratio)
    left = (w - new_w) // 2
    top = 0
    box = (left, top, left + new_w, h)
else:
    new_h = int(w / target_ratio)
    top = (h - new_h) // 2
    left = 0
    box = (left, top, w, top + new_h)

cropped = img.crop(box)
resized = cropped.resize((1000, 420), Image.Resampling.LANCZOS)
resized.save(dest_1000x420, "PNG", optimize=True)
print(f"Generated 1000x420 banner at {dest_1000x420}")
