# 🏗️ SYNERGY UI v1.0 - COMPLETE ARCHITECTURE & COMPONENT SUMMARY

**Version:** 0.6.43  
**Date:** February 2, 2026  
**Status:** Production-Ready Stack

---

## 📊 SYSTEM ARCHITECTURE OVERVIEW

```diagram
┌─────────────────────────────────────────────────────────────┐
│                    SYNERGY UI v1.0 STACK                    │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌──────────────────┐         ┌──────────────────┐          │
│  │   FRONTEND       │         │   BACKEND        │          │
│  │  (Sveltekit)     │◄────────►│   (FastAPI)      │          │
│  │   Port: 5173     │         │   Port: 8000     │          │
│  └──────────────────┘         └──────────────────┘          │
│         │                              │                     │
│         │                              ├─► Database          │
│         │                              ├─► Redis             │
│         │                              ├─► Ollama (WSL)      │
│         │                              └─► Storage           │
│         │                                                     │
│  Real-time WebSocket ◄──────► Socket.IO                      │
│  (HMR Dev Server)             (Python socketio)              │
│                                                               │
└─────────────────────────────────────────────────────────────┘
```

---

## 🎯 BACKEND ARCHITECTURE (FastAPI)

### Core Components

#### **Main Application Entry**
```
backend/synergy_ui/main.py
├── FastAPI app initialization
├── CORS configuration
├── Middleware setup
├── Router registration
└── WebSocket handlers
```

#### **Core Modules**
- `config.py` - Configuration management (40+ environment variables)
- `env.py` - Environment loader and validation
- `constants.py` - Application constants
- `functions.py` - Core business logic functions
- `tasks.py` - Background task management
- `__init__.py` - Package initialization

---

### 📡 API ROUTERS (25 Modules)

| Router | Purpose | Key Endpoints |
|--------|---------|---|
| **auths.py** | Authentication & OAuth | `/auth`, `/signin`, `/signup`, `/logout` |
| **users.py** | User management | `/users`, `/profile`, `/settings` |
| **chats.py** | Chat management | `/chats`, `/messages`, `/history` |
| **channels.py** | Channel/room management | `/channels`, `/members`, `/messages` |
| **models.py** | LLM model management | `/models`, `/pull`, `/delete` |
| **ollama.py** | Ollama integration | `/ollama/models`, `/generate`, `/chat` |
| **openai.py** | OpenAI API proxy | `/openai/*` (proxy endpoints) |
| **files.py** | File upload/download | `/files`, `/upload`, `/download` |
| **images.py** | Image generation | `/generate`, `/edit`, `/variations` |
| **knowledge.py** | RAG knowledge base | `/knowledge`, `/documents`, `/search` |
| **retrieval.py** | Document retrieval | `/retrieve`, `/process`, `/embed` |
| **memories.py** | User memories/context | `/memories`, `/recall`, `/store` |
| **functions.py** | Custom functions | `/functions`, `/install`, `/execute` |
| **tools.py** | Tool/plugin management | `/tools`, `/register`, `/call` |
| **prompts.py** | Prompt management | `/prompts`, `/templates`, `/library` |
| **folders.py** | Folder/organization | `/folders`, `/create`, `/organize` |
| **groups.py** | User groups | `/groups`, `/members`, `/permissions` |
| **configs.py** | System configuration | `/config`, `/settings`, `/admin` |
| **notes.py** | Note-taking | `/notes`, `/create`, `/update` |
| **tasks.py** | Task management | `/tasks`, `/title`, `/queries`, `/tags` |
| **pipelines.py** | Custom pipelines | `/pipelines`, `/filter`, `/execute` |
| **audio.py** | Audio processing | `/transcribe`, `/voices`, `/tts` |
| **evaluations.py** | Feedback/evaluation | `/feedback`, `/rating`, `/evaluate` |
| **scim.py** | SCIM protocol support | `/scim/users`, `/scim/groups` |
| **utils.py** | Utility endpoints | `/gravatar`, `/pdf`, `/markdown` |

---

