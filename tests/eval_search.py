"""Search evaluation set: everyday questions must find the page that answers them in the top 3.
The old product name must still find the Hub."""
import os, sys
sys.path.insert(0, os.path.dirname(__file__))
from playwright.sync_api import sync_playwright
from _harness import serve, settle

CASES = [
    ("reminders", "calendar-alerts"), ("deadlines", "calendar-agenda"), ("clear my data", "help-privacy"),
    ("how do I nominate", "workflows-nominate"), ("report a problem", "help-guide"), ("glossary", "help-glossary"),
    ("which award", "routes-finder"), ("bonus", "recognition-pay"), ("easy read", "help-easyread"),
    ("accessibility statement", "help-a11y"), ("dpia", "build-dpia"), ("atrs", "build-standards"),
    ("brand colours", "connect-brand"), ("recognition opportunities portal", "overview-front"),
]
fails = []
with serve() as url, sync_playwright() as p:
    b = p.chromium.launch(); pg = b.new_page(); pg.goto(url); pg.wait_for_function("window.__ROP"); settle(pg)
    for q, want in CASES:
        hits = pg.evaluate("q => window.__ROP.search(q, 3)", q)
        pages = [(h["page"] or "").lstrip("#") for h in hits]
        if not any(want == x or (x or "").startswith(want) for x in pages): fails.append("%r -> %s (wanted %s)" % (q, pages, want))
    b.close()
print("search eval: %d cases, %d misses" % (len(CASES), len(fails)))
for f in fails: print("  -", f)
sys.exit(1 if fails else 0)
