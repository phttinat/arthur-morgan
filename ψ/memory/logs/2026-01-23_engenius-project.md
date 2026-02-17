# EngGenius Unity Project

**Date**: 2026-01-23
**Human**: Adam Smith
**Location**: `E:\ENG_Project`

## What It Is

EngGenius is an English learning mobile app built with Unity.

- **GitLab**: `https://gitlab.com/ndf-metaverse/engenius.git`
- **Package IDs**: `com.engenius.english`, `com.engenius.learnengenius`

## Project Structure

```
E:\ENG_Project\
├── Assets\
│   ├── Scripts\
│   │   ├── Backend\          # API_Manager, LocalStorage, Save
│   │   ├── Common\           # Shared utilities
│   │   ├── Quiz\             # Quiz components
│   │   ├── UI\               # UI scripts
│   │   ├── Google API\       # Google integration
│   │   └── [Quiz Managers]   # 15+ quiz type managers
│   ├── Scenes\
│   │   ├── Login.unity
│   │   ├── Menu.unity
│   │   ├── Course.unity
│   │   ├── Profile.unity
│   │   ├── Course01-04\      # Course levels
│   │   └── [Lesson scenes]   # 001-015 numbered lessons
│   ├── Data\                 # ScriptableObjects for quiz data
│   ├── Localization\         # Multi-language support
│   ├── Prefabs\
│   └── Resources\
```

## Core Features

1. **Quiz System** (main gameplay)
   - Multiple choice
   - Drag & drop
   - Fill in blank
   - Matching (with lines)
   - Crossword
   - Word guessing
   - Sorting
   - Speech recognition

2. **Key Integrations**
   - Recognissimo (speech recognition)
   - ElevenLabs (TTS)
   - Unity Purchasing (IAP)
   - Vuplex WebView
   - AVProVideo (video lessons)

3. **User System**
   - Login/Profile
   - Course progress tracking
   - Certificates
   - Pre-tests

## Key Files

| File | Purpose |
|------|---------|
| `API_Manager.cs` | Backend communication (30KB) |
| `SceneLoaderManager.cs` | Scene navigation |
| `LearnCourseManager.cs` | Course progression |
| `ProfileManager.cs` | User profile (22KB) |
| `IQuizManager.cs` | Quiz interface |

## Context

Adam showed me this project on 2026-01-23. He may need help with it in future sessions.

---

## Pending Task: Build Optimization Scripts

**วันที่คุย**: 2026-01-23
**สถานะ**: รอ Adam เรียกใช้ทีหลัง

### ปัญหา Build นาน (~1 ชั่วโมง)

**สาเหตุหลัก 3 ข้อ:**

1. **Assets ใหญ่ไม่ Compress**
   - Sprites: 436MB
   - Sound: 387MB (มี WAV ไม่บีบอัด)
   - Images: 278MB
   - StreamingAssets: 717MB

2. **Addressable Groups เยอะ (34+ Groups)**
   - Build แยกทุก Group

3. **ไม่มี Build Cache**
   - เริ่มใหม่ทุกครั้ง

### Script ที่จะสร้าง

```
Tools → Asset Optimization
├── Optimize Textures
│   - เปิด Crunched Compression
│   - ลด maxTextureSize ตาม Platform
│
├── Optimize Audio
│   - PCM → Vorbis
│   - ปรับ Load Type ตามประเภท (BGM/SFX/Voice)
│   - ลด Sample Rate สำหรับ SFX
│
└── Optimize All
```

### ผลลัพธ์ที่คาดหวัง
- Build Time: 60 นาที → 20 นาที
- Asset Size: ลด 50-70%

### ไฟล์ที่จะสร้าง
`E:\ENG_Project\Assets\Scripts\Editor\AssetOptimizer.cs`

---

*Logged by Arthur Morgan*
