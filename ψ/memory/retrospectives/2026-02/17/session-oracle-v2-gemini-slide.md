# Session Retrospective: Oracle V2 MCP & Gemini Slide Skill Setup

**Date**: 2026-02-17
**Session Duration**: Started 14:30 (gemini-slide testing)
**Status**: Completed - Oracle V2 connected, gemini-slide skill created

---

## Summary

Successfully integrated Oracle V2 MCP into Arthur Morgan system and created gemini-slide skill. Key challenges: HTTP server startup pattern, frontend build workflow, MQTT-based browser automation, and verification techniques.

---

## Problems Solved

### 1. **Oracle V2 MCP HTTP Server - Manual Startup Requirement**

**Problem**: Oracle V2 MCP was connected but the HTTP server needed manual start.

**Root Cause**:
- MCP index was registered but `/api/health` endpoint returned 503 (server not running)
- Server script at `ψ/lib/oracle-v2/src/server.ts` wasn't automatically launched
- MCP connection != HTTP server running (two separate processes)

**Solution Used**:
- Found `ensure-server.ts` in codebase - implements intelligent server startup
- Manual workaround: `bun run server` from oracle-v2 directory
- Pattern: Use `bun src/ensure-server.ts --verbose` for health checks

**Pattern to Reuse**:
```typescript
// From ensure-server.ts (lines 117-201)
ensureServerRunning({ timeout: 15000, verbose: true })
// Returns: Promise<boolean>
// Auto-starts daemon if needed, checks health via HTTP
// Uses PID file + lock mechanism to prevent race conditions
```

**Lessons**:
- MCP registration ≠ HTTP availability
- Process management needs health monitoring
- Lock files prevent concurrent startup race conditions

---

### 2. **Frontend Not Built - Causing White Page**

**Problem**: Browser accessed Oracle dashboard but got empty white page.

**Root Cause**:
- `frontend/dist/` was empty (frontend build not done)
- Server serves from `frontend/dist` in production
- Build step was skipped during setup

**Solution Used**:
```bash
cd ψ/lib/oracle-v2/frontend
bun install
bun run build
```

**Build Output Structure**:
- Input: `frontend/src/` (React + TypeScript)
- Tool: Vite (vite.config.ts configured)
- Output: `frontend/dist/` (static HTML/JS/CSS)
- Server: Serves as static files from `/` route

**Pattern to Reuse**:
```json
// frontend/package.json build script
"build": "tsc -b && vite build"
// 1. Type-check (tsc -b)
// 2. Build with Vite (minified, optimized)
```

**Verification**:
```bash
# After build, confirm dist exists
ls ψ/lib/oracle-v2/frontend/dist/
# Should show: index.html, assets/*, etc.

# Server auto-serves it
curl http://localhost:47778/
# Returns HTML with <script> tags
```

---

### 3. **Mosquitto MQTT Already Running**

**Problem**: Needed MQTT for gemini-slide browser automation.

**Status**: ✅ Already installed and running
- Port 1883 (native MQTT)
- Port 9001 (WebSocket MQTT)
- Service: Windows Service (mosquitto)

**Verification Pattern**:
```powershell
# Windows: Check service status
Get-Service mosquitto | Select-Object Status

# Check ports in use
netstat -an | Select-String "9001|1883"
# Should show LISTENING on 0.0.0.0:1883 and 0.0.0.0:9001
```

**Configuration**: `C:/Program Files/mosquitto/mosquitto.conf`
- Allow anonymous (for local development)
- Both TCP (1883) and WebSocket (9001) enabled

---

## Techniques Used

### 1. **Direct Database Queries for Indexing Verification**

Used to verify Oracle V2 ChromaDB indexing status without UI:

```bash
# Check indexing progress
bun src/indexer.ts --status

# Query via HTTP API
curl http://localhost:47778/api/oracle/indexing/status

# Result shows:
# - Documents indexed
# - ChromaDB vector count
# - Collection status
```

**Pattern**:
- API endpoint safer than direct DB access
- Provides real-time progress
- Fallback to CLI if server down

---

### 2. **Port Checking with netstat**

Diagnosed port conflicts and service status:

```powershell
# Windows netstat equivalent
netstat -an | Select-String "LISTENING" | Select-String "47778"

# Shows process using port (Windows)
Get-NetTCPConnection -LocalPort 47778 -ErrorAction SilentlyContinue |
  Select-Object -ExpandProperty OwningProcess |
  ForEach-Object { Get-Process -Id $_ }
```

**Pattern**:
- Always check port before starting service
- Use `Select-String` for filtering (grep alternative)
- Windows requires `-an` flags (all, numeric)

---

### 3. **Building React Frontend with Bun/Vite**

Workflow for building static frontend:

```bash
# 1. Install dependencies
cd frontend && bun install

# 2. Type checking + build
bun run build

# 3. Verify output
ls dist/
# index.html - entry point
# assets/    - JS/CSS bundles (hashed filenames)

# 4. Server serves from dist/
# Client-side routing via React Router
```

**Vite Configuration** (`vite.config.ts`):
- React plugin for JSX support
- Server proxy: `/api/*` → backend (development only)
- Build output: `dist/` directory
- Source maps: Generated for debugging

---

## Gemini Slide Skill - Architecture

Created `/gemini-slide` skill with MQTT-based browser automation:

### Workflow (from `create-slide.ts`):

