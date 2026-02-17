# Read The World Admin

> Last Updated: 2026-02-13

## Overview
- **Location**: `E:\read-the-world-admin`
- **Repo**: https://github.com/poomxchapon/read-the-world-admin.git
- **Purpose**: CMS สำหรับ Read The World Unity App

## Tech Stack
- Next.js 16 + Turbopack
- MySQL + Prisma ORM
- Tailwind CSS
- JWT Authentication
- Docker

## Integration
- ใช้ร่วมกับ **Engenius-Backend** (`E:\Engenius-Backend`)
- Share MySQL database `teach_media`
- Docker network: `engenius-network`
- Port: 3000 (Read The World) / 3002 (Engenius)

## API Endpoints
- Admin: `/api/read-the-world/*`
- Unity App: `/api/v1/app/readtheworld/*`

## Deployment Status
- ✅ README ละเอียดพร้อม Deploy
- ✅ Git clean, pushed to origin/master
- ✅ docker-compose.prod.yml พร้อมใช้

## Login
- Email: `admin@mail`
- Password: `admin@Pass`
