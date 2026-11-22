"""Daily: list sources past their re-verification cadence (same rule as self-check K23)."""
import datetime as dt, json, os, sys
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
d = json.load(open(os.path.join(ROOT, "data/portal-data.json"), encoding="utf8"))
today = dt.date.fromisoformat(os.environ.get("TODAY") or dt.date.today().isoformat())
over = []
for r in d["registry"]:
    due = dt.date.fromisoformat(r[4]) + dt.timedelta(days=r[5])
    if due < today: over.append("- **%s** (%s): last verified %s, due %s. Re-read %s" % (r[0], r[1], r[4], due, r[2]))
out = "## Sources due for re-verification\n\n" + ("\n".join(over) if over else "None. Every source is within its cadence.") + "\n"
open(os.environ.get("REPORT", "staleness-report.md"), "w").write(out)
print(out); sys.exit(1 if over else 0)
