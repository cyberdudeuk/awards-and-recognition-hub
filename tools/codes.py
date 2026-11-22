"""Release identifier codes: a QR code and a Code 128 (set B) barcode, as inline SVG.
Both encode text derived from the data, so they change with every release."""
import html

# Code 128 bar patterns (widths of bar, space, bar, space, bar, space), values 0..106
_P = ("212222 222122 222221 121223 121322 131222 122213 122312 132212 221213 221312 231212 112232 122132 "
      "122231 113222 123122 123221 223211 221132 221231 213212 223112 312131 311222 321122 321221 312212 "
      "322112 322211 212123 212321 232121 111323 131123 131321 112313 132113 132311 211313 231113 231311 "
      "112133 112331 132131 113123 113321 133121 313121 211331 231131 213113 213311 213131 311123 311321 "
      "331121 312113 312311 332111 314111 221411 431111 111224 111422 121124 121421 141122 141221 112214 "
      "112412 122114 122411 142112 142211 241211 221114 413111 241112 134111 111242 121142 121241 114212 "
      "124112 124211 411212 421112 421211 212141 214121 412121 111143 111341 131141 114113 114311 411113 "
      "411311 113141 114131 311141 411131 211412 211214 211232 2331112").split()


def code128_svg(text, module=0.2, quiet=10, height=12):
    if not all(32 <= ord(c) < 127 for c in text):
        raise ValueError("Code 128 set B needs printable ASCII")
    vals = [104] + [ord(c) - 32 for c in text]
    chk = (vals[0] + sum(i * v for i, v in enumerate(vals[1:], 1))) % 103
    vals += [chk, 106]
    x = quiet * module
    rects = []
    for v in vals:
        for i, w in enumerate(_P[v]):
            w = int(w) * module
            if i % 2 == 0:
                rects.append('<rect x="%.3f" y="0" width="%.3f" height="%d"/>' % (x, w, height))
            x += w
    width = x + quiet * module
    label = html.escape("Barcode (Code 128): " + text, quote=True)
    return ('<svg viewBox="0 0 %.2f %d" width="220" height="56" preserveAspectRatio="none" role="img" '
            'aria-label="%s"><rect width="%.2f" height="%d" fill="#FFFFFF"/><g fill="#000000">%s</g></svg>') % (width, height, label, width, height, "".join(rects))


def qr_svg(text):
    import segno
    q = segno.make(text, error="m", micro=False)
    m = q.matrix
    n = len(m)
    d = "".join("M%d %dh1v1h-1z" % (c + 1, r + 1) for r, row in enumerate(m) for c, v in enumerate(row) if v)
    label = html.escape("QR code: " + text, quote=True)
    return ('<svg viewBox="0 0 %d %d" width="112" height="112" role="img" aria-label="%s" '
            'shape-rendering="crispEdges"><rect width="%d" height="%d" fill="#FFFFFF"/><path d="%s" fill="#000000"/></svg>') % (n + 2, n + 2, label, n + 2, n + 2, d)


def codes_block(qr_text, bar_text):
    return ('<div class="codes"><figure>%s<figcaption>Release identifier</figcaption></figure>'
            '<figure>%s<figcaption>%s</figcaption></figure></div>') % (qr_svg(qr_text), code128_svg(bar_text), html.escape(bar_text))


if __name__ == "__main__":
    import sys
    print(codes_block(sys.argv[1], sys.argv[2]))
