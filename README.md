# GoLightly02Db

A TypeScript database package providing Sequelize SQLite models for the GoLightly ecosystem.

## Overview

This package provides database models, connections, and schema definitions for GoLightly applications. It uses Sequelize ORM with SQLite and is designed to be installed via npm into other applications and services.

## Installation

Install locally in your project:

```bash
npm install /path/to/GoLightly02Db
```

## Quick Start

```javascript
import {
  initModels,
  sequelize,
  User,
  Meditation,
  Queue,
  SoundFiles,
  ElevenLabsFiles,
} from "golightly02db";

// Initialize all models and their associations
initModels();

// Create tables if they don't exist
await sequelize.sync();
```

## Environment Variables

Configure the database location using these environment variables:

- `PATH_DATABASE`: Directory path where the SQLite database file will be stored (default: current directory)
- `NAME_DB`: Database filename (default: "database.sqlite")

Example:

```bash
PATH_DATABASE=/path/to/your/data
NAME_DB=golightly.sqlite
```

## Database Models

### User Model

The User model supports both traditional email/password authentication and Google OAuth authentication.

#### Schema

| Field           | Type    | Nullable | Default | Description                                     |
| --------------- | ------- | -------- | ------- | ----------------------------------------------- |
| id              | INTEGER | NO       | Auto    | Primary key                                     |
| email           | STRING  | NO       | -       | Unique email, normalized to lowercase           |
| password        | STRING  | YES      | null    | Bcrypt hash, null for Google-only users         |
| isEmailVerified | BOOLEAN | NO       | false   | Email verification status                       |
| emailVerifiedAt | DATE    | YES      | null    | Timestamp of email verification                 |
| isAdmin         | BOOLEAN | NO       | false   | Admin privileges flag                           |
| authProvider    | STRING  | NO       | 'local' | Authentication method: 'local', 'google', 'both'|
| createdAt       | DATE    | NO       | Auto    | Record creation timestamp                       |
| updatedAt       | DATE    | NO       | Auto    | Record update timestamp                         |

#### Authentication Types

- **Local auth** (`authProvider='local'`): Traditional email/password authentication
- **Google auth** (`authProvider='google'`): Google OAuth only, password is null
- **Linked accounts** (`authProvider='both'`): Can use either email/password or Google

#### Examples

```javascript
// Create a local auth user
const localUser = await User.create({
  email: "user@example.com",
  password: "hashedPasswordHere",
  isEmailVerified: false,
  authProvider: "local",
});

// Create a Google auth user
const googleUser = await User.create({
  email: "googleuser@example.com",
  password: null,
  isEmailVerified: true,
  emailVerifiedAt: new Date(),
  authProvider: "google",
});

// Create a linked account user
const linkedUser = await User.create({
  email: "linked@example.com",
  password: "hashedPasswordHere",
  isEmailVerified: true,
  emailVerifiedAt: new Date(),
  authProvider: "both",
});
```

### Other Models

- **Meditation**: Guided meditations with audio files
- **Queue**: Job queue for meditation generation
- **SoundFiles**: Background sounds for meditations
- **ElevenLabsFiles**: AI-generated voice files
- **ContractUsersMeditations**: User-meditation relationships
- **ContractUserMeditationsListen**: Listen tracking and favorites
- **ContractMeditationsElevenLabsFiles**: Meditation-voice file relationships
- **ContractMeditationsSoundFiles**: Meditation-sound file relationships

## Breaking Changes

### Google Authentication Update (February 2026)

**IMPORTANT**: The User model schema has been updated to support Google Authentication.

#### Changes:

1. **password field is now nullable**
   - Previously required (NOT NULL)
   - Now optional (can be NULL) for Google-only users

2. **New authProvider field**
   - Required field tracking authentication method
   - Values: 'local' (default), 'google', or 'both'
   - Database-level validation enforces allowed values

#### Migration:

Since this is a new schema implementation, no migration is required. The old database should be deleted and recreated with the new schema using `sequelize.sync({ force: true })` in development.

**Warning**: `sequelize.sync({ force: true })` will delete all existing data!

## Documentation

For complete documentation, see:

- [Database Overview](./docs/DATABASE_OVERVIEW.md) - Complete schema reference with examples
- [CLAUDE.md](./CLAUDE.md) - Development notes and change history

## Development

### Build

```bash
npm run build
```

### Watch Mode

```bash
npm run dev
```

### Clean Build Artifacts

```bash
npm run clean
```

## Security

This package uses npm's `overrides` feature to ensure all dependencies use secure versions. See [CLAUDE.md](./CLAUDE.md) for details about security vulnerability fixes.

## License

[Your License Here]

## Support

For issues or questions, please contact the GoLightly development team.
