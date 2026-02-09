# GoLightly Database Package - Development Notes

## Overview

This is a custom TypeScript package that provides Sequelize SQLite database models and connections for GoLightly applications. It's designed to be installed via npm into other applications and services.

## Google Authentication Schema Changes (February 9, 2026)

### Breaking Changes

The User model has been updated to support Google Authentication alongside traditional email/password authentication.

**Schema Changes:**

1. **password field is now nullable**
   - Previously: `password` was NOT NULL
   - Now: `password` can be NULL (for Google-only authentication users)
   - Impact: Users authenticating with Google only will have `password = null`

2. **New authProvider field**
   - Type: STRING, NOT NULL
   - Default: 'local'
   - Allowed values: 'local', 'google', 'both'
   - Purpose: Tracks which authentication method(s) a user has enabled

**User Types:**

- **Local auth users** (`authProvider='local'`): Traditional email/password authentication, password required
- **Google-only users** (`authProvider='google'`): Authenticate via Google, password is null
- **Linked accounts** (`authProvider='both'`): Can use either email/password or Google authentication

**Migration Strategy:**

Since we're starting fresh with a new database, no migration is required. The old database will be deleted and recreated with the new schema.

**Validation:**

- Database-level validation ensures `authProvider` is one of: 'local', 'google', or 'both'
- API-level validation (in GoLightly02API) enforces that password is required when `authProvider='local'` or `authProvider='both'`
- API-level validation ensures password can be null only when `authProvider='google'`

## Security Vulnerabilities Fix (February 2026)

### Issue

When running `npm install`, the package had 5 high severity vulnerabilities related to the `tar` package (versions ≤7.5.6). These vulnerabilities were in the dependency chain:

- `sqlite3` → `node-gyp` → `make-fetch-happen` → `cacache` → `tar`

The vulnerabilities included:

- Arbitrary File Overwrite and Symlink Poisoning
- Race Condition in Path Reservations via Unicode Ligature Collisions
- Arbitrary File Creation/Overwrite via Hardlink Path Traversal

### Solution

We used npm's `overrides` feature to force all packages in the dependency tree to use a secure version of `tar` (≥7.5.7).

**Changes made to `package.json`:**

```json
{
  "overrides": {
    "tar": ">=7.5.7"
  }
}
```

This approach:

- Fixes all 5 security vulnerabilities
- Keeps `sqlite3@5.1.7` (latest version with all features)
- Avoids downgrading which would lose important features like:
  - `sqlite3_update_hook` support
  - SQLite limits configuration
  - Performance improvements
  - Security fixes in sqlite3 itself

### Installation

After this fix, running `npm install` or `npm ci` will automatically install the secure versions. No additional steps needed.

### Verification

To verify there are no vulnerabilities:

```bash
npm audit
```

Expected output: `found 0 vulnerabilities`

### Future Maintenance

If new vulnerabilities appear in transitive dependencies:

1. Check `npm audit` to identify the vulnerable package
2. Use the `overrides` section in `package.json` to force secure versions
3. Delete `node_modules` and `package-lock.json`
4. Run `npm install` to regenerate with overrides
5. Verify with `npm audit`

## Package Usage

This package is installed in other applications via:

```bash
npm install path/to/golightly02db
```

Or if published to npm:

```bash
npm install golightly02db
```

## Development

Build the package:

```bash
npm run build
```

Watch for changes during development:

```bash
npm run dev
```

Clean build artifacts:

```bash
npm run clean
```
