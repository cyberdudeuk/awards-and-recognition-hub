"""Validate .github: every YAML file parses, every workflow pins third-party actions to a full commit SHA,
and every issue form named by the page exists."""
import glob, os, re, sys
import yaml  # PyYAML
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
bad = []
for f in glob.glob(os.path.join(ROOT, ".github/**/*.yml"), recursive=True):
    rel = os.path.relpath(f, ROOT)
    try: yaml.safe_load(open(f, encoding="utf8"))
    except yaml.YAMLError as e: bad.append("%s: invalid YAML (%s)" % (rel, str(e).splitlines()[0]))
    for u in re.findall(r"uses:\s*([^\s#]+)", open(f, encoding="utf8").read()):
        if u.startswith("./"): continue
        if not re.search(r"@[0-9a-f]{40}$", u): bad.append("%s: action not pinned to a commit SHA: %s" % (rel, u))
app = "".join(open(f, encoding="utf8").read() for f in glob.glob(os.path.join(ROOT, "src/app/*.js")))
for t in sorted(set(re.findall(r'"([a-z_]+\.yml)"', app))):
    if not (os.path.exists(os.path.join(ROOT, ".github/ISSUE_TEMPLATE", t)) or os.path.exists(os.path.join(ROOT, ".github/workflows", t)) or os.path.exists(os.path.join(ROOT, ".github", t))):
        bad.append("page names %s but the repository has no such file" % t)
print("github config: %d problem(s)" % len(bad))
for b in bad: print("  -", b)
sys.exit(1 if bad else 0)
