// Node tools only. The page's scripts are linted as assembled (tools/lint_bundle.mjs), because the
// app parts share one scope and cannot be judged file by file.
import js from "@eslint/js";
import globals from "globals";
export default [
  js.configs.recommended,
  { files: ["tools/*.mjs"], languageOptions: { ecmaVersion: 2022, sourceType: "module", globals: globals.node } }
];
