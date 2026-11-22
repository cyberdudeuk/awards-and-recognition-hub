"""No horizontal overflow on any page from 320 to 1920 px, light and dark."""
import os, sys
sys.path.insert(0, os.path.dirname(__file__))
from playwright.sync_api import sync_playwright
from _harness import serve, go, routes, settle

WIDTHS = [320, 390, 853, 1280, 1920]
bad = []
with serve() as url, sync_playwright() as p:
    b = p.chromium.launch()
    for scheme in ("light", "dark"):
        for w in WIDTHS:
            pg = b.new_page(viewport={"width": w, "height": 900}, color_scheme=scheme)
            pg.goto(url); pg.wait_for_function("window.__ROP"); settle(pg)
            for s, t in routes(pg):
                go(pg, url, "#%s-%s" % (s, t))
                ov = pg.evaluate("document.documentElement.scrollWidth - document.documentElement.clientWidth")
                if ov > 1: bad.append("%s %dpx %s-%s overflows by %dpx" % (scheme, w, s, t, ov))
            pg.close()
    b.close()
print("widths: %d widths x 2 schemes, %d problems" % (len(WIDTHS), len(bad)))
for x in bad[:40]: print("  -", x)
sys.exit(1 if bad else 0)
