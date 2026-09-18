"""Regenera public/og.png, la tarjeta de previsualizacion al compartir el enlace.

Reproduce el diseno original (cielo nocturno, luna arriba a la derecha) cambiando
solo el rol: "Full Stack" -> "Backend Junior".
"""
import random
from PIL import Image, ImageDraw, ImageFont

W, H = 1200, 630
ARRIBA = (11, 14, 32)      # azul noche casi negro
ABAJO = (78, 58, 100)      # violeta del borde inferior

BLANCO = (255, 255, 255)
SUBTITULO = (185, 192, 216)
AZUL = (91, 138, 232)
APAGADO = (139, 147, 173)

NEGRITA = "C:/Windows/Fonts/arialbd.ttf"
NORMAL = "C:/Windows/Fonts/arial.ttf"

img = Image.new("RGB", (W, H))
d = ImageDraw.Draw(img)

# Degradado vertical. El exponente mantiene oscura la mitad superior y deja
# que el violeta aparezca solo en la franja de abajo, como en el original.
for y in range(H):
    t = (y / (H - 1)) ** 2.2
    d.line(
        [(0, y), (W, y)],
        fill=tuple(round(a + (b - a) * t) for a, b in zip(ARRIBA, ABAJO)),
    )

# Estrellas. Semilla fija para que la imagen sea reproducible.
rnd = random.Random(20260918)
estrellas = Image.new("RGBA", (W, H), (0, 0, 0, 0))
de = ImageDraw.Draw(estrellas)
for _ in range(190):
    x, y = rnd.uniform(0, W), rnd.uniform(0, H)
    r = rnd.choice([0.8, 1.0, 1.2, 1.5, 1.9])
    alpha = rnd.randint(70, 235)
    de.ellipse([x - r, y - r, x + r, y + r], fill=(255, 255, 255, alpha))
img = Image.alpha_composite(img.convert("RGBA"), estrellas)

# Luna con halo: circulos concentricos de fuera hacia dentro.
LUNA_X, LUNA_Y, LUNA_R = 995, 148, 58
halo = Image.new("RGBA", (W, H), (0, 0, 0, 0))
dh = ImageDraw.Draw(halo)
for paso in range(60, 0, -1):
    r = LUNA_R + paso * 3.2
    alpha = int(13 * (1 - paso / 60) ** 2.0)
    dh.ellipse([LUNA_X - r, LUNA_Y - r, LUNA_X + r, LUNA_Y + r],
               fill=(226, 232, 255, alpha))
dh.ellipse([LUNA_X - LUNA_R, LUNA_Y - LUNA_R, LUNA_X + LUNA_R, LUNA_Y + LUNA_R],
           fill=(253, 253, 244, 255))
img = Image.alpha_composite(img, halo).convert("RGB")
d = ImageDraw.Draw(img)

nombre = ImageFont.truetype(NEGRITA, 82)
rol = ImageFont.truetype(NORMAL, 40)
stack = ImageFont.truetype(NEGRITA, 27)
url = ImageFont.truetype(NORMAL, 25)

X = 90
d.text((X, 228), "Mar Agramonte", font=nombre, fill=BLANCO)
d.text((X, 328), "Desarrolladora Backend Junior · Graduada en DAM",
       font=rol, fill=SUBTITULO)
d.rectangle([X, 386, X + 103, 390], fill=(61, 111, 212))

# El separador lleva espacios anchos a cada lado, como en el original.
d.text((X, 420), "JAVA  ·  PYTHON  ·  SQL  ·  DOCKER", font=stack, fill=AZUL)
d.text((X, 558), "maragramonte.github.io/mi-portfolio", font=url, fill=APAGADO)

salida = "public/og.png"
img.save(salida, "PNG", optimize=True)
print("guardado:", salida, img.size)
