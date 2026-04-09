# Handoff: CAMT Admin Login Setup

**Date**: 2026-04-09 11:41
**Context**: 85%

## What We Did
- สำรวจโปรเจกต์ `E:/verse-admin-camt` — Angular 13 Admin Panel สำหรับระบบโรงภาพยนตร์ CAMT
- ติดตั้ง dependencies ด้วย `npm install --legacy-peer-deps` (มี peer conflict ระหว่าง @angular/flex-layout กับ @angular/cdk)
- รัน frontend dev server ด้วย `ng serve --configuration camt-dev` (ชี้ไปที่ `https://api-dev-meta.camt.cmu.ac.th/api/`)
- ค้นหา admin account ผ่าน Lens (Kubernetes IDE) → เข้า Pod Shell ของ `backend-api-db-mysql-0`
- Query MySQL database `verse_sys` พบ admin account: `verseadmin-dev@camt.cmu.ac.th`
- Reset password ของ account นั้นเป็น `password` ผ่าน bcrypt hash โดยตรงใน DB
- Login สำเร็จ

## Pending
- [ ] เปลี่ยน password จาก `password` เป็นอะไรที่ปลอดภัยกว่า
- [ ] ศึกษา features ใน verse-admin-camt ว่าใช้งานอะไรได้บ้าง

## Next Session
- [ ] สำรวจ Dashboard และ modules ใน verse-admin-camt
- [ ] ตรวจสอบว่า backend `E:/backend-api-camt` สามารถรัน local ได้ไหม (ต้องมี .env)

## Key Files
- `E:/verse-admin-camt/src/environments/environment.camt-dev.ts` — API URL config
- `E:/backend-api-camt/public/database/seeds/AdminUserSeeder.php` — Seeder (ว่างเปล่า)
- `E:/backend-api-camt/public/app/Http/Controllers/Api/User/LoginController.php` — Login logic
