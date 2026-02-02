# Database Overview

This document provides an overview of the database schema for the Meditation Mantra Creator Project.

Sequelize will handle the createdAt and updatedAt columns with timestamps: true.

## Tables

### Table: `Users`

#### Columns

| Column          | Type            | Null | Notes                          |
| --------------- | --------------- | ---- | ------------------------------ |
| id              | id              | NO   | PK                             |
| publicId        | publicId        | NO   |                                |
| email           | email           | NO   | unique, normalized (lowercase) |
| password        | password        | NO   | store bcrypt hash              |
| isEmailVerified | isEmailVerified | NO   | default `false`                |
| emailVerifiedAt | emailVerifiedAt | YES  | set upon verification          |

### Table: `Mantras`

#### Columns

| Column      | Type        | Null | Notes                      |
| ----------- | ----------- | ---- | -------------------------- |
| id          | id          | NO   | PK                         |
| publicId    | publicId    | NO   |                            |
| title       | title       | NO   | name shown in UI           |
| description | description | YES  | public listing summary     |
| visibility  | visibility  | NO   | default `'private'`        |
| filename    | filename    | YES  | filename of the audio file |
| filePath    | filePath    | YES  | path to the audio file     |

### Table: `ContractUsersMantras`

#### Columns

| Column   | Type     | Null | Notes           |
| -------- | -------- | ---- | --------------- |
| id       | id       | NO   | PK              |
| publicId | publicId | NO   |                 |
| userId   | userId   | NO   | FK → users.id   |
| mantraId | mantraId | NO   | FK → mantras.id |

### Table: `ElevenLabsFiles`

#### Columns

| Column   | Type     | Null | Notes                      |
| -------- | -------- | ---- | -------------------------- |
| id       | id       | NO   | PK                         |
| publicId | publicId | NO   |                            |
| filename | filename | YES  | filename of the audio file |
| filePath | filePath | YES  | path to the audio file     |

### Table: `UserMantraListens`

#### Columns

| Column      | Type        | Null | Notes           |
| ----------- | ----------- | ---- | --------------- |
| id          | id          | NO   | PK              |
| publicId    | publicId    | NO   |                 |
| userId      | userId      | NO   | FK → users.id   |
| mantraId    | mantraId    | NO   | FK → mantras.id |
| listenCount | listenCount | NO   | set upon listen |

### Table: `Queue`

#### Columns

| Column      | Type     | Null | Notes                                                                     |
| ----------- | -------- | ---- | ------------------------------------------------------------------------- |
| id          | id       | NO   | PK                                                                        |
| publicId    | publicId | NO   |                                                                           |
| userId      | userId   | NO   | FK → users.id                                                             |
| status      | string   | NO   | “queued”, “started”, "elevenlabs", "concatenator" or "done"               |
| jobFilename | string   | NO   | csv filename of the job file stored in PATH_QUEUER/user_request_csv_files |