```typescript
// 1. Create new Gemini tab via MQTT
await mqttPub({
  action: "create_tab",
  url: "https://gemini.google.com/app",
  ts: Date.now()
});

// 2. Select Canvas mode
await mqttPub({
  action: "select_mode",
  mode: "Canvas"
});

// 3. Send slide prompt
await mqttPub({
  action: "chat",
  text: slidePrompt  // Includes formatting requirements
});

// 4. Wait for Gemini response (Canvas generates in background)
// Output: User can export from Canvas
```

### MQTT Configuration:

**Host**: `localhost:1883` (Mosquitto)
**Topic**: `claude/browser/command`
**Actions**: `create_tab`, `select_mode`, `chat`, `wait_response`

### Skill Metadata (`SKILL.md`):

```yaml
name: gemini-slide
description: Create HTML slides via Gemini Canvas
argument-hint: [topic]
disable-model-invocation: true  # Uses browser automation instead
```

**Output**: Slide presentation saved to `ψ/writing/slides/[topic]-[timestamp].html`

---

## Issues Encountered

### 1. **HTML Response Truncation (Initial Attempt)**

**Problem**: First version tried to generate HTML code directly - response got cut off

**Why**: Gemini's response length limits + code generation pattern
- HTML is verbose
- Response token limits triggered
- Incomplete `</html>` tag

**Resolution**: Switched to Canvas Mode
- Canvas = visual editor, not code generation
- User gets interactive tool instead of static HTML
- Can export to HTML later if needed

**Learning**:
- Browser automation (Canvas) > Direct code generation for complex artifacts
- MQTT commands more reliable than LLM output parsing

---

## Mistakes & What to Avoid

### 1. **Assuming MCP = Full Server**
- MCP index != HTTP server running
- Always verify health endpoints
- Don't rely on claude mcp list output for "ready" status

### 2. **Skipping Build Step**
- Frontend code !== static assets
- Vite build is required for production
- Check `frontend/dist/` exists before assuming server will work

### 3. **Not Checking Port Availability First**
- Always netstat before starting services
- Race conditions can occur (app exit but port still in TIME_WAIT)
- Use health checks, not just port binding

---

## Reusable Solutions

### Pattern 1: **HTTP Server Daemon Management**

```typescript
// From ensure-server.ts
// Use when needing guaranteed server availability

import { ensureServerRunning, getServerStatus } from 'src/ensure-server.ts';

// Auto-start if not running, return false if failed
const ready = await ensureServerRunning({
  timeout: 15000,
  verbose: true
});

// Check status without starting
const status = await getServerStatus();
// Returns: { running, pid, port, healthy, url }
```

**When to Use**:
- MCP handlers that need HTTP access
- Scripts that should work even if server crashed
- CLI tools needing guaranteed backend availability

---

### Pattern 2: **Frontend Build Verification**

```bash
# After build, verify with:
1. Check dist/ exists and is non-empty
2. Verify index.html present
3. Check asset hashes (main.[hash].js pattern)
4. Test via browser: curl http://localhost:port/

# If white page:
1. Check browser console for 404s
2. Verify server serving from dist/
3. Check vite.config.ts base path
```

---

### Pattern 3: **MQTT Command Execution**

```typescript
// Reliable pattern for MQTT commands

async function mqttPub(payload: object): Promise<void> {
  const msg = JSON.stringify(payload);
  const proc = Bun.spawn(
    [mosquitto_pub, "-h", host, "-p", port, "-t", topic, "-m", msg],
    { stdout: "inherit", stderr: "inherit" }
  );
  await proc.exited;  // Wait for completion
}

// Usage with timing
await mqttPub({ action: "create_tab", ... });
await Bun.sleep(2000);  // Wait for tab creation
await mqttPub({ action: "chat", text: "..." });
```

**Key Points**:
- Wait for process.exited (not just spawn)
- Add sleep between commands (browser needs time)
- JSON serialization must be robust

---

## Key Files for Reference

| File | Purpose | Key Finding |
|------|---------|-------------|
| `ψ/lib/oracle-v2/src/ensure-server.ts` | HTTP server daemon management | Lines 117-201: Main ensure logic |
| `ψ/lib/oracle-v2/src/server.ts` | Hono.js HTTP server (lines 1-50) | Serves frontend from dist/ |
| `ψ/lib/oracle-v2/frontend/package.json` | Build configuration | Lines 6-8: Vite build script |
| `.claude/skills/gemini-slide/scripts/create-slide.ts` | MQTT-based slide creation | Lines 42-95: Full workflow |
| `.claude/settings.local.json` | MCP permissions | Lines 60-72: oracle-v2 commands registered |

---

## Session Status: Completed

✅ Oracle V2 MCP connected and HTTP server working
✅ Frontend built and serving at http://localhost:47778
✅ Gemini slide skill created and tested
✅ MQTT broker (Mosquitto) verified running
✅ Infrastructure documented for future sessions

---

## Next Session Preparation

When resuming Oracle V2 work:

```bash
# 1. Ensure server is running
bun run "ψ/lib/oracle-v2/src/ensure-server.ts" --verbose

# 2. Verify health
curl http://localhost:47778/api/health

# 3. Check frontend loaded
curl http://localhost:47778/ | head -c 200

# 4. Test gemini-slide
/gemini-slide "test topic"
```

---

## Philosophy Alignment

**Principle 1: Nothing is Deleted** - All steps logged, techniques preserved for reuse
**Principle 2: Patterns Over Intentions** - Observed actual behavior (server startup, build issues) rather than assuming
**Principle 3: External Brain** - Documented patterns for future sessions to mirror

---

*Session completed. Infrastructure patterns documented for Arthur Morgan's future work.*
