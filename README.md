# Synergy UI

**Version:** 0.6.43

A comprehensive, full-stack web application for conversational AI with support for multiple LLM backends, document retrieval, and real-time communication.

## Project Structure

- **Frontend:** SvelteKit + Tailwind CSS + TypeScript
- **Backend:** FastAPI + Python
- **Testing:** Cypress (E2E), Vitest (Unit)
- **Containerization:** Docker & Docker Compose
- **Package Manager:** npm (frontend), pip (backend)

## Quick Start

### Prerequisites

- Node.js 22+
- Python 3.8+
- Docker & Docker Compose (optional)

### Frontend Setup

```bash
npm install
npm run dev
```

The frontend will be available at `http://localhost:5173` (or `http://localhost:5050` with `npm run dev:5050`)

### Backend Setup

```bash
cd backend
pip install -r requirements.txt
./start.sh  # or start_windows.bat on Windows
```

The backend API will be available at `http://localhost:8000`

## Available Scripts

### Frontend

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run check` - Run type checking
- `npm run lint` - Lint frontend and backend code
- `npm run format` - Format code with Prettier
- `npm run test:frontend` - Run frontend unit tests
- `npm run cy:open` - Open Cypress test runner

### Backend

- `python -m uvicorn synergy_ui.main:app --reload` - Start development server
- `pylint backend/` - Lint backend code
- `black . --exclude ".venv/|/venv/"` - Format backend code

### Docker

```bash
docker-compose up
```

## Configuration

### Environment Variables

Backend environment variables are configured in `backend/synergy_ui/env.py`. Key variables include:

- `DATABASE_URL` - Database connection string
- `REDIS_URL` - Redis connection string
- `PORT` - Backend server port (default: 8000)
- `HOST` - Backend server host (default: 0.0.0.0)

## Testing

### End-to-End Tests (Cypress)

```bash
npm run cy:open
```

Base URL is configured as `http://localhost:8080` in `cypress.config.ts`

### Frontend Unit Tests (Vitest)

```bash
npm run test:frontend
```

## Project Dependencies

### Key Frontend Dependencies

- `@sveltejs/kit@^2.5.27` - SvelteKit framework
- `svelte@^5.0.0` - Svelte framework
- `tailwindcss@^4.0.0` - CSS framework
- `typescript@^5.5.4` - TypeScript support
- `vite@^5.4.14` - Build tool

### Key Backend Dependencies

- `fastapi==0.126.0` - Web framework
- `sqlalchemy==2.0.45` - ORM
- `pydantic==2.12.5` - Data validation
- `python-socketio==5.15.1` - WebSocket support
- `openai` - OpenAI API integration
- `mcp==1.25.0` - Model Context Protocol

## Docker Support

The project includes multiple Docker Compose configurations:

- `docker-compose.yml` - Standard setup
- `docker-compose.gpu.yaml` - GPU support
- `docker-compose.api.yaml` - API-only setup
- `docker-compose.playwright.yaml` - Testing setup
- `docker-compose.otel.yaml` - Observability setup

## License

See [LICENSE](LICENSE) file for details.

## Contributing

See [CONTRIBUTING.md](docs/CONTRIBUTING.md) for contribution guidelines.

---

**For more information:** See [TROUBLESHOOTING.md](TROUBLESHOOTING.md) and [docs/](docs/) folder.
