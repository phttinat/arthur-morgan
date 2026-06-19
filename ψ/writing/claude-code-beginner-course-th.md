# คู่มือเริ่มต้น: สร้าง Oracle ของคุณด้วย Claude Code
## NDF Workshop — Soul-Brews-Studio

**สำหรับ**: มือใหม่สมบูรณ์ — ไม่ต้องมีพื้นฐานโปรแกรมมิ่ง
**สิ่งที่จะได้**: Oracle AI ที่มีชื่อและตัวตนของคุณเอง พร้อมใช้งานได้จริง

---

## Oracle คืออะไร — และทำไมถึงต้องมี GitHub

**Oracle** คือ AI assistant ที่เป็น "ของคุณโดยเฉพาะ" — มันมีชื่อ มีบุคลิก และจำสิ่งที่คุณทำงานด้วยกันได้ ไม่ใช่แค่ AI ทั่วไปที่ลืมทุกอย่างเมื่อปิดหน้าต่าง

**Claude Code** คือโปรแกรมที่ทำให้ Oracle ทำงานบนเครื่องคอมพิวเตอร์ของคุณ — อ่านไฟล์จริง เขียนโค้ดจริง รัน command จริง

**GitHub** คือที่เก็บ "สมองของ Oracle" บน cloud — ข้อมูล ความจำ และตัวตนของ Oracle ทั้งหมดจะถูกเก็บไว้ที่นี่อย่างถาวร ถ้าไม่มี GitHub Oracle จะลืมทุกอย่างเมื่อปิดเครื่อง

---

## ก่อนเริ่ม — สิ่งที่ต้องมี

| สิ่งที่ต้องมี | รายละเอียด |
|---|---|
| เครื่อง Windows | ใช้ CMD (Command Prompt) ได้ |
| อินเทอร์เน็ต | ต่อตลอดระหว่างติดตั้ง |
| Email | สำหรับสมัคร GitHub (ถ้ายังไม่มี account) |
| Script สร้าง Oracle | รับจาก workshop หรือทีม NDF |

> ไม่ต้องติดตั้งอะไรล่วงหน้า — คู่มือนี้จะพา step by step ตั้งแต่ต้น

---

## 5 ขั้นตอน: จากศูนย์สู่ Oracle

---

### ขั้นที่ 1 — ติดตั้ง Claude Code

เปิด **CMD (Command Prompt)** บนเครื่อง Windows ของคุณ

> วิธีเปิด CMD: กด `Windows + R` แล้วพิมพ์ `cmd` แล้วกด Enter

จากนั้นพิมพ์ command นี้แล้วกด Enter:

```
curl -fsSL https://claude.ai/install.cmd -o install.cmd && install.cmd && del install.cmd
```

Command นี้จะดาวน์โหลดและติดตั้ง Claude Code ให้อัตโนมัติ รอจนเสร็จ

**ทำไมถึงใช้ CMD?**
เราติดตั้ง Claude Code ผ่าน CMD เพราะนี่คือ **Claude Code CLI** (Command Line Interface) — รุ่นที่ทำงานได้เต็มที่ อ่านไฟล์ได้ รัน script ได้ และเชื่อมกับ GitHub ได้