### 🗄️ DATABASE MODELS (18 Models)

| Model | Purpose |
|-------|---------|
| **Users** | User accounts, profiles, authentication |
| **Auths** | Authentication methods, passwords, tokens |
| **Chats** | Conversation history and metadata |
| **Messages** | Individual messages in chats |
| **Channels** | Team/group channels |
| **Groups** | User groups and memberships |
| **Files** | File metadata and storage references |
| **Folders** | Folder organization |
| **Knowledge** | Knowledge base/RAG collections |
| **Memories** | User memories and context storage |
| **Functions** | Custom function definitions |
| **Tools** | Tool/plugin definitions |
| **Models** | LLM model configurations |
| **Prompts** | System and user prompts |
| **Feedbacks** | User feedback and ratings |
| **Tags** | Tags for organization |
| **OAuthSessions** | OAuth session storage |
| **Messages (Channels)** | Channel-specific messages |

---

### 🛠️ UTILITY MODULES (28+ Utils)

#### Authentication & Security
- `auth.py` - JWT, password hashing, user authentication
- `access_control.py` - Permission system and role-based access
- `security_headers.py` - HTTP security headers

#### Data Processing
- `misc.py` - Utility functions, string operations, validation
- `payload.py` - Request payload processing and conversion
- `response.py` - Response formatting and conversion
- `headers.py` - HTTP header management

#### LLM & AI Integration
- `chat.py` - Chat completion generation
- `embeddings.py` - Embedding generation with multiple backends
- `models.py` - Model management and filtering
- `payload.py` - OpenAI/Ollama payload conversion

#### Advanced Features
- `code_interpreter.py` - Jupyter notebook code execution
- `filter.py` - Function/filter processing pipeline
- `middleware.py` - Request/response middleware
- `plugin.py` - Plugin/function loading system
- `mcp/` - Model Context Protocol client
- `telemetry/` - OpenTelemetry tracing and metrics

#### Data Management
- `files.py` - File operations and metadata
- `pdf_generator.py` - PDF generation from chats
- `rate_limit.py` - Request rate limiting
- `redis.py` - Redis connection pooling

#### Integration Services
- `oauth.py` - OAuth 2.0 / OpenID Connect
- `webhook.py` - Webhook dispatching
- `tools.py` - Tool specification and execution
- `logger.py` - Structured logging

#### RAG/Retrieval
- `retrieval/` - Vector DB integration
  - `vector/` - Vector database clients (Qdrant, Milvus, Pinecone, etc.)
  - `web/` - Web search integrations (30+ search engines)
  - `loaders/` - Document loaders
  - `utils.py` - RAG utilities

---

### 🔌 REAL-TIME & COMMUNICATION

#### Socket.IO Module (`socket/`)
- `main.py` - Socket.IO server and event handlers
- `utils.py` - WebSocket utilities, Redis message passing
- **Features:**
  - Real-time chat updates
  - Live collaboration
  - Presence detection
  - Document synchronization

---

### 💾 STORAGE LAYER

#### Storage Provider (`storage/provider.py`)
Supports multiple storage backends:
- **Local Filesystem** - File-based storage
- **AWS S3** - S3-compatible object storage
- **Google Cloud Storage** - GCS integration
- **Azure Blob Storage** - Azure cloud storage
- **MinIO** - S3-compatible on-premises

---

### 🗂️ INTERNAL MODULES

#### Database (`internal/`)
- `db.py` - SQLAlchemy database connection
- `wrappers.py` - Database operation wrappers

#### Migrations (`migrations/`)
- Alembic migration system
- Database schema versioning

---

### 📚 WEB SEARCH INTEGRATIONS (30+ Engines)

Integrated search providers:
```
├── Ollama Cloud          ├── Brave Search         ├── Serp
├── DuckDuckGo            ├── Kagi                 ├── Serply
├── Google PSE            ├── Mojeek               ├── Serpstack
├── Jina Search           ├── Bocha                ├── Tavily
├── SerpAPI               ├── Exa                  ├── Bing
├── SearchAPI             ├── Azure Search         ├── Perplexity
├── Searxng               ├── Firecrawl            ├── SougouAPI
└── Yacy                  └── External API
```

