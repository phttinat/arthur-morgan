# EngGenius APK Optimization Session

**Date**: 2026-02-12 → 2026-02-13
**Human**: Adam Smith
**Status**: COMPLETED

## Final Result: 903 MB → 397 MB (-56%)

---

## สรุปสิ่งที่ทำวันนี้

### ปัญหา
APK version 1.2.8 มีขนาด 903 MB (ใหญ่เกินไป)

### สาเหตุหลัก
- Textures: 921.2 MB (85.8% ของ APK)
- Bird Mascot Sprite Animation หลาย frame (ต้องเก็บไว้ offline)
- Addressables: 751 MB

### สิ่งที่ Adam ทำไปแล้ว
- Optimize textures บางส่วน
- **ผลลัพธ์:**
  - Textures: 921.2 MB → 591.0 MB (ลด 330 MB)
  - Total User Assets: 1.0 GB → 743.7 MB (ลด 300 MB)
  - APK: 903 MB → 894 MB (ลดแค่ 9 MB)

### ปัญหาที่เหลือ
**APK ลดแค่ 9 MB ทั้งที่ Textures ลดไป 330 MB**
- Complete build size ยังเป็น 2.7 GB
- **Addressables ยังไม่ได้ rebuild!**

---

## TODO พรุ่งนี้

### 1. Rebuild Addressables
```
Window → Asset Management → Addressables → Groups → Build → New Build → Default Build Script
```
แล้ว build APK ใหม่

### 2. รูปที่ยังไม่ได้ optimize (ถ้าต้องการลดเพิ่ม)

| หมวด | ขนาด | Action |
|------|------|--------|
| Example/Test files | ~24 MB | ลบได้เลย |
| Third-party ไม่ใช้ | ~6 MB | ลบได้เลย |
| Letter Tracing (Cap dots) | ~47 MB | Compress |
| English Tracing Book | ~100 MB | Compress |
| Character Mascots (Lisa, Sam, etc.) | ~65 MB | Compress |

### 3. Files ที่ลบได้ทันที
```
Assets/Sprites/Examplae/UI_FillinTheBlank-04.jpg (5.9 MB)
Assets/Sprites/Examplae/UI_FillinTheBlank-05.jpg (5.9 MB)
Assets/Sprites/Examplae/UI_FillinTheBlank-06.jpg (5.9 MB)
Assets/Vuplex/WebView/Core/Textures/TrialExpiredTexture.png (2.7 MB)
```

---

## Key Files

- **Project**: `E:\ENG_Project`
- **APK Output**: `D:\ENG\Build\1.2.8.apk`
- **Editor Log**: `C:\Users\Lenovo\AppData\Local\Unity\Editor\Editor.log`

---

---

## Session 2 (2026-02-13)

### ปัญหาที่เจอ
หลัง rebuild Addressables แล้ว APK กลับใหญ่ขึ้น: 894 MB → 918 MB

### การวิเคราะห์
พบว่า **StreamingAssets** คือตัวการหลัก (717 MB):

| Content | Size | Required? |
|---------|------|-----------|
| LanguageModels (5 ภาษา) | 372 MB | แค่ en-US |
| Videos | 344 MB | Compress ได้ |

### สิ่งที่ทำ

1. **ลบ LanguageModels ที่ไม่ใช้** (-304 MB)
   - ลบ: de-DE (92 MB), ru-RU (88 MB), fr-FR (66 MB), es-ES (58 MB)
   - เก็บ: en-US (68 MB)

2. **Adam compress Videos** (-163 MB)
   - 344 MB → 181 MB

### ผลลัพธ์สุดท้าย

| Metric | Before | After |
|--------|--------|-------|
| APK | 903 MB | **397 MB** |
| StreamingAssets | 717 MB | 216 MB |
| Total Saved | - | **506 MB (56%)** |

### Key Learning
- Addressables ไม่ใช่ปัญหา (configured correctly เป็น Remote)
- StreamingAssets เข้า APK โดยตรง 100%
- LanguageModels มีภาษาที่ไม่ใช้รวมอยู่ - ลบได้เลย

---

*Logged by Arthur Morgan*
