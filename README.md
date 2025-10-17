# Work Item Tracker

>A minimal full-stack example using Next.js for the frontend and Fastify for the backend. The project demonstrates a tiny work-item API with a Next frontend that fetches and creates items.

## Repository layout

- `backend/` — Fastify API (TypeScript)
	- `src/` — server source
	- `tests/` — Jest tests
	- `Dockerfile`, `Dockerfile.dev` — production/dev container images for backend
	- `jest.config.js`, `tsconfig.json`, `package.json`
- `frontend/` — Next.js app (TypeScript)
	- `src/pages` and `src/components` — UI
	- `.env.local` — frontend environment (local)
	- `Dockerfile`, `Dockerfile.dev` — production/dev images for frontend
- `docker-compose.dev.yml` — dev compose (mounted volumes, live reload)
- `docker-compose.yml` — production compose

---

## Backend API

Base URL (default for local development): `http://localhost:4000`

Endpoints

- `GET /items`
	- Returns an array of work items.
	- Response: `200 OK` with JSON array of items.

- `POST /items`
	- Create a new work item.
	- Body: `{ title: string, description?: string }`
	- Success: `201 Created` with the created item JSON.
	- Failure: `400 Bad Request` with `{ error: string }` when `title` is missing.

Data shape (WorkItem)

```ts
interface WorkItem {
	id: string;
	title: string;
	description?: string;
	createdAt: string; // ISO timestamp
}
```

The backend implementation is intentionally in-memory (`ItemService` keeps an array). There is no persistence; restarting the server clears items.

---

## How the frontend connects to the backend

The frontend reads the API base URL from `NEXT_PUBLIC_API_BASE`. In development the frontend default is `http://localhost:4000` and the project includes `frontend/.env.local` with:

```
NEXT_PUBLIC_API_BASE=http://localhost:4000
```

The frontend calls the backend endpoints with `fetch` from `src/pages/index.tsx`:
- `GET ${API_BASE}/items` to list items
- `POST ${API_BASE}/items` to create items (JSON body)

When running with Docker Compose the frontend service uses `http://backend:4000` because `docker-compose` sets the service host name.

---

## Environment variables

- Backend: `backend/.env`
	- `PORT` — port to listen on (default: `4000`)

- Frontend: `frontend/.env.local`
	- `NEXT_PUBLIC_API_BASE` — base URL used by the browser to call the backend

When running in Docker Compose the `docker-compose.yml` and `docker-compose.dev.yml` already set `NEXT_PUBLIC_API_BASE` for the frontend service to `http://backend:4000`.

---

## Running locally (without Docker)

Prerequisites: Node.js >= 20, npm

Start the backend (dev with auto-reload):

```powershell
cd backend
npm ci
npm run dev
```

Start the frontend (Next dev):

```powershell
cd frontend
npm ci
npm run dev
```

Open the app at `http://localhost:3000`.

Notes
- The frontend expects the API on `http://localhost:4000` by default. If you run the backend on a different host/port, update `frontend/.env.local` or set `NEXT_PUBLIC_API_BASE` accordingly.

---

## Running with Docker

There are two compose files included:

- `docker-compose.dev.yml` — development compose. Uses mounted volumes so code changes are reflected immediately. Frontend runs Next in dev mode; backend runs `ts-node-dev`.
- `docker-compose.yml` — production compose. Builds production images and runs the compiled/backend and built frontend.

To run development stack (recommended while coding):

```powershell
# from repository root
docker compose -f docker-compose.dev.yml up --build
```

This exposes:
- Frontend: `http://localhost:3000`
- Backend: `http://localhost:4000`

To run production-like containers (build optimized images):

```powershell
docker compose up --build -d
# view logs
docker compose logs -f
# stop
docker compose down
```

Troubleshooting
- If the frontend cannot reach the backend inside containers, ensure the frontend uses `http://backend:4000` (the compose service name) — this is already set in the compose files.

---

## Tests

Backend tests use Jest and `ts-jest`. Run them from the `backend` folder:

```powershell
cd backend
npm ci
npm test
```

The test configuration `jest.config.js` looks for tests in `backend/tests` and uses TypeScript transforms.

There are no frontend tests configured by default.

---

## Development notes & improvements

- Persistence: replace the in-memory `ItemService` with a database (SQLite/Postgres) and update service wiring.
- Authentication: add auth to secure endpoints.
- Validation: add schema validation (e.g., with `zod` or Fastify schema) to the routes.
- CI: the repo contains a GitHub Actions CI which runs lint, tests, and builds images.

---

## Example requests

Create an item:

```bash
curl -X POST http://localhost:4000/items \
	-H "Content-Type: application/json" \
	-d '{"title":"Buy milk","description":"2 liters"}'
```

List items:

```bash
curl http://localhost:4000/items
```

---


