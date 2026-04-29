# Personal Task Tracker - Guide

## Build & Run Commands
- Install dependencies: `npm install`
- Run server: `node src/app.js`
- Run tests: `npm test`

## Code Conventions
- [cite_start]Use Express.js with Node.js [cite: 11]
- API follows RESTful patterns
- Use Mongoose for MongoDB schemas
- [cite_start]Commits must follow **Conventional Commits** (feat, fix, docs, test, refactor) [cite: 87, 194]
- [cite_start]AI usage must be declared in commit messages: `Co-authored-by: Claude <noreply@anthropic.com>` [cite: 88, 89, 195]

## No-Go Zones
- Do not use plain passwords (always hash with bcrypt)
- Do not bypass the `/src/models` structure for database calls
- [cite_start]Max file length: 200 lines [cite: 38]