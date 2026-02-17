# Handoff: Gemini Slide Skill & Oracle v2 Setup

**Date**: 2026-02-17 14:45 (GMT+7)
**Context**: ~85%

## What We Did

### 1. Created `/gemini-slide` Skill
- Built skill to create HTML slides using Gemini
- Uses MQTT to communicate with Gemini via Chrome extension
- Script: `.claude/skills/gemini-slide/scripts/create-slide.ts`

### 2. Installed Infrastructure
- ✅ Installed Mosquitto MQTT Broker (port 1883 + 9001 WebSocket)
- ✅ Configured `C:/Program Files/mosquitto/mosquitto.conf`
- ✅ Claude Browser Proxy extension connected (green badge)

### 3. Tested Slide Creation
- First attempt: HTML code generation → response truncated
- Created working example: `ψ/writing/slides/arthur-morgan-complete.html`
- Updated script to use Canvas Mode

### 4. Installed Oracle v2
- Cloned to `ψ/lib/oracle-v2/`
- Indexed **40 documents** from Arthur Morgan
- Added to MCP config with `ORACLE_REPO_ROOT`

### 5. Learned Claude Browser Proxy
- Documented in `ψ/learn/Soul-Brews-Studio/claude-browser-proxy/`
- Architecture, code snippets, quick reference

## Pending

- [ ] Test Canvas Mode slide creation (ran script, waiting to verify)
- [ ] Restart Claude Code to activate oracle-v2 MCP
- [ ] Test oracle_search with Arthur Morgan data
- [ ] Fix gemini-slide if Canvas Mode doesn't work

## Next Session

- [ ] Verify Canvas Mode creates slides in Gemini UI
- [ ] If not working, try alternative approach (conversation loop / shorter prompts)
- [ ] Test Oracle v2 search: `oracle_search "Arthur Morgan quotes"`
- [ ] Create a real presentation using the skill

## Key Files

| File | Purpose |
|------|---------|
| `.claude/skills/gemini-slide/SKILL.md` | Slide skill instructions |
| `.claude/skills/gemini-slide/scripts/create-slide.ts` | Bun script |
| `ψ/lib/oracle-v2/` | Oracle v2 MCP server |
| `ψ/writing/slides/arthur-morgan-complete.html` | Working example |
| `ψ/inbox/focus.md` | Current state |
| `ψ/tmp/mosquitto.conf` | MQTT config backup |

## Technical Notes

### Mosquitto Must Be Running
```bash
# Start manually if needed
"C:/Program Files/mosquitto/mosquitto.exe" -c "C:/Program Files/mosquitto/mosquitto.conf" -v
```

### Oracle v2 Indexed Data
- 33 resonance documents (oracle-morgan.md, oracle.md)
- 7 learning documents
- DB: `~/.oracle-v2/oracle.db`

---
*"I gave you all I had." - Arthur Morgan*
