# Security Policy

## Supported versions

Only the **current major** release line receives security fixes.

| Version | Status              |
| ------- | ------------------- |
| 4.x     | ✅ Actively supported |
| < 4     | ❌ Not supported     |

Upgrade to the latest `4.x` release to receive all patches.

## Reporting a vulnerability

**Do not open a public GitHub issue for security reports.**

Report vulnerabilities privately via **GitHub Security Advisories**:

1. Go to the [Security tab](https://github.com/brmorillo/global-locations/security/advisories) of this repository.
2. Click **"New draft security advisory"**.
3. Fill in the description, affected versions, and steps to reproduce.
4. Submit — the maintainer will be notified privately.

Alternatively, send an e-mail to **bruno@rmorillo.com** with:
- Subject: `[SECURITY] @brmorillo/global-locations — <short title>`
- Affected version(s) and runtime environment.
- A concise description and steps to reproduce.
- (Optional) a suggested fix or patch.

### Response timeline

| Event | Target |
| ----- | ------ |
| Acknowledgement | within **48 hours** |
| Initial triage & severity rating | within **5 business days** |
| Patch or workaround | within **14 days** for critical/high; **30 days** for medium/low |
| Public disclosure | after the patch is published (coordinated with reporter) |

We follow [responsible disclosure](https://en.wikipedia.org/wiki/Responsible_disclosure). Credit will be given in the release notes unless you prefer to remain anonymous.

## Dependency policy

- All runtime and dev dependencies are pinned to **exact versions** for reproducible installs.
- CI runs [Gitleaks](https://github.com/gitleaks/gitleaks) on every PR and push to `main` to detect accidentally committed secrets.

## Scope

In-scope for security reports:

- Data integrity issues in location data (incorrect country/state/city associations).
- Vulnerabilities in the library code itself (`src/`).
- Supply-chain issues in pinned dependencies.

Out of scope:

- Issues requiring physical access to the developer's machine.
- Denial-of-service against the npm registry or GitHub Actions infrastructure.
