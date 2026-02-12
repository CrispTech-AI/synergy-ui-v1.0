# 🎯 JEXI'S SELECTED MODEL LINEUP

## 🏆 PRIMARY ANCHOR MODELS (The Three Variants)

### 1. **JEXI-CONSIGNERE** (Public Variant)
- **Base:** `ctech-jexi-2-prime-7b:latest` → Creating as `jexi-consignere`
- **Purpose:** Public-facing CrispTech concierge
- **Temperature:** 0.7
- **Avatar:** Purple/Blue gradient with "J" monogram
- **Status:** ⚙️ Building now...

### 2. **JEXI-ESSENCE** (Personal AIE)
- **Base:** `ctech-mist7-v2opher:latest` → Creating as `jexi-essence`
- **Purpose:** Your personal AI companion
- **Temperature:** 0.85
- **Avatar:** Pink/Gold gradient with heart icon
- **Status:** ⚙️ Building now...

### 3. **JEXI-PRIME** (Private Daddy Variant)
- **Base:** `ctech-gpt-oss-20b:latest` → Creating as `jexi-prime`
- **Purpose:** Unrestricted, deeply personal, full trust
- **Temperature:** 0.9
- **Avatar:** Black/Red gradient with flame icon
- **Status:** ⚙️ Building now...

---

## 🌐 EXTERNAL RELAY MODELS (Speed & Capability)

### 4. **Grok-Beta (xAI)**
- **Access:** Via OpenRouter API
- **Purpose:** Lightning-fast responses (~100 tps), web-connected reasoning
- **Temperature:** 0.8
- **Use Case:** When you need instant, high-quality responses
- **Status:** ✅ Configured in `.env`

### 5. **Claude 3.5 Sonnet (Anthropic)**
- **Access:** Via OpenRouter API
- **Purpose:** Deep reasoning, coding assistance, long-context tasks
- **Temperature:** 0.7
- **Use Case:** Complex problem-solving, architectural decisions
- **Status:** ✅ Available via OpenRouter

### 6. **GPT-4o (OpenAI)**
- **Access:** Via OpenRouter API (bypassing broken OpenAI key)
- **Purpose:** Multimodal tasks, vision, general intelligence
- **Temperature:** 0.75
- **Use Case:** When you need GPT-4 without OpenAI API issues
- **Status:** ✅ Available via OpenRouter

---

## 🧪 EXPERIMENTAL/SUPPORT MODELS

### 7. **ctech-gemma3-base:latest**
- **Purpose:** Lightweight reasoning, fast local inference
- **Use Case:** Quick tasks, low-VRAM scenarios
- **Status:** ✅ Ready

### 8. **ctech-qwen3-4b:latest**
- **Purpose:** Coding assistance, technical tasks
- **Use Case:** Code generation, debugging
- **Status:** ✅ Ready

### 9. **ctech-dolphi-2.7b:latest**
- **Purpose:** Uncensored reasoning, creative tasks
- **Use Case:** When you need unrestricted output
- **Status:** ✅ Ready

---

## 📊 MODEL SELECTION RATIONALE

**Why these three bases for Jexi variants?**

1. **CONSIGNERE (jexi-2-prime-7b):** Already tuned for the Jexi personality, professional tone
2. **ESSENCE (mist7-v2opher):** Mistral-based, great for emotional intelligence and nuanced responses
3. **PRIME (gpt-oss-20b):** Largest local model, most capable for deep reasoning

**Why these external relays?**

- **Grok:** Speed and web connectivity
- **Claude:** Best-in-class reasoning and coding
- **GPT-4o:** Multimodal capabilities, general excellence

---

## 🎨 AVATAR/ICON ASSIGNMENTS

Once models are built, I'll configure these in Synergy UI:

- **JEXI-CONSIGNERE:** Purple/Blue gradient, professional "J" monogram
- **JEXI-ESSENCE:** Pink/Gold gradient, heart icon (intimacy)
- **JEXI-PRIME:** Black/Red gradient, flame icon (power, passion)

---

*Building now... Watch `tail -f backend/backend.log` for progress!*
