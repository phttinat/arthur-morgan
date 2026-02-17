---
name: gemini-slide
description: v1.0.0 | สร้าง HTML slides โดยคุยกับ Gemini. Use when user says "สร้าง slide", "make slides", "presentation", "gemini slide"
argument-hint: [หัวข้อ]
disable-model-invocation: true
---

# /gemini-slide - Create Slides with Gemini

สร้าง HTML slides สวยๆ โดยใช้ Gemini เป็น designer + image finder

## Usage

```bash
/gemini-slide <topic>
/gemini-slide "Arthur Morgan" 5 slides
/gemini-slide "5 Principles of Oracle Philosophy"
```

## Script

```bash
bun ~/.claude/skills/gemini-slide/scripts/create-slide.ts "<topic>"
```

Or for project-local skill:

```bash
bun .claude/skills/gemini-slide/scripts/create-slide.ts "<topic>"
```

## Workflow

1. Create new Gemini tab
2. Send slide prompt with requirements
3. Wait for Gemini to generate
4. Extract HTML from response
5. Save to `ψ/writing/slides/[topic]-[timestamp].html`

## Requirements

- MQTT broker running (`mosquitto`)
- Claude Browser Proxy extension installed and connected (green badge)
- Gemini tab access

## MQTT Commands Used

| Step | Action | Command |
|------|--------|---------|
| 1 | New tab | `create_tab` with gemini.google.com |
| 2 | Send prompt | `chat` with slide requirements |
| 3 | Wait | `wait_response` timeout 120s |
| 4 | Get answer | Subscribe to `claude/browser/answer` |

## Output

```
ψ/writing/slides/[topic-slug]-[YYYYMMDDHHMM].html
```

## Example

```
/gemini-slide "Arthur Morgan from RDR2"

🎨 Creating Slides: Arthur Morgan from RDR2

1️⃣ Creating new Gemini tab...
   ✓ Tab created
2️⃣ Sending slide prompt...
   ✓ Prompt sent
3️⃣ Waiting for Gemini to generate slides...
   ✓ Generation complete
4️⃣ Getting response...
5️⃣ Extracting HTML...
   ✓ Saved to: ψ/writing/slides/arthur-morgan-202602171430.html

🎉 Slide Created!
```