> Reference: [code.claude.com/docs/en/quickstart](https://code.claude.com/docs/en/quickstart)

---

### ขั้นที่ 2 — GitHub Login

**GitHub** คือที่เก็บ Oracle brain ของคุณบน cloud — ทุกอย่างที่ Oracle เรียนรู้และจำจะอยู่ที่นี่

**ถ้ายังไม่มี GitHub account:**

1. เปิด browser แล้วไปที่ [github.com](https://github.com)
2. คลิก **Sign up** — กรอก email, username, password
3. ยืนยัน email ที่ได้รับ
4. Login เข้า GitHub

**ถ้ามี GitHub account อยู่แล้ว:**

Login เข้า [github.com](https://github.com) ตามปกติ

> **ทำไม GitHub ถึงสำคัญ?**
> Oracle ของคุณจะมี repository (ห้องเก็บข้อมูล) บน GitHub — ชื่อ memory, บุคลิก และประวัติการทำงานทั้งหมดจะถูก save ที่นั้น ถ้าเปลี่ยนเครื่อง Oracle ก็ยังอยู่

---

### ขั้นที่ 3 — ติดตั้ง Oracle Skills

Oracle Skills คือชุดความสามารถพิเศษที่ทำให้ Claude Code กลายเป็น Oracle — เพิ่มคำสั่งต่าง ๆ เช่น `/learn`, `/recap`, `/rrr` และอื่น ๆ

**ขั้นตอน:**

1. เปิด **Claude Code** (โปรแกรมที่เพิ่งติดตั้งในขั้นที่ 1)
2. ทักทาย AI ก่อนสักหน่อย — บอกว่า "สวัสดี" หรืออะไรก็ได้
3. จากนั้นพิมพ์ prompt นี้ **ใน Claude Code** (ไม่ใช่ใน terminal หรือ CMD):

```
ช่วยลงโปรแกรมนี้หน่อยได้ป่ะ https://github.com/Soul-Brews-Studio/oracle-skills-cli use gh command
```

4. AI จะเริ่มติดตั้ง GitHub CLI และ Oracle Skills ให้คุณ — มันจะมี prompt ให้ login GitHub ผ่าน `gh` ทำตามขั้นตอนที่ AI แนะนำจนครบ
5. เมื่อติดตั้งเสร็จ ให้ตรวจสอบด้วยการพิมพ์ใน Claude Code:

```
/learn
```

ถ้าขึ้น description ของ `/learn` command แสดงว่า Oracle Skills ติดตั้งสำเร็จแล้ว

> **สำคัญมาก**: พิมพ์ prompt ในข้อ 3 **ใน Claude Code** — ไม่ใช่ใน CMD หรือ terminal
> Claude Code จะเป็นคนรัน command ให้คุณเอง คุณไม่ต้องพิมพ์อะไรใน CMD เพิ่มเติม

---

### ขั้นที่ 4 — เรียนรู้จาก Starter Kit

ขั้นนี้ให้ Oracle "อ่าน" ต้นแบบของระบบ Oracle จาก GitHub — เหมือนการให้ AI ศึกษาคู่มือก่อนเริ่มงาน

พิมพ์ใน **Claude Code**:

```
/learn https://github.com/Soul-Brews-Studio/opensource-nat-brain-oracle
```

แล้วรอจนเสร็จ — AI จะอ่านและ save ความเข้าใจเกี่ยวกับ Oracle system ไว้ในตัวมันเอง

> ขั้นนี้อาจใช้เวลา 1-3 นาที ขึ้นอยู่กับ internet ของคุณ อย่าปิดหน้าต่างระหว่างรอ

---

### ขั้นที่ 5 — Generate Oracle

นี่คือ step สุดท้าย — Oracle ของคุณจะมีชีวิต

1. วาง **script ที่ได้รับจาก workshop** ลงใน Claude Code chat

2. AI จะถามคำถาม 4 ข้อตามลำดับ:

| ลำดับ | คำถาม | ตัวอย่าง |
|---|---|---|
| 1 | ชื่อ Oracle ของคุณ | `Arthur Morgan` |
| 2 | ชื่อของคุณ | `Adam Smith` |
| 3 | GitHub username | `phttinat` |
| 4 | ชื่อ repository | `arthur-morgan` |

3. ตอบครบทั้ง 4 ข้อ

**ผลลัพธ์:** Oracle มีชีวิตแล้ว

Claude Code จะสร้าง:
- `CLAUDE.md` — ไฟล์ตัวตนของ Oracle (ชื่อ บุคลิก วัตถุประสงค์)
- `ψ/` — brain structure สำหรับเก็บ memory, sessions, และ knowledge ของ Oracle
- Repository บน GitHub — Oracle brain ของคุณบน cloud

จากนี้ไป Oracle ที่มีชื่อของคุณจะทำงานร่วมกับคุณ — และจำสิ่งที่คุณทำด้วยกัน

---

## สรุปขั้นตอนทั้งหมด

| ขั้นที่ | สิ่งที่ทำ | ทำที่ไหน | เสร็จเมื่อ |
|---|---|---|---|
| 1 | ติดตั้ง Claude Code | CMD | ติดตั้งสำเร็จ ไม่มี error |
| 2 | GitHub Login | Browser | Login เข้า github.com ได้ |
| 3 | ติดตั้ง Oracle Skills | **Claude Code** (chat) | `/learn` ใช้งานได้ |
| 4 | เรียนรู้จาก Starter Kit | **Claude Code** (chat) | `/learn` รันจนเสร็จ |
| 5 | Generate Oracle | **Claude Code** (chat) | ตอบครบ 4 คำถาม — Oracle มีชีวิต |

---

## Reference

- Claude Code Quickstart: [code.claude.com/docs/en/quickstart](https://code.claude.com/docs/en/quickstart)
- Oracle Skills CLI: [github.com/Soul-Brews-Studio/oracle-skills-cli](https://github.com/Soul-Brews-Studio/oracle-skills-cli)
- Oracle Starter Kit: [github.com/Soul-Brews-Studio/opensource-nat-brain-oracle](https://github.com/Soul-Brews-Studio/opensource-nat-brain-oracle)

---

*Hosea Matthews | Documentation*
*"A man who doesn't read has no advantage over a man who can't."*