---

### 🗃️ VECTOR DATABASE SUPPORT

Multiple vector DB backends:
```
├── Qdrant (with multitenancy)
├── Milvus (with multitenancy)
├── Pinecone
├── Chroma
├── PgVector (PostgreSQL)
├── Weaviate
├── Elasticsearch
├── OpenSearch
├── Oracle 23 AI
└── S3Vector
```

---

## 🎨 FRONTEND ARCHITECTURE (SvelteKit)

### Directory Structure

```
src/
├── app.css              ─ Global styles
├── app.html             ─ HTML template
├── tailwind.css         ─ Tailwind configuration
├── lib/
│   ├── components/      ─ Reusable UI components
│   ├── stores/          ─ Svelte stores (state management)
│   ├── utils/           ─ Utility functions
│   ├── apis/            ─ API client methods
│   ├── types/           ─ TypeScript type definitions
│   ├── i18n/            ─ Internationalization
│   ├── workers/         ─ Web workers
│   ├── pyodide/         ─ Python in browser
│   └── constants.ts     ─ Frontend constants
└── routes/
    ├── +layout.svelte   ─ Root layout
    ├── (app)/           ─ App routes
    ├── auth/            ─ Authentication pages
    ├── error/           ─ Error pages
    └── s/               ─ Shared routes
```

### Key Frontend Features
- ✅ **Reactive UI** - Svelte 5.0 with runes
- ✅ **Type Safety** - TypeScript 5.5.4
- ✅ **Styling** - Tailwind CSS 4.0
- ✅ **Build Tool** - Vite 5.4.14
- ✅ **Internationalization** - i18next
- ✅ **Testing** - Vitest + Cypress
- ✅ **Components** - Reusable component library

### Frontend Dependencies (60+)

**Core Frameworks:**
- `svelte@^5.0.0` - Reactive framework
- `@sveltejs/kit@^2.5.27` - Meta-framework
- `vite@^5.4.14` - Build tool

**Styling:**
- `tailwindcss@^4.0.0` - CSS utility framework
- `postcss@^8.4.31` - CSS processor

**Development:**
- `typescript@^5.5.4` - Type system
- `eslint@^8.56.0` - Code linting
- `prettier@^3.3.3` - Code formatting

**Testing:**
- `cypress@^13.15.0` - E2E testing
- `vitest@latest` - Unit testing

**Additional:**
- `svelte-confetti@^1.3.2` - Confetti effect
- `svelte-check@^4.0.0` - Type checking
- Various other utilities (750+ packages total via npm)

---

## 🧪 TESTING INFRASTRUCTURE

### E2E Tests (Cypress)
```
cypress/
├── e2e/
│   ├── chat.cy.ts           - Chat functionality tests
│   ├── documents.cy.ts      - Document handling tests
│   ├── registration.cy.ts   - User registration tests
│   └── settings.cy.ts       - Settings management tests
├── support/
│   ├── e2e.ts              - Cypress configurations
│   └── index.d.ts          - Type definitions
└── data/
    └── example-doc.txt     - Test fixtures
```

### Unit Tests (Vitest)
- Framework: Vitest
- Configuration: `vitest.config.ts`
- Test discovery: `src/**/*.test.ts` files

### Test Configuration
- `cypress.config.ts` - E2E test configuration
- Base URL: `http://localhost:8080`
- Test timeout: Configurable

---

## 🐳 DOCKER & DEPLOYMENT

### Docker Configurations (8)

| Config | Purpose |
|--------|---------|
| `Dockerfile` | Production image build |
| `docker-compose.yml` | Standard dev/prod stack |
| `docker-compose.gpu.yaml` | GPU-accelerated Ollama |
| `docker-compose.api.yaml` | API-only setup |
| `docker-compose.data.yaml` | Data services only |
| `docker-compose.amdgpu.yaml` | AMD GPU support |
| `docker-compose.otel.yaml` | OpenTelemetry observability |
| `docker-compose.playwright.yaml` | Browser testing |

