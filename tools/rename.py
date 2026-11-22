"""One-off rename: Recognition Opportunities Portal -> Awards and Recognition Hub (release 18).
Storage keys (rop:*), JSON-LD prefix (rop:) and calendar UIDs are stable identifiers and are not changed."""
import glob, json, re
REPL = [
    ("Recognition Opportunities Portal", "Awards and Recognition Hub"),
    ("Recognition Opportunities portal", "Awards and Recognition Hub"),
    ("Recognition_Opportunities_Master_Calendar", "Awards_and_Recognition_Hub_Master_Calendar"),
    ("recognition-opportunities-logo", "awards-and-recognition-hub-logo"),
    ("recognition-opportunities-deck", "awards-and-recognition-hub-deck"),
    ("recognition-opportunities-portal", "awards-and-recognition-hub"),
    ("Recognition Opportunities", "Awards and Recognition Hub"),
    # generic references to the product
    ("the whole portal", "the whole Hub"), ("The portal", "The Hub"), ("the portal", "the Hub"),
    ("This portal", "This Hub"), ("this portal", "this Hub"), ("Portal sections", "Hub sections"),
    ("in portal content", "in Hub content"), ("only portal content", "only Hub content"),
    ("portal self-check", "Hub self-check"), ("Portal self-check", "Hub self-check"),
]
files = glob.glob("src/app/*.js") + ["src/content.js", "src/shell.html", "data/portal-data.json"]
tot = 0
for f in files:
    s = open(f, encoding="utf8").read(); o = s
    for a, b in REPL:
        tot += s.count(a); s = s.replace(a, b)
    s = s.replace("an Awards and Recognition Hub", "the Awards and Recognition Hub").replace("a Awards and Recognition Hub", "the Awards and Recognition Hub")
    s = s.replace("the the Hub", "the Hub").replace("The the Hub", "The Hub")
    if s != o: open(f, "w", encoding="utf8").write(s)
print("replacements:", tot)
