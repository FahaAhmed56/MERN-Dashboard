# Project Pulse — Full-stack MERN Project Management Dashboard

A modern, responsive project/task tracker built using **MongoDB, Express, React, and Node.js**. GitHub-ready portfolio project.

## Features
- Register and sign in with hashed passwords (bcrypt) and JWT authentication
- User-specific projects and tasks (resource ownership enforced server-side)
- Create, view, and delete projects; edit project via REST API
- Create, edit, delete, search, filter, and update status of tasks
- Kanban-style To do / In progress / Completed board
- Dashboard cards: projects, tasks in progress, tasks completed, overdue
- Due dates, priorities, progress bars, mobile responsive UI
- API validation with Zod, Helmet headers, login rate limiting
- Node tests and GitHub Actions workflow

## Requirements
- Node.js 20.19+ or 22+
- MongoDB Community Server running locally, or MongoDB Atlas cluster

## Run locally

```bash
npm install
npm run install:all
cp .env.example server/.env
```

**Windows PowerShell:** `Copy-Item .env.example server/.env`

Edit `server/.env` to set a real `MONGO_URI` and a securely random **JWT_SECRET** (at least 24 characters). Never commit `server/.env`.

```bash
npm run dev
```

- Website: http://localhost:5173
- API health: http://localhost:5000/api/health

Register a new user, create a project, then add tasks. The DB starts empty intentionally.

## Project layout

```text
client/                 React + Vite interface
  src/App.jsx           Dashboard, board, forms, auth
  src/api.js            JWT-aware API helper
server/src/             Express REST API
  models/               Mongoose schemas
  middleware/auth.js    JWT verification
  routes/               Auth, project and task endpoints
.github/workflows/ci.yml
```

## API endpoints

| Method | Endpoint | Purpose |
|---|---|---|
| POST | /api/auth/register | Sign up |
| POST | /api/auth/login | Sign in |
| GET | /api/projects | List own projects |
| POST | /api/projects | Create project |
| PATCH | /api/projects/:id | Edit project |
| DELETE | /api/projects/:id | Delete project and its tasks |
| GET | /api/tasks | List own tasks; `?project=<id>` optional |
| POST | /api/tasks | Create task in own project |
| PATCH | /api/tasks/:id | Edit task / change status |
| DELETE | /api/tasks/:id | Delete task |
| GET | /api/health | Basic API check |

All project/task endpoints need `Authorization: Bearer <JWT>`.

Example task JSON:

```json
{"project":"YOUR_PROJECT_OBJECT_ID","title":"Build dashboard","description":"Build overview page","status":"todo","priority":"high","dueDate":"2026-11-10"}
```

## Validation

```bash
npm test
npm run build
```

Tests cover utilities and basic app behavior, not full database integration. For deeper coverage add an ephemeral MongoDB testing server and HTTP integration tests.

## Deployment notes
- Deploy API on Node-hosting platform with `MONGO_URI`, `JWT_SECRET` and `CLIENT_ORIGIN` env variables.
- Deploy frontend to static hosting; production setup should configure a reverse proxy of `/api` to your backend (Vite proxy is development-only).
- Use HTTPS and rotate compromised credentials; keep secrets out of GitHub.
- Current JWT storage uses localStorage for portfolio simplicity; for sensitive production deployments use secure, HttpOnly cookie-based sessions and CSRF protection.
- For concurrent multi-document operations, consider MongoDB transactions when deploying on a replica set.

## GitHub repository description
**Responsive MERN project management dashboard with JWT authentication, Kanban task boards, project tracking, and REST APIs.**

## License
MIT
