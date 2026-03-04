# Handoff: CAMT Google Play Store Fixes

**Date**: 2026-03-04 00:30
**Context**: ~80%

## Session Summary

Session นี้แก้ 2 ปัญหาหลักจาก Google Play Store:
1. Photo/Video Permissions - **แก้แล้ว ✅**
2. 16 KB Page Size - **ยังไม่แก้ ⚠️**

---

## 1. Photo/Video Permissions ✅ (แก้แล้ว)

### ปัญหา
Google Play reject: "Invalid use of the photo and video permissions"
- App ใช้ `READ_MEDIA_IMAGES` permission
- Google ต้องการให้ใช้ System Photo Picker แทน

### สาเหตุ
- `NativeGallery` version เก่าต้องขอ permission
- Code ใน `UIUserContentUploader.cs` ใช้ `NativeGallery.GetImagesFromGallery()` และ `GetVideosFromGallery()`

### วิธีแก้
1. **Updated NativeGallery** → v1.9.2 (รองรับ Photo Picker)
2. **ลบ permission** จาก AndroidManifest.xml:
   ```xml
   <!-- ลบบรรทัดนี้ -->
   <uses-permission android:name="android.permission.READ_MEDIA_IMAGES" />
   ```

### Files Modified
```
E:/CAMT-Reserve/Assets/Plugins/Android/AndroidManifest.xml
E:/CAMT-Reserve/Assets/Core/Plugins/NativeGallery/ (updated to v1.9.2)
```

### ต้องทดสอบ (5 นาที)
- [ ] เลือกรูป 1 รูป upload
- [ ] เลือกวิดีโอ 1 ไฟล์ upload

---

## 2. 16 KB Page Size ⚠️ (ยังไม่แก้)

### ปัญหา
Google Play reject: "Your app does not support 16 KB memory page sizes"

### สาเหตุ
Native libraries (.so files) ต้อง compile ใหม่ให้รองรับ 16 KB

### Plugins ที่มีปัญหา

| Plugin | Version | สถานะ |
|--------|---------|-------|
| **AVProVideo** | 2.9.3 | ❌ ต้อง update - แต่หายจาก Asset Store แล้ว |
| **OpenCVForUnity** | - | ❌ ต้องเช็ค update |
| **TriLib (Draco)** | - | ❌ ต้องเช็ค update |
| **Vuplex WebView** | - | ❌ ต้องเช็ค update |

### AVProVideo Issue
- Version 2.9.3 เก่าเกินไป
- Plugin หายจาก Asset Store (ต้องซื้อใหม่)
- **แนะนำ**: ติดต่อ RenderHeads (support@renderheads.com) ขอ upgrade path

### Next Steps
1. ติดต่อ RenderHeads เรื่อง AVProVideo
2. เช็ค update ของ OpenCV, TriLib, Vuplex ใน Asset Store
3. ถ้า update ไม่ได้ อาจต้อง target API 34 ชั่วคราว (ไม่ใช่ทางออกระยะยาว)

---

## 3. Localization (จาก session ก่อน)

### แก้แล้ว ✅
- `UIUserScene.cs` - เพิ่ม `localizedMainRoomLabel`, `localizedSubRoomLabel`
- `UIUserScenes.cs` - แก้ All Rooms text ให้ใช้ localization

### ยังไม่แก้ ⚠️
- `UISceneObjectContentEntry.cs` - มี double localization issue
- ต้องถาม Dev ว่าจะ:
  - **A**: Revert และให้ SceneObject localize เอง
  - **B**: ลบ localization จาก MediaOrTextureObject แล้ว localize ที่ UISceneObjectContentEntry ที่เดียว

---

## Notes

| หัวข้อ | รายละเอียด |
|--------|------------|
| String Table | `LocalizedTables` |
| MCP (Unity) | ใช้งานไม่ได้ |
| Unity Version | 6.2 |

---

## Key Files Reference

```
# Google Play Fixes
E:/CAMT-Reserve/Assets/Plugins/Android/AndroidManifest.xml
E:/CAMT-Reserve/Assets/Core/Plugins/NativeGallery/

# Native Libraries (16KB issue)
E:/CAMT-Reserve/Assets/Core/AVProVideo/
E:/CAMT-Reserve/Assets/OpenCVForUnity/
E:/CAMT-Reserve/Assets/Core/TriLib/
E:/CAMT-Reserve/Assets/Core/Vuplex/

# Upload System
E:/CAMT-Reserve/Assets/Core/Scripts/UI/UserContent/UIUserContentUploader.cs

# Localization
E:/CAMT-Reserve/Assets/Core/Scripts/UI/UserScene/UIUserScene.cs
E:/CAMT-Reserve/Assets/Core/Scripts/UI/SceneObjectEditor/UISceneObjectContentEntry.cs
```

---

## Priority for Next Session

1. **สูง**: ทดสอบ upload รูป/วิดีโอ หลังแก้ NativeGallery
2. **สูง**: แก้ 16 KB page size (ติดต่อ RenderHeads, update plugins)
3. **ปานกลาง**: ตัดสินใจเรื่อง SceneObject label localization
