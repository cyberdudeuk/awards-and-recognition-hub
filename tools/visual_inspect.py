"""Repeatable visual inspection: screenshot every page at 1280, 853 and 390 px in light and dark,
plus automated aids (overflow, console errors, text clipped by its box). Screenshots support looking; they do not replace it.
Usage: python tools/visual_inspect.py [outdir] [page-filter]"""
import json, os, sys
sys.path.insert(0, os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "tests"))
from playwright.sync_api import sync_playwright
from _harness import serve, go, routes, settle

out = sys.argv[1] if len(sys.argv) > 1 else "inspect"
flt = sys.argv[2] if len(sys.argv) > 2 else ""
os.makedirs(out, exist_ok=True)
AIDS = """() => { const vw = document.documentElement.clientWidth; const clipped = [...document.querySelectorAll('#panel h1,#panel h2,#panel h3,#panel p,#panel td,#panel .btn,#panel strong')]
  .filter(e => e.offsetParent && !e.closest('.sr') && getComputedStyle(e).overflow === 'hidden' && e.scrollWidth > e.clientWidth + 1).length;
  const squeezed = [...document.querySelectorAll('#panel .card > :nth-child(2)')].filter(e => e.offsetParent && e.getBoundingClientRect().width < 120 && (e.textContent||'').trim().length > 20).length;
  return {overflow: document.documentElement.scrollWidth - vw, clipped, squeezed}; }"""
report = []
with serve() as url, sync_playwright() as p:
    b = p.chromium.launch()
    for scheme in ("light", "dark"):
        for w in (1280, 853, 390):
            ctx = b.new_context(viewport={"width": w, "height": 900}, color_scheme=scheme, reduced_motion="reduce")
            pg = ctx.new_page(); errs = []
            pg.on("pageerror", lambda e: errs.append(str(e)))
            pg.goto(url); pg.wait_for_function("window.__ROP"); settle(pg)
            pg.evaluate("()=>{const d=document.querySelector('#splash'); if(d) d.remove();}")
            for s, t in routes(pg):
                if flt and flt not in "%s-%s" % (s, t): continue
                go(pg, url, "#%s-%s" % (s, t))
                a = pg.evaluate(AIDS); a.update(page="%s-%s" % (s, t), width=w, scheme=scheme, errors=errs[:]); errs.clear()
                pg.screenshot(path=os.path.join(out, "%s-%s-%d-%s.png" % (s, t, w, scheme)), full_page=False)
                report.append(a)
            ctx.close()
    b.close()
json.dump(report, open(os.path.join(out, "aids.json"), "w"), indent=1)
issues = [r for r in report if r["overflow"] > 1 or r["clipped"] or r["squeezed"] or r["errors"]]
print("inspect: %d screenshots, %d with automated findings (see %s/aids.json)" % (len(report), len(issues), out))
