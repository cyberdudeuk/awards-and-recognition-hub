# Security

Please report a vulnerability through GitHub's **private vulnerability reporting** (Security › Report a vulnerability). Do not use a public issue.

## Controls in place

- **Content Security Policy.** Hash-based: only the scripts that shipped can run, and no third-party hosts are allowed.
- **No secrets in code.** The private identifier list exists only as a CI secret.
- **Escaping.** Every rendered value is escaped, and the self-checks include injection tests.
- **Pinned dependencies:**
  - GitHub Actions are pinned to commit SHAs.
  - Python and npm packages are pinned to exact versions.
  - Dependabot opens update pull requests.
- **Code scanning.** CodeQL runs on JavaScript and Python. ESLint runs with security rules, and warnings fail the build.
- **Repository policy scan.** It fails on email addresses, banned terms, and decks or films in the repository.
