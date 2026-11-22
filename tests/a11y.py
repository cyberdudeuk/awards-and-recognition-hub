"""axe-core on every page (WCAG 2.2 A and AA rules), light and dark: no serious or critical issues."""
import os, sys
sys.path.insert(0, os.path.dirname(__file__))
from playwright.sync_api import sync_playwright
from _harness import serve, go, routes, settle

AXE = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "node_modules/axe-core/axe.min.js")
axe = open(AXE, encoding="utf8").read()
bad, views = [], 0
with serve() as url, sync_playwright() as p:
    b = p.chromium.launch()
    for scheme in ("light", "dark"):
        ctx = b.new_context(viewport={"width": 1280, "height": 900}, color_scheme=scheme, bypass_csp=True, reduced_motion="reduce")
        pg = ctx.new_page(); pg.goto(url); pg.wait_for_function("window.__ROP"); settle(pg)
        pg.evaluate("()=>{const d=document.querySelector('#splash'); if(d) d.remove();}")
        for s, t in routes(pg):
            go(pg, url, "#%s-%s" % (s, t))
            if not pg.evaluate("!!window.axe"): pg.add_script_tag(content=axe)
            res = pg.evaluate("""async () => { const r = await axe.run(document, {runOnly:{type:'tag', values:['wcag2a','wcag2aa','wcag21a','wcag21aa','wcag22aa']}});
                return r.violations.filter(v => ['serious','critical'].includes(v.impact)).map(v => v.id + ' (' + v.nodes.length + '): ' + v.nodes[0].target.join(' '));}""")
            views += 1
            for v in res: bad.append("%s %s-%s %s" % (scheme, s, t, v))
        ctx.close()
    b.close()
print("a11y: %d views, %d serious or critical issues" % (views, len(bad)))
for x in bad[:40]: print("  -", x)
sys.exit(1 if bad else 0)
