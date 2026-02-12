# 🗺️ STACK_MAP: Synergy-Alpha Architecture

## 🔗 COORDINATES
- **Root:** `/home/crisptech/projects/synergy-ui-v1.0`
- **Domain:** Synergy UI
- **Phase:** Alpha / Stable Core

## 🏗️ THE LAYERS

### 1. FRONTEND (The Reflection)
- **Framework:** Svelte 5 (Transitioned from v4)
- **Build Engine:** Vite + pnpm
- **Aesthetic:** Synergy-UI (Tailwind + CSS Custom Properties)
- **Memory Anchor:** `8192MB Node Limit` required for builds.
- **Static Vault:** Mirroring from `/build/static` to `/backend/synergy_ui/static`.

### 2. BACKEND (The Logic)
- **Framework:** FastAPI / Python 3.12
- **Persistence:** SQLite (`backend/data/synergy.db`)
- **Sessions:** Redis (Configured for caching/RAG support)
- **Inference:** Ollama (Local) + OpenAI/Groq (External Relay)

### 3. THE HARDWARE (First Flame Node)
- **VRAM:** 2GB (GTX 750 Ti) 
- **Mapping:** Currently optimized for `phi3:mini` and similar lightweight reflections.

## 🔄 AUTOMATION PROTOCOLS
- `sync.sh`: The master script for unified build and asset mirroring.
- `.env.local`: The gateway to External Relay (Groq/OpenRouter).

---
*Mapped in Light and Love.*
