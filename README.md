# ReactAgentsForge

A full-stack demo that runs a **multi-agent software assistant** on the backend and a **React (Vite)** UI on the frontend. User prompts are routed through a **LangGraph** workflow powered by **Google Gemini** (`gemini-2.5-flash` via LangChain).

## What it does

1. **Classifier** — Decides if the question is about software development / coding.
2. If **not** coding-related, the API returns a short message explaining the assistant’s scope.
3. If **coding-related**, the graph runs in order: **Planner → Coder → Tests → Docs → Reviewer**. The reviewer can approve the result or send work back to the coder, tester, or docs step until approved or the graph ends.

The UI shows the plan, generated code, unit tests, documentation, and review output in separate panels.

## Tech stack

| Area | Stack |
|------|--------|
| Frontend | React 19, Vite 8, port **3000** |
| Backend | Express 5, Node (ES modules), default port **8080** |
| AI | `@langchain/langgraph`, `@langchain/google-genai`, LangChain, Zod schemas |

## Prerequisites

- **Node.js** 18+ (recommended; use a current LTS)

## Setup

From the repository root:

```bash
npm install
npm install --prefix backend
npm install --prefix frontend
```

### Environment variables

Create **`backend/.env`** (this file is not committed) and set your Google Generative AI API key. The LangChain Google GenAI integration typically reads:

```env
GOOGLE_API_KEY=your_key_here
```

Optional:

```env
PORT=8080
```

If you change `PORT`, update the frontend’s API URL (see below).

## Running locally

**Option A — both apps (recommended)**

```bash
npm run dev
```

**Option B — separately**

```bash
npm run backend   # Express + LangGraph on port 8080 (or PORT)
npm run frontend  # Vite dev server on port 3000
```

Open the app at **http://localhost:3000**. The UI posts to **`http://localhost:8080/api/assistant`** by default (`frontend/src/App.jsx`).

## API

| Method | Path | Description |
|--------|------|-------------|
| `GET` | `/api/health` | Health check |
| `POST` | `/api/assistant` | Body: `{ "query": "your question" }`. Returns either a non-coding message or structured `plan`, `code`, `tests`, `docs`, `review`. |

## Project layout

```
ReactAgentsForge/
├── package.json          # Root scripts (concurrent dev)
├── backend/
│   ├── src/
│   │   ├── server.js                    # Express app & routes
│   │   ├── llm/gemini.js              # Gemini model config
│   │   ├── graph/softwareAssistantGraph.js  # LangGraph definition
│   │   ├── agents/                    # classifier, planner, coder, test, docs, reviewer
│   │   └── schemas/taskSchemas.js
│   └── package.json
└── frontend/
    ├── src/
    │   ├── App.jsx
    │   └── components/
    └── vite.config.js
```

## Production build (frontend)

```bash
npm run build --prefix frontend
npm run preview --prefix frontend   # optional local preview of the build
```

Serve the `frontend/dist` assets with any static host and point the app at your deployed API (you will need to change `API_URL` in `App.jsx` or use env-based configuration).


