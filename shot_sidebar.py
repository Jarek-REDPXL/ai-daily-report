#!/usr/bin/env python3
import os
from playwright.sync_api import sync_playwright
BASE = "http://localhost:8099/index.html"
os.makedirs("shots", exist_ok=True)
with sync_playwright() as p:
    b = p.chromium.launch()
    # tall narrow viewport to show the whole archive sidebar
    ctx = b.new_context(viewport={"width": 1240, "height": 1850}, device_scale_factor=1)
    pg = ctx.new_page()
    pg.goto(BASE + "#2026-05-30-daily", wait_until="networkidle")
    pg.wait_for_timeout(500)
    pg.screenshot(path="shots/sb_may30_daily.png")
    print("wrote sb_may30_daily")
    ctx.close()
    b.close()
