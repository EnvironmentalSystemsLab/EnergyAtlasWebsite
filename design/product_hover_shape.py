"""Render the fixed, filled sketch-paper mask for Product hover backgrounds.

All geometry is authored here; no random values are used. Edit this source,
then run `python design/product_hover_shape.py`, never edit the output SVG.
"""
from pathlib import Path

OUTLINE = """M5 5
C21 3 43 6 62 4 L64 5 C87 3 105 5 123 4 L125 3
C149 5 171 2 195 5 L198 4 L234 5 L236 8
C234 35 238 51 235 76 L237 78 C235 100 238 120 236 145
L237 148 L235 192 L231 195 C207 193 186 197 162 194
L159 196 C132 194 108 197 84 195 L81 194
C54 196 28 193 7 196 L4 191 C6 166 2 142 5 119
L3 116 C5 88 2 62 4 38 L3 35 Z"""

if __name__ == "__main__":
    output = Path(__file__).resolve().parents[1] / "src/assets/shapes/product-wash.svg"
    output.parent.mkdir(parents=True, exist_ok=True)
    svg = ('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 200" '
           'width="240" height="200" preserveAspectRatio="none">\n'
           f'  <path fill="#ffffff" d="{" ".join(OUTLINE.split())}"/>\n</svg>\n')
    output.write_text(svg, encoding="utf-8", newline="\n")
    print(output)
