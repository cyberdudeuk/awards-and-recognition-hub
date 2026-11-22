"""Every page renders with no console error, no horizontal overflow and no failing self-check.
Also runs the in-page negatives: every self-check must catch its deliberate break."""
import json, os, sys
sys.path.insert(0, os.path.dirname(__file__))
from playwright.sync_api import sync_playwright
from _harness import serve, go, routes, settle

ALLOW = {"K20"} if os.environ.get("ALLOW_UNSCANNED") == "1" else set()


def main(width=1280, scheme="light"):
    bad = []
    with serve() as url, sync_playwright() as p:
        b = p.chromium.launch()
        pg = b.new_page(viewport={"width": width, "height": 900}, color_scheme=scheme)
        errs = []
        pg.on("console", lambda m: errs.append(m.text) if m.type == "error" else None)
        pg.on("pageerror", lambda e: errs.append(str(e)))
        pg.goto(url); pg.wait_for_function("window.__ROP"); settle(pg)
        pg.evaluate("()=>{const d=document.querySelector('#splash'); if(d&&d.close) try{d.close()}catch(e){}}")
        neg = pg.evaluate("window.__ROP.runNegatives()")
        missed = [n["id"] for n in neg if not n["caught"]]
        if missed: bad.append("negatives not caught: %s" % missed)
        # D47: buttons placed on gradients must carry their own solid background with AA contrast
        go(pg, url, "#overview-front")
        low = pg.evaluate("""() => { const L = c => { const m = c.match(/[\\d.]+/g).map(Number); const a = m[3] === undefined ? 1 : m[3];
              const f = v => { v /= 255; return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); };
              return [0.2126 * f(m[0]) + 0.7152 * f(m[1]) + 0.0722 * f(m[2]), a]; };
            return [...document.querySelectorAll('.fhero .btn')].map(b => { const cs = getComputedStyle(b); const [fg] = L(cs.color), [bg, alpha] = L(cs.backgroundColor);
              const r = (Math.max(fg, bg) + 0.05) / (Math.min(fg, bg) + 0.05); return alpha < 1 || r < 4.5 ? b.textContent.trim() + ' ' + r.toFixed(2) + (alpha < 1 ? ' (see-through background)' : '') : null; }).filter(Boolean); }""")
        if low: bad.append("hero buttons below AA on a gradient: %s" % low)
        rs = routes(pg)
        for s, t in rs:
            go(pg, url, "#%s-%s" % (s, t))
            info = pg.evaluate("""() => ({ov: document.documentElement.scrollWidth - document.documentElement.clientWidth,
                fails: window.__ROP.CHECKS().filter(c => !c.ok && c.sev==='fail').map(c => c.id + ': ' + c.detail.slice(0,120))})""")
            loose = pg.evaluate("""() => [...document.querySelectorAll('#panel .note.hasico')].filter(n => [...n.childNodes].filter(c => (c.nodeType === 3 && c.textContent.trim()) || (c.nodeType === 1 && !c.classList.contains('noteico') && getComputedStyle(c).display.startsWith('inline'))).length > 1).length""")
            if loose: bad.append("%s-%s: %d note(s) split into one line per link (D50)" % (s, t, loose))
            if info["ov"] > 1: bad.append("%s-%s overflows by %dpx" % (s, t, info["ov"]))
            f = [x for x in info["fails"] if x.split(":")[0] not in ALLOW]
            if f: bad.append("%s-%s self-check: %s" % (s, t, f))
            if errs: bad.append("%s-%s console: %s" % (s, t, errs[:3])); errs.clear()
        print("smoke %dpx %s: %d pages, %d negatives (%d caught), %d problems" % (width, scheme, len(rs), len(neg), len(neg) - len(missed), len(bad)))
        b.close()
    for x in bad[:60]: print("  -", x)
    return not bad


if __name__ == "__main__":
    w = int(sys.argv[1]) if len(sys.argv) > 1 else 1280
    sc = sys.argv[2] if len(sys.argv) > 2 else "light"
    sys.exit(0 if main(w, sc) else 1)
