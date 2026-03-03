# Handoff: Unity MCP Setup

**Date**: 2026-02-24 10:55 GMT+7
**From**: Arthur Morgan (Opus 4.5)
**To**: Next Session

---

## What We Did

### 1. ติดตั้ง uv + Python
- ✅ **uv 0.10.4** ติดตั้งที่ `C:\Users\Lenovo\.local\bin\`
- ✅ **Python 3.12.12** ติดตั้งผ่าน uv
- ✅ **Python 3.11.1** เพิ่มลง System PATH แล้ว
  - Path: `C:\Users\Lenovo\AppData\Local\Programs\Python\Python311`

### 2. Unity MCP Status
- ✅ CoPlay MCP package ติดตั้งใน Unity (CAMT-Reserve project)
- ✅ MCP window เปิดได้ (Ctrl+Shift+M)
- ✅ **uv** = 🟢 เขียว
- ❌ **Python** = ยังไม่เจอ (แม้จะอยู่ใน System PATH แล้ว)

### 3. สิ่งที่ทำไปแล้ว
- สร้าง symlink python.exe → ต้องใช้ Admin แต่ Python ต้องการ DLLs ด้วย
- เพิ่ม Python311 ลง System PATH ด้วย Admin script
- `uv python find` → เห็น Python แล้ว

---

## Next Steps

1. **Restart Computer** — ให้ System PATH ใหม่ทำงาน
2. เปิด Unity → Window → MCP for Unity
3. เช็คว่า Python เป็น 🟢 หรือยัง
4. ถ้ายังไม่ได้ ลองกด "Open Install Instructions" หรือ "HELP" ใน MCP window

---

## Goal

สร้าง Cube ใน Unity scene ผ่าน MCP command:
```
Create a Cube GameObject in the current scene and set its scale to (10, 10, 10)
```

---

## Files Created
- `C:\Users\Lenovo\.local\bin\python.cmd` — wrapper script
- `C:\Users\Lenovo\.local\bin\python3.cmd` — wrapper script
- `C:\Users\Lenovo\.local\bin\add-python-path.ps1` — admin script เพิ่ม PATH
