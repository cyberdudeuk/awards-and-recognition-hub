"""Repository policy scan (runs in CI on every change).
Fails if any file in the repository or the built site contains:
  - an email address (contact is by form only; reserved example domains are allowed in tests)
  - a retired organisation name or a team the owner has not approved for mention
  - a deck or film file (they are kept outside the repository)
Run with --selftest to prove each rule catches a deliberate break."""
import os, re, subprocess, sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
EMAIL = re.compile(r"[A-Za-z0-9._%+-]+@(?!(?:example\.(?:com|org|net)|test)\b)[A-Za-z0-9-]+(?:\.[A-Za-z0-9-]+)*\.[A-Za-z]{2,}")
UID = re.compile(r"@recognition-portfolio\.gov\.uk")       # calendar UIDs are identifiers, not addresses
COMMIT_TRAILER = re.compile(r"noreply@anthropic\.com")
BANNED = [re.compile(p, re.I) for p in (r"Office of the Chief Data Officer", r"\bOCDO\b", r"Data Management Team")]
INLINE_HANDLER = re.compile(r"<[a-z][^>]*\son(?:click|focus|blur|load|error|change|input|submit|mouseover|keydown|keyup)\s*=", re.I)
MEDIA = re.compile(r"\.(pptx|key|mp4|mov|webm)$|deck\.html$", re.I)
SKIP_DIRS = {".git", "node_modules", "__pycache__"}


def files():
    for base in (ROOT,):
        for d, ds, fs in os.walk(base):
            ds[:] = [x for x in ds if x not in SKIP_DIRS]
            for f in fs:
                yield os.path.join(d, f)


def check_text(name, text):
    out = []
    for m in EMAIL.finditer(UID.sub("", COMMIT_TRAILER.sub("", text))):
        out.append("%s: email address %s***" % (name, m.group(0)[:3]))
    if name.endswith((".html", ".js")) and INLINE_HANDLER.search(text):
        out.append("%s: inline event handler attribute (blocked by the CSP)" % name)
    for b in BANNED:
        if b.search(text) and not name.endswith("policy_scan.py"):
            out.append("%s: banned term /%s/" % (name, b.pattern))
    return out


def dup_keys(text):
    """Return keys that appear twice in one JSON object (a bad merge can leave both versions of a dependency)."""
    import json
    dups = []
    def hook(pairs):
        seen = set()
        for k, _ in pairs:
            if k in seen: dups.append(k)
            seen.add(k)
        return dict(pairs)
    try: json.loads(text, object_pairs_hook=hook)
    except ValueError as e: return ["(invalid JSON: %s)" % e]
    return dups


def scan():
    bad = []
    for p in files():
        rel = os.path.relpath(p, ROOT)
        if MEDIA.search(rel): bad.append("%s: deck or film file in the repository" % rel)
        if rel.endswith((".woff2", ".png", ".jpg", ".ico")): continue
        try: t = open(p, encoding="utf8").read()
        except (UnicodeDecodeError, OSError): continue
        bad += check_text(rel, t)
        if rel.endswith(".json") and not rel.startswith("_site"):
            bad += ["%s: duplicate JSON key %s" % (rel, k) for k in dup_keys(t)]
    return bad


def selftest():
    cases = {"handler": '<input onfocus="x()">', "email": "write to someone" + "@" + "department.gov.uk", "ocdo": "the OCDO team", "dmt": "the Data Management Team said"}
    missed = [k for k, v in cases.items() if not check_text("x.html", v)]
    allowed = check_text("x.html", "fixture a@example.org and uid csa-2026@recognition-portfolio.gov.uk")
    dup = dup_keys('{"devDependencies": {"eslint": "9.39.5", "eslint": "10.15.0"}}') == ["eslint"]
    ok = not missed and not allowed and MEDIA.search("slides/deck.pptx") and dup and dup_keys('{"a": 1}') == []
    print("policy scan selftest: %s" % ("all rules catch their break" if ok else "FAILED missed=%s allowed=%s duplicate-key=%s" % (missed, allowed, dup)))
    return ok


if __name__ == "__main__":
    if "--selftest" in sys.argv: sys.exit(0 if selftest() else 1)
    b = scan()
    print("policy scan: %d problem(s)" % len(b))
    for x in b: print("  -", x)
    sys.exit(1 if b else 0)
