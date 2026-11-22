"""Weekly: the next three weeks of deadlines and ceremonies, as Markdown for an issue comment."""
import datetime as dt, json, os
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
d = json.load(open(os.path.join(ROOT, "data/portal-data.json"), encoding="utf8"))
today = dt.date.fromisoformat(os.environ.get("TODAY") or dt.date.today().isoformat())
end = today + dt.timedelta(days=21)
ev = sorted((e for e in d["events"] if e["type"] in ("DEADLINE", "CEREMONY", "MILESTONE") and today.isoformat() <= e["start"] <= end.isoformat()), key=lambda e: e["start"])
lines = ["## Next three weeks (%s to %s)" % (today, end), ""]
lines += ["- **%s** %s%s: [source](%s)" % (e["start"], e["summary"].split("] ")[-1], " (tentative)" if e["status"] == "TENTATIVE" else "", e["url"]) for e in ev] or ["Nothing due."]
lines += ["", "Always check the organiser's page before you rely on a date. Calendar: " + d["meta"]["github"]["pages"] + "#calendar-export"]
out = "\n".join(lines) + "\n"
open(os.environ.get("REPORT", "digest.md"), "w").write(out); print(out)
