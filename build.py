#!/usr/bin/env python3
"""Build the Awards and Recognition Hub as one self-contained page.

Inputs (all public, de-identified):
  src/shell.html    markup and styles with placeholders
  src/content.js    static content (global C)
  src/app/*.js      app parts, concatenated in file-name order inside one IIFE
  data/portal-data.json   the single source of truth (D)
Output: _site/ (index.html, fonts, llms.txt, open data, metadata files)

Environment:
  CSP=0            leave the Content Security Policy out (sandboxed previews)
  NAME_SCAN_LIST   newline-separated identifiers that must never appear (held as a secret)
  REQUIRE_SCAN=1   fail if NAME_SCAN_LIST is missing (used by the Pages workflow)
"""
import base64, glob, hashlib, json, os, re, shutil, sys

ROOT = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.join(ROOT, "_site")


def read(p):
    with open(os.path.join(ROOT, p), encoding="utf8") as f:
        return f.read()


def assemble(build_scan=None):
    data = json.load(open(os.path.join(ROOT, "data/portal-data.json"), encoding="utf8"))
    if build_scan is not None:
        data["buildScan"] = build_scan
    dj = json.dumps(data, ensure_ascii=False).replace("</", "<\\/")
    parts = sorted(glob.glob(os.path.join(ROOT, "src/app/*.js")))
    app = "".join(open(p, encoding="utf8").read() for p in parts)
    content = read("src/content.js")
    shell = read("src/shell.html")
    for ph in ("__CSP__", "__DATA__", "__CONTENT__", "__APP__", "__CODES__", "__META__"):
        assert shell.count(ph) == 1, ph
    content_tag = "<script>" + content.rstrip("\n") + "\n</script>"
    app_js = "(function(){\n" + app + "})();\n"
    app_tag = "<script>" + app_js + "</script>"
    data_tag = '<script type="application/json" id="portal-data">' + dj + "</script>"
    sys.path.insert(0, os.path.join(ROOT, "tools"))
    import codes
    m = data["meta"]
    digest = hashlib.sha256(dj.encode("utf8")).hexdigest()[:16]
    qr_text = "%s | %s | %s | built %s | sha256:%s" % (m["title"], m["version"], m["edition"], m["build_date"], digest)
    bar_text = m["code_prefix"] + "-" + m["version"].lstrip("v")
    html = (shell.replace("__CODES__", codes.codes_block(qr_text, bar_text))
                 .replace("__META__", head_meta(data))
                 .replace("__DATA__", data_tag)
                 .replace("__CONTENT__", content_tag)
                 .replace("__APP__", app_tag))
    return html, data, [content + "", app_js]


def head_meta(data):
    """Self-describing metadata: artefact:* meta tags, Open Graph, canonical link and JSON-LD.
    Contact points are the contact form URL, never an email address."""
    import html as H
    m = data["meta"]; gh = m["github"]
    repo = "https://github.com/%s/%s" % (gh["owner"], gh["repo"])
    form = repo + "/issues/new?template=contact.yml"
    review = data.get("review_date", "2027-02-22")
    tags = [("artefact:id", "urn:awards-and-recognition-hub"), ("artefact:version", m["version"]),
            ("artefact:class", "portal"), ("artefact:as-of", m["source_verified"]), ("artefact:review-date", review),
            ("artefact:profile", "public sector / personal public-good work / UK-wide / central government"),
            ("artefact:grade", "G4"), ("artefact:licence", "OGL-UK-3.0 (content); MIT (code)")]
    out = ['<meta name="%s" content="%s">' % (k, H.escape(v, quote=True)) for k, v in tags]
    out.append('<link rel="canonical" href="%s">' % gh["pages"])
    out += ['<meta property="og:title" content="Awards and Recognition Hub">', '<meta property="og:type" content="website">',
            '<meta property="og:url" content="%s">' % gh["pages"],
            '<meta property="og:description" content="Verified award dates, fair ways to recognise people and teams, and tools to send recognition where people work.">']
    ld = {"@context": "https://schema.org", "@type": "WebApplication", "name": "Awards and Recognition Hub",
          "alternateName": "Recognition Opportunities Portal (former name)", "identifier": "urn:awards-and-recognition-hub",
          "version": m["version"], "dateModified": m["build_date"], "url": gh["pages"], "applicationCategory": "ReferenceApplication",
          "operatingSystem": "Any (web browser)", "inLanguage": "en-GB", "isAccessibleForFree": True,
          "license": "https://www.nationalarchives.gov.uk/doc/open-government-licence/version/3/", "codeRepository": repo,
          "author": {"@type": "Person", "name": "Service owner", "url": "https://github.com/" + gh["owner"]},
          "contactPoint": {"@type": "ContactPoint", "contactType": "feedback", "url": form},
          "description": "Verified award dates, fair ways to recognise people and teams, and tools to send recognition where people work. Not an official GOV.UK service."}
    out.append('<script type="application/ld+json">%s</script>' % json.dumps(ld, ensure_ascii=False).replace("</", "<\\/"))
    return "\n".join(out)


