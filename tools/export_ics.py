"""Export the master and split calendars with the page's own ICS writer (so release files match the page)."""
import os, sys
sys.path.insert(0, os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "tests"))
from playwright.sync_api import sync_playwright
from _harness import serve, settle
out = sys.argv[1] if len(sys.argv) > 1 else "calendar-pack"
os.makedirs(out, exist_ok=True)
with serve() as url, sync_playwright() as p:
    b = p.chromium.launch(); pg = b.new_page(); pg.goto(url); pg.wait_for_function("window.__ROP"); settle(pg)
    files = pg.evaluate("""() => { const R = window.__ROP, D = R.D, ev = D.events.filter(e => e.origin !== 'candidate');
      const out = {'Awards_and_Recognition_Hub_Master_Calendar.ics': R.buildICS(ev, D.meta.calname)};
      Object.entries(D.split).forEach(([f, s]) => { out[f] = R.buildICS(ev.filter(e => s.uids.includes(e.uid)), s.name); }); return out; }""")
    b.close()
for f, t in files.items():
    open(os.path.join(out, f), "w", encoding="utf8", newline="").write(t)
print("wrote %d calendars to %s" % (len(files), out))
