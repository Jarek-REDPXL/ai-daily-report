#!/usr/bin/env python3
"""Small (<=2000px) screenshots so they're viewable inline."""
import os
from playwright.sync_api import sync_playwright
BASE = "http://localhost:8099/index.html"
os.makedirs("shots", exist_ok=True)
shots = [
    ("sm_weekly_light", "#2026-05-30-weekly", "light", 1180, 1500),
    ("sm_weekly_dark",  "#2026-05-30-weekly", "dark",  1180, 1500),
    ("sm_daily_light",  "#2026-05-29-daily",  "light", 1180, 1300),
    ("sm_mobile_light", "#2026-05-30-weekly", "light", 412, 1500),
]
with sync_playwright() as p:
    b = p.chromium.launch()
    for name, hsh, theme, w, h in shots:
        ctx = b.new_context(viewport={"width": w, "height": h}, device_scale_factor=1)
        pg = ctx.new_page()
        pg.add_init_script(f"localStorage.setItem('aiedge-theme', {theme!r})")
        pg.goto(BASE + hsh, wait_until="networkidle")
        pg.evaluate("(t)=>document.documentElement.setAttribute('data-theme',t)", theme)
        pg.wait_for_timeout(450)
        pg.screenshot(path=f"shots/{name}.png")  # viewport only, scale 1 => width<=1180
        print("wrote", name)
        ctx.close()
    b.close()
