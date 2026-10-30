import os
from PIL import Image

assets_dir = "/Users/ath1614/Dadi-s-Dawai-Diary/OfrendaViva-AI/docs/assets"
output_gif = os.path.join(assets_dir, "ofrendaviva_demo.gif")

image_files = [
    "01_ofrenda_altar_main.png",
    "02_ancestor_detail_calaverita.png",
    "03_gemma_remembrance_modal.png",
    "07_candle_lighting_celebration.png",
    "04_ghost_machine_crt_seance.png",
    "05_spirit_dialogue_decrypted.png",
    "06_cobol_spirit_mainframe.png"
]

images = []
target_width = 1100

for filename in image_files:
    path = os.path.join(assets_dir, filename)
    if os.path.exists(path):
        img = Image.open(path).convert("RGB")
        w, h = img.size
        new_h = int(h * (target_width / w))
        resized = img.resize((target_width, new_h), Image.Resampling.LANCZOS)
        quantized = resized.quantize(colors=128, method=Image.Quantize.MEDIANCUT)
        images.append(quantized)

if images:
    durations = [2800, 2600, 2600, 2400, 2800, 2800, 2800]
    images[0].save(
        output_gif,
        save_all=True,
        append_images=images[1:],
        duration=durations,
        loop=0,
        optimize=True
    )
    print(f"Successfully generated {output_gif} ({os.path.getsize(output_gif)} bytes)")
else:
    print("No images found to compile GIF!")