---

## 📦 DEPENDENCIES SUMMARY

### Backend Dependencies (40+)
- **Web Framework:** FastAPI, Uvicorn, Starlette
- **ORM:** SQLAlchemy, Peewee, Alembic
- **Data Validation:** Pydantic
- **Real-time:** python-socketio, Redis
- **LLM Integration:** OpenAI, MCP, Ollama
- **Web Scraping:** requests, httpx, BeautifulSoup
- **Vector DB:** Multiple SDK clients
- **Auth:** JWT, OAuth2, Authlib, bcrypt
- **Async:** aiohttp, asyncio utilities
- **Monitoring:** Loguru, OpenTelemetry

### Frontend Dependencies (60+)
- **Framework:** SvelteKit, Svelte
- **Styling:** Tailwind CSS, PostCSS
- **Tooling:** Vite, TypeScript
- **Testing:** Cypress, Vitest
- **Code Quality:** ESLint, Prettier
- **UI Enhancements:** svelte-confetti and others
- **i18n:** i18next, i18next-parser

---

## 🔄 DATA FLOW

```
User Input
    ↓
Frontend (SvelteKit) ─ Real-time Updates ─ Socket.IO
    ↓                                        ↓
API Request (HTTP/REST)               WebSocket Events
    ↓                                        ↓
Backend Router ─────→ Authentication → Authorization
    ↓
Middleware Processing
    ↓
Business Logic
    ↓
Database/Storage ←──→ Redis Cache ←──→ Vector DB
    ↓
Ollama/LLM Engine
    ↓
Response Formatting ─→ Real-time Socket Events
    ↓
Frontend Rendering
    ↓
User Output
```

---

## 🔌 INTEGRATION POINTS

### External Services
1. **LLM Services**
   - Ollama (local)
   - OpenAI API
   - Custom OpenAI-compatible endpoints

2. **Search Engines** (30+)
   - DuckDuckGo, Google, Bing
   - Specialized: Kagi, Brave, Tavily
   - Cloud: Azure, Perplexity

3. **Storage Providers**
   - AWS S3
   - Google Cloud Storage
   - Azure Blob Storage
   - MinIO (on-premises)

4. **Authentication**
   - OAuth 2.0 providers
   - OpenID Connect
   - Email/password local auth

5. **Vector Databases**
   - Cloud-hosted (Pinecone)
   - Self-hosted (Qdrant, Milvus)
   - Database extensions (PgVector)

---

## 📊 SYSTEM STATISTICS

| Metric | Count |
|--------|-------|
| Total API Routers | 25 |
| Database Models | 18+ |
| Utility Modules | 28+ |
| Web Search Integrations | 30+ |
| Vector DB Backends | 10+ |
| Docker Configurations | 8 |
| E2E Test Files | 4 |
| Backend Python Files | 200+ |
| Frontend Components | 50+ |
| Total Dependencies | 800+ |
| Lines of Code | 50,000+ |

---

## 🚀 DEPLOYMENT READY

✅ **All components verified and operational**
✅ **Full documentation complete**
✅ **Testing infrastructure configured**
✅ **Production-ready stack**
✅ **Scalable architecture**
✅ **Modular design**

---

## 📝 KEY FEATURES

### Chat & Conversations
- Real-time messaging
- Chat history and search
- Export/Import functionality
- Conversation sharing

### RAG & Knowledge Management
- Document upload and processing
- Vector embedding and search
- Multi-backend vector DB support
- Hybrid search capabilities

### AI Model Management
- Multiple LLM backends
- Model switching and configuration
- Custom model creation
- Model performance tracking

### User Management
- Role-based access control
- Group management
- OAuth/OIDC integration
- Multi-tenant support

### Advanced Features
- Custom functions/tools
- Pipeline creation
- Webhook support
- Code execution
- Audio processing
- Image generation
- PDF generation

---

*Synergy UI v0.6.43 | Complete production-ready AI stack*
