# Fireflies.ai Clone

A full-stack meeting intelligence platform inspired by [Fireflies.ai](https://fireflies.ai). Record, transcribe, summarize meetings, and explore an AI-powered notebook workspace.

## Live Demo

| Service | URL |
|---------|-----|
| **Deployed Application (Vercel)** | https://fireflies-ai-clone-one.vercel.app |
| **Backend API (Render)** | https://fireflies-ai-clone-ytdf.onrender.com |

## Features

- **Home dashboard** — Quick start actions, recent meetings feed, and onboarding
- **Notebook workspace** — All Meetings, My Meetings, and Voice Agent Meetings views
- **Meeting detail** — Transcripts, summaries, action items, and key topics
- **Ask Fred panel** — AI assistant sidebar with context-aware quick actions
- **Capture menu** — Add to live meeting, schedule, upload, or start recording
- **Search & filters** — Find meetings by title or keyword

## Tech Stack

| Layer | Technologies |
|-------|--------------|
| Frontend | Next.js 16, React 19, TypeScript, Tailwind CSS |
| Backend | FastAPI, SQLAlchemy, SQLite |
| AI | OpenAI / Anthropic (summaries & insights) |
| Deployment | Vercel (frontend), Render (backend) |

## Project Structure

```
fireflies-clone/
├── frontend/          # Next.js app
│   └── src/
│       ├── app/       # Routes (home, notebook, meetings, uploads, etc.)
│       └── components/
├── backend/           # FastAPI API
│   └── app/
│       ├── api/       # REST endpoints
│       ├── models/    # SQLAlchemy models
│       └── services/  # AI & business logic
└── README.md
```

## Local Development

### Prerequisites

- Node.js 18+
- Python 3.11+

### Backend

```bash
cd backend
pip install -r requirements.txt
```

Create `backend/.env`:

```env
OPENAI_API_KEY=your_key_here
```

Start the API:

```bash
uvicorn app.main:app --reload --port 8000
```

API docs: http://localhost:8000/docs

### Frontend

```bash
cd frontend
npm install
```

Create `frontend/.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

Start the dev server:

```bash
npm run dev
```

App: http://localhost:3000

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/health` | Health check |
| `GET` | `/meetings/` | List all meetings |
| `GET` | `/meetings/{id}` | Get meeting detail |
| `POST` | `/meetings/` | Create a meeting |
| `DELETE` | `/meetings/{id}` | Delete a meeting |
| `GET` | `/search/` | Search meetings |

## Deployment

### Frontend (Vercel)

1. Connect the `frontend` directory to Vercel
2. Set environment variable: `NEXT_PUBLIC_API_URL=https://fireflies-ai-clone-ytdf.onrender.com`
3. Deploy

### Backend (Render)

1. Create a Web Service pointing to the `backend` directory
2. Build command: `pip install -r requirements.txt`
3. Start command: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`
4. Add `OPENAI_API_KEY` and configure `CORS_ORIGINS` for your Vercel domain

## License

MIT
