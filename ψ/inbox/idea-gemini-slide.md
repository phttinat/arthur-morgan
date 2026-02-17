# Idea: Gemini Slide Skill

> Captured: 2026-02-17

## Concept

สร้าง Skill `/gemini-slide` ที่ส่งคำสั่งไป Gemini ให้สร้าง slides

## Why Gemini?

- Gemini เก่งหารูปภาพสวยๆ
- Gemini ทำหน้าตาให้สวยงามได้ดี
- มี `/gemini` skill อยู่แล้ว (MQTT WebSocket)
- **Gemini Canvas Mode** - โหมดสร้าง slides โดยเฉพาะ!

## Flow

```
/gemini-slide "หัวข้อ"
       ↓
Claude สร้าง prompt
       ↓
เรียก /gemini ส่ง prompt
       ↓
Gemini สร้าง HTML + หารูป
       ↓
ได้ slides!
```

## Output

- HTML file เดียว เปิดใน browser ได้เลย
- Timeline style เหมือน phukhao.buildwithoracle.com/story/
- มี animations, รูปภาพสวยงาม

## Reference

- https://phukhao.buildwithoracle.com/story/

## Status

**DONE** - สร้าง skill แล้ว 2026-02-17

**Location**: `.claude/skills/gemini-slide/SKILL.md`

---

*"I gave you all I had." - Arthur Morgan*
