"""Shared helpers: serve _site on a local port and open pages in Chromium."""
import contextlib, functools, http.server, os, socketserver, threading

SITE = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "_site")


@contextlib.contextmanager
def serve():
    class Quiet(http.server.SimpleHTTPRequestHandler):
        def log_message(self, *a):
            pass
    handler = functools.partial(Quiet, directory=SITE)
    with socketserver.TCPServer(("127.0.0.1", 0), handler) as httpd:
        t = threading.Thread(target=httpd.serve_forever, daemon=True)
        t.start()
        try:
            yield "http://127.0.0.1:%d/index.html" % httpd.server_address[1]
        finally:
            httpd.shutdown()


def settle(pg, ms=150):
    pg.wait_for_function("""() => new Promise(r => { let t; const o = new MutationObserver(() => { clearTimeout(t); t = setTimeout(() => { o.disconnect(); r(true); }, %d); }); o.observe(document.body, {subtree:true, childList:true, attributes:true}); t = setTimeout(() => { o.disconnect(); r(true); }, %d); })""" % (ms, ms), timeout=15000)


def go(pg, base, h):
    pg.evaluate("h => { location.hash = h; }", h)
    settle(pg)


def routes(pg):
    return [(s["id"], t) for s in pg.evaluate("window.__ROP.sections()") for t in s["tabs"]]
