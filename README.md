# lobby-frontend

**Lobby – Find the time when everyone's free.**
Friends enter the times when they are busy, and Lobby shows the time slots in which everyone is free.

This is the Vue 3 frontend (TypeScript, Vite, Vue Router, axios). The backend lives in
[Alextout/lobby-backend](https://github.com/Alextout/lobby-backend) (Spring Boot).

Project for the module *Web-Technologien* at HTW Berlin, WiSe 2026/27.

## Features

| Feature                                                 | Status |
| ------------------------------------------------------- | ------ |
| Show busy time blocks loaded from the backend (`GET /timeblocks`) | ✅ |
| Deployment on Render                                    | 🚧 |
| Add a time block via form (`POST /timeblocks`)          | 🔜 |
| Show common free time slots                             | 🔜 |

✅ done · 🚧 in progress · 🔜 planned

## Configuration

The backend URL is read from the environment variable `VITE_BACKEND_BASE_URL`:

| File               | Used by                         | Value                                     |
| ------------------ | ------------------------------- | ----------------------------------------- |
| `.env.development` | `npm run dev`                   | `http://localhost:8080`                   |
| `.env.production`  | `npm run build` (e.g. on Render) | `https://lobby-backend-ub0n.onrender.com` |

## Run locally

Requirements: Node.js `^22.18.0` or `>=24.12.0`.

```sh
npm install
npm run dev          # dev server on http://localhost:5173
```

For data to show up, the backend must be running on `http://localhost:8080`
(see the backend README), otherwise the list stays empty.

Other scripts:

```sh
npm run build        # type-check + production build into dist/
npm run test:unit    # unit tests with Vitest
npm run lint         # oxlint + ESLint
```
