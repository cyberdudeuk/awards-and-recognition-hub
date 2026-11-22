"""Unit tests for build-time tools (no browser)."""
import os, sys, unittest
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
sys.path.insert(0, os.path.join(ROOT, "tools")); sys.path.insert(0, ROOT)
import codes, policy_scan, build


class Codes(unittest.TestCase):
    def test_barcode_checksum_and_label(self):
        s = codes.code128_svg("ARH-2026.11.22.18")
        self.assertIn('aria-label="Barcode (Code 128): ARH-2026.11.22.18"', s)
        self.assertEqual(s.count("<rect"), 1 + 3 * (len("ARH-2026.11.22.18") + 3) + 1)  # background + 3 bars per symbol, stop has 4

    def test_barcode_rejects_non_ascii(self):
        with self.assertRaises(ValueError): codes.code128_svg("ARH–1")

    def test_qr_label_escaped(self):
        self.assertIn("&lt;x&gt;", codes.qr_svg("<x>"))


class Policy(unittest.TestCase):
    def test_selftest(self): self.assertTrue(policy_scan.selftest())

    def test_uid_not_an_address(self):
        self.assertEqual(policy_scan.check_text("a", "UID:csa-deadline-2026@recognition-portfolio.gov.uk"), [])


class Build(unittest.TestCase):
    def test_scan_word_boundary(self):
        os.environ["NAME_SCAN_LIST"] = "w:qzxwordv\nTesty Fixtureson"
        try:
            self.assertEqual(build.scan("aqzxwordvb only"), 0)
            with self.assertRaises(SystemExit): build.scan("met Testy Fixtureson")
            with self.assertRaises(SystemExit): build.scan("mr qzxwordv")
        finally:
            del os.environ["NAME_SCAN_LIST"]

    def test_scan_not_run(self):
        os.environ.pop("NAME_SCAN_LIST", None); os.environ.pop("NAME_SCAN_FILE", None)
        self.assertEqual(build.scan("anything"), -1)

    def test_meta_has_no_email(self):
        import json
        d = json.load(open(os.path.join(ROOT, "data/portal-data.json"), encoding="utf8"))
        self.assertEqual(policy_scan.check_text("meta", build.head_meta(d)), [])


if __name__ == "__main__":
    unittest.main(verbosity=1)
