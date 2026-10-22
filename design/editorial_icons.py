"""EnergyAtlas products and features: seeded editorial icon source.

Render with the editorial-icons skill's scripts/ink_icons.py.
Edit these definitions, never the rendered SVG assets.
"""

import math

from ink_icons import Pen, arc_points

TITLE = "EnergyAtlas products and features"
INK = "#18202c"
ACCENT = "#125dae"
WEIGHTS = {"regular": 1.3, "bold": 1.85}


def api(pen: Pen) -> None:
    """Open code brackets, with a single blue slash."""
    pen.stroke([(8.0, 6.5), (4.0, 12.0), (8.0, 17.5)], taper=(0.8, 0.7))
    pen.stroke([(16.0, 6.5), (20.0, 12.0), (16.0, 17.5)], taper=(0.7, 0.8))
    pen.stroke([(13.8, 4.8), (12.0, 12.0), (10.2, 19.2)], accent=True)


def mcp(pen: Pen) -> None:
    """A tool connector, its cable leading to one active endpoint."""
    pen.stroke(pen.rounded_rect(6.5, 8.5, 17.5, 14.5, 1.4), closed=True, overshoot=0.85)
    pen.stroke([(9, 8), (9, 4)], taper=(0.8, 0.65))
    pen.stroke([(15, 8), (15, 4)], taper=(0.8, 0.65))
    pen.stroke([(12, 15), (12, 18.5), (15, 20), (17.5, 19)], weight=0.9)
    pen.dot(19.5, 18.0, 1.4, accent=True)


def agent(pen: Pen) -> None:
    """An open infinity cycle; the blue head points down toward its loose tail."""
    start, end = 0.26, 2 * math.pi - 0.11
    points = [(12 + 8 * math.cos(t), 12 + 4.8 * math.sin(2 * t))
              for t in [start + (end - start) * i / 64 for i in range(65)]]
    pen.stroke(points, taper=(0.65, 0.8))
    pen.stroke([(17.8, 9.0), (20.05, 11.6), (21.1, 8.5)],
               weight=0.95, taper=(0.75, 0.7), spline=False, accent=True)


def wiki(pen: Pen) -> None:
    """An open book, one blue bookmark tucked into the right page."""
    pen.stroke([(12, 6), (8.5, 4.6), (3.8, 5.3), (3.8, 18.3), (8, 17.8), (12, 19.4)], spline=False)
    pen.stroke([(12, 6), (16, 4.6), (20.2, 5.3), (20.2, 18.3), (16.3, 17.8), (12, 19.4)], spline=False)
    pen.stroke([(12, 6.6), (12, 12), (12, 19.2)], weight=0.8)
    pen.blob([(15.1, 5.6), (17.8, 5.4), (17.7, 11.6), (16.3, 10.5), (15.1, 11.8)], accent=True)


def digital_twin_previous(pen: Pen) -> None:
    """Two city-model blocks linked by an agent's curved connection."""
    pen.stroke(pen.rounded_rect(4.5, 11, 10, 20, 0.5), closed=True, overshoot=0.8)
    pen.stroke(pen.rounded_rect(13.5, 7.8, 19.5, 20, 0.5), closed=True, overshoot=0.8)
    pen.stroke([(5, 7.9), (7.2, 4.8), (11, 3.8), (14.4, 4.5)], weight=0.85)
    pen.dot(17.5, 4.8, 1.4, accent=True)


def digital_twin(pen: Pen) -> None:
    """Candidate B: a city model inside an open reasoning/feedback loop."""
    for x0, top, x1 in [(4.6, 12.2, 8.0), (10.0, 7.8, 13.5), (15.6, 11.0, 19.0)]:
        pen.stroke([(x0, 19.8), (x0, top), (x1, top), (x1, 19.8)],
                   weight=0.85, spline=False)
    pen.stroke([(3.5, 20), (11.5, 20), (20.0, 20)], weight=0.8)
    pen.stroke([(3.5, 8.7), (5.5, 4.8), (11.4, 3.3), (17.8, 5.1),
                (21.1, 9.5), (21.1, 12.7)], weight=0.8)
    pen.stroke([(19.4, 11.7), (21.0, 14.4), (22.2, 11.5)],
               weight=0.9, taper=(0.7, 0.7), spline=False, accent=True)


def energy_insights(pen: Pen) -> None:
    """A demand curve climbing across a city-scale chart."""
    pen.stroke([(4, 4.8), (4, 19.5), (20, 19.5)], spline=False)
    pen.stroke([(7, 15.5), (10.1, 12.4), (13, 14), (17.3, 8.3)], weight=1.0)
    pen.stroke([(8, 19), (8, 17)], weight=0.7)
    pen.stroke([(14, 19), (14, 17)], weight=0.7)
    pen.dot(19.2, 5.5, 1.6, accent=True)


def distributed_energy(pen: Pen) -> None:
    """Three resource nodes coordinated around one blue energy bolt."""
    for x, y in [(5.4, 6.3), (18.6, 6.3), (12, 19.0)]:
        pen.stroke(arc_points(x, y, 2.1, 205, 551), weight=0.85)
    pen.stroke([(6.6, 9.1), (9.0, 13.0), (9.7, 15.7)], weight=0.8)
    pen.stroke([(17.4, 9.1), (15, 13.1), (14.3, 15.7)], weight=0.8)
    pen.blob([(12.5, 6.6), (9.7, 11.7), (12, 11.5), (11.3, 15.6), (14.7, 10.0), (12.6, 10.4)], accent=True)


def profile(pen: Pen) -> None:
    """An open shoulder silhouette and head, with one blue collar mark."""
    pen.stroke(arc_points(12, 7.5, 3.7, 0, 360), closed=True, overshoot=0.8)
    pen.stroke([(3.6, 20.5), (4.6, 17.2), (8, 14.5), (12, 13.8),
                (16, 14.5), (19.4, 17.2), (20.4, 20.5)], taper=(0.65, 0.65))
    pen.stroke([(10.1, 16.5), (12, 18.1), (13.9, 16.5)],
               weight=0.85, taper=(0.7, 0.7), accent=True)


ICONS = {
    "mcp": (mcp, 53),
    "agent": (agent, 73),
    "api": (api, 31),
    "wiki": (wiki, 91),
    "digital-twin": (digital_twin, 113),
    "energy-insights": (energy_insights, 137),
    "distributed-energy": (distributed_energy, 157),
    "profile": (profile, 179),
}