def llms_txt(data):
    """A plain description for AI agents (llmstxt.org convention), generated from the data."""
    m = data["meta"]; gh = m["github"]
    up = sorted((e for e in data["events"] if e["type"] in ("DEADLINE", "CEREMONY") and e["start"] >= m["build_date"]), key=lambda e: e["start"])
    lines = ["# Awards and Recognition Hub", "",
             "> Verified award dates, fair ways to recognise people and teams, and tools to send recognition where people work. "
             "Formerly the Recognition Opportunities Portal. Not an official GOV.UK service; organisers own their dates and rules.", "",
             "Release %s, sources verified %s. Content OGL v3.0, code MIT. No AI model runs on the page; the Ask feature searches the page and can hand a prompt to your own assistant." % (m["version"], m["source_verified"]), "",
             "## Data", "", "- [Portal data (JSON, the single source of truth)](%sportal-data.json)" % gh["pages"],
             "- [Source code, issues and roadmap](https://github.com/%s/%s)" % (gh["owner"], gh["repo"]), "",
             "## Upcoming deadlines and ceremonies", ""]
    for e in up:
        tent = " (tentative)" if e.get("status") == "TENTATIVE" else ""
        lines.append("- %s %s%s: %s (source: %s)" % (e["start"], e["type"].lower(), tent, e["summary"].split("] ")[-1], e["url"]))
    lines += ["", "## Sources", ""]
    for r in data["registry"]:
        lines.append("- %s: %s (%s, last checked %s)" % (r[0], r[1], r[2], r[4]))
    lines += ["", "## Rules for agents", "", "- Always cite the organiser's page; dates marked TBC or WATCH are not deadlines.",
              "- Never submit a nomination on someone's behalf; the Hub drafts, people send.", "- Contact is by the repository's contact form only."]
    return "\n".join(lines) + "\n"


def csp_meta(html):
    hashes = []
    for m in re.finditer(r"<script>(.*?)</script>", html, re.S):
        h = base64.b64encode(hashlib.sha256(m.group(1).encode("utf8")).digest()).decode()
        hashes.append("'sha256-%s'" % h)
    pol = ("default-src 'none'; script-src %s; style-src 'self' 'unsafe-inline'; font-src 'self'; "
           "img-src 'self' data: blob:; connect-src 'self'; manifest-src 'self'; base-uri 'none'; "
           "form-action 'self'; object-src 'none'") % " ".join(hashes)
    return '<meta http-equiv="Content-Security-Policy" content="%s">' % pol


def scan(text):
    """Return the number of listed identifiers found, or -1 when no list was supplied.
    Plain lines match anywhere; lines starting "w:" match as whole words."""
    lst = os.environ.get("NAME_SCAN_LIST", "")
    if not lst and os.environ.get("NAME_SCAN_FILE"):
        lst = open(os.environ["NAME_SCAN_FILE"], encoding="utf8").read()
    names = [n.strip() for n in lst.splitlines() if n.strip()]
    if not names:
        if os.environ.get("REQUIRE_SCAN") == "1":
            print("FAIL: NAME_SCAN_LIST not set; refusing to publish", file=sys.stderr)
            sys.exit(3)
        print("note: identifier scan skipped (NAME_SCAN_LIST not set); the page will report K20 as not run")
        return -1
    low = text.lower()
    hits = 0
    for n in names:
        if n.startswith("w:"):
            hits += bool(re.search(r"\b" + re.escape(n[2:].lower()) + r"\b", low))
        else:
            hits += n.lower() in low
    print("identifier scan: %d hit(s) against %d entries" % (hits, len(names)))
    if hits:
        print("FAIL: listed identifiers found in the build (not printed)", file=sys.stderr)
        sys.exit(4)
    return hits


def main():
    # First pass: scan everything that will be published, then record the result in the data.
    html, data, _ = assemble(build_scan=None)
    result = scan(html)
    html, data, _ = assemble(build_scan=result)
    csp = "" if os.environ.get("CSP") == "0" else csp_meta(html.replace("__CSP__", ""))
    html = html.replace("__CSP__", csp)
    if os.path.isdir(OUT):
        shutil.rmtree(OUT)
    os.makedirs(OUT)
    open(os.path.join(OUT, "index.html"), "w", encoding="utf8").write(html)
    open(os.path.join(OUT, "404.html"), "w", encoding="utf8").write(html)
    shutil.copytree(os.path.join(ROOT, "fonts"), os.path.join(OUT, "fonts"))
    for f in glob.glob(os.path.join(ROOT, "public/*")):
        shutil.copy(f, OUT)
    json.dump(data, open(os.path.join(OUT, "portal-data.json"), "w", encoding="utf8"), ensure_ascii=False, indent=1)
    open(os.path.join(OUT, ".nojekyll"), "w").close()
    open(os.path.join(OUT, "llms.txt"), "w", encoding="utf8").write(llms_txt(data))
    print("built _site/index.html: %d bytes, %s" % (len(html.encode()), data["meta"]["version"]))


if __name__ == "__main__":
    main()
