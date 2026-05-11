# Security Policy

## Reporting

Please do not open a public issue for suspected vulnerabilities or leaked secrets.

Report security concerns privately to the repository owner through GitHub.

## Secrets

This project is intended to run as a static public site and should not require
committed credentials. Keep local configuration in `.env.local` or Vercel project
settings. Files matching `.env*`, `.vercel/`, private keys, build outputs, and
dependency folders are intentionally ignored by Git.
