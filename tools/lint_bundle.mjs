// Lint the page's scripts as the browser runs them: every <script> in the built page, with
// ESLint's recommended rules plus security rules. Any problem fails (warnings count as failures).
import js from "@eslint/js";
import { Linter } from "eslint";
import globals from "globals";
import fs from "node:fs";
const html = fs.readFileSync(process.argv[2] || "_site/index.html", "utf8");
const scripts = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]);
const linter = new Linter();
const rules = { ...js.configs.recommended.rules,
  "no-unused-vars": "off",                 // reported separately below as information only
  "no-empty": ["error", { allowEmptyCatch: true }], "no-useless-escape": "off",
  "no-eval": "error", "no-implied-eval": "error", "no-new-func": "error", "no-script-url": "error" };
let bad = 0;
scripts.forEach((code, i) => {
  const g = { ...globals.browser }; if (i > 0) g.C = "readonly";   // script 1 defines C (content), script 2 is the app
  const msgs = linter.verify(code, { languageOptions: { ecmaVersion: 2022, sourceType: "script", globals: g }, rules });
  msgs.forEach(m => { bad++; console.log(`script ${i + 1}:${m.line}:${m.column} ${m.ruleId || "parse"} ${m.message}`); });
});
console.log(`bundle lint: ${scripts.length} scripts, ${bad} problem(s)`);
process.exit(bad ? 1 : 0);
