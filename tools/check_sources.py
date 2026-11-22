"""Weekly: is every organiser page in the source registry still reachable? Writes a Markdown report;
exits 1 if any page fails, so the workflow can open an issue. Reading the page is still a person's job."""
import json, os, sys, urllib.request
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
d = json.load(open(os.path.join(ROOT, "data/portal-data.json"), encoding="utf8"))
rows, bad = [], 0
for r in d["registry"]:
    code, url = r[0], r[2]
    try:
        req = urllib.request.Request(url, headers={"User-Agent": "awards-and-recognition-hub source check"})
        with urllib.request.urlopen(req, timeout=30) as resp: st = resp.status
    except Exception as e:  # noqa: BLE001 - every failure is reported
        st = getattr(e, "code", None) or type(e).__name__
    ok = st == 200
    bad += not ok
    rows.append("| %s | %s | %s |" % (code, url, "ok" if ok else "**%s**" % st))
out = "## Source reachability\n\n| Route | Page | Result |\n|---|---|---|\n" + "\n".join(rows) + "\n"
open(os.environ.get("REPORT", "source-report.md"), "w").write(out)
print(out); sys.exit(1 if bad else 0)
