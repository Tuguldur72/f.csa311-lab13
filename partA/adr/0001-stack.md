# ADR-001: Technology Stack for Personal Task Tracker

## Status
Accepted

## Context
[cite_start]We need a stack that supports rapid development of a REST API with persistent storage for tasks[cite: 29].

## Decision
[cite_start]We chose **Node.js, Express.js, and MongoDB**[cite: 11]. 
- **Node.js/Express:** Fast for building APIs and has a huge ecosystem.
- **MongoDB:** Flexible schema (document-based) which is perfect for task labels and metadata.

## Consequences
- Requires an active MongoDB instance (or Atlas).
- Team must follow asynchronous JavaScript patterns.