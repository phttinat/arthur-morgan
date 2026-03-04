# Handoff: CAMT Upload Debugging & Google Play Fixes

**Date**: 2026-03-04 02:00
**Context**: ~40%

## What We Did

### 1. Google Play - Photo/Video Permissions ✅
- Updated **NativeGallery** to v1.9.2 (supports Photo Picker)
- Removed `READ_MEDIA_IMAGES` from AndroidManifest.xml
- No permission needed - uses system Photo Picker

### 2. UIUserContentUploader.cs - Upload Fixes ✅
- Added iOS image naming: `{timestamp}_IMG_{player}.png` (fixed "filemedia1" issue)
- Force `.png` extension for iOS images (HEIC → PNG conversion)
- Added `NativeGallery.LoadImageAtPath()` for mobile image loading
- Added fallback `File.ReadAllBytes()` when `FileBrowserHelpers` fails
- Added **validation** for empty bytes before upload
- Added **debug logs** with `[Upload]` prefix throughout

### 3. Debug Logs Added
```
[Upload] [1/1] Processing: filename.png (ext: .png, path: /path)
[Upload] FileBrowserHelpers read 123456 bytes
[Upload] Loading image via NativeGallery: /path
[Upload] Texture loaded: 1920x1080
[Upload] Image encoded to PNG: 234567 bytes
[Upload] Starting upload: filename.png (234567 bytes, thumbnail: 12345 bytes)
[Upload] Success: filename.png
```

### 4. Found New Issue - TextureLoadingManager NullReferenceException
- Error occurs AFTER upload success
- `RuntimeFileLoader.TextureLoadingManager.GetSprite()` tries to set sprite on destroyed Image
- Async callback invoked after UI object destroyed
- **Not in upload code** - in content display code

## Pending

### High Priority
- [ ] Fix `TextureLoadingManager` NullReferenceException (add null check in callback callers)
- [ ] Test video upload on iOS (verify bytes read correctly)
- [ ] Verify upload works consistently after fixes

### Medium Priority - 16 KB Page Size
- [ ] Contact RenderHeads for AVProVideo update (v2.9.3 → need 16KB support)
- [ ] Update OpenCVForUnity
- [ ] Update TriLib
- [ ] Update Vuplex WebView

### Low Priority - Localization
- [ ] Decide SceneObject label localization approach (Option A vs B)
- [ ] Ask Dev about double localization in MediaOrTextureObject

### Nice to Have - iOS Build Automation
- [ ] Create PostProcessBuild script for:
  - Auto-add Photos.framework
  - Auto-add Apple Sign In capability
  - Auto-create Podfile with Facebook SDK

## Key Files Modified

```
# Upload System
E:/CAMT-Reserve/Assets/Core/Scripts/UI/UserContent/UIUserContentUploader.cs
E:/CAMT-Reserve/Assets/Plugins/Android/AndroidManifest.xml

# Localization (from earlier)
E:/CAMT-Reserve/Assets/Core/Scripts/UI/UserScene/UIUserScene.cs
E:/CAMT-Reserve/Assets/Core/Scripts/UI/SceneObjectEditor/UISceneObjectContentEntry.cs

# NativeGallery
E:/CAMT-Reserve/Assets/Core/Plugins/NativeGallery/ (updated to v1.9.2)
```

## Key Files to Investigate

```
# NullReferenceException source
E:/CAMT-Reserve/Assets/Core/RuntimeFileLoader/Scripts/TextureLoadingManager.cs

# Code that calls GetSprite (need to find and add null checks)
# Search for: TextureLoadingManager.GetSprite
```

## Notes

| Item | Status |
|------|--------|
| MCP (Unity) | ไม่ทำงาน |
| String Table | `LocalizedTables` |
| AVProVideo | v2.9.3 (หายจาก Asset Store) |
| NativeGallery | v1.9.2 ✅ |
| EDM4U Error | "Insecure connection not allowed" - ปิด auto-update |

## Test Results (from log screenshot)

```
✅ [Upload] Starting upload: 1000004927.jpg (2055536 bytes)
✅ [Upload] Success: 1000004927.jpg
✅ [Upload] FileBrowserHelpers read 1258888 bytes (video)
❌ NullReferenceException in TextureLoadingManager (after upload)
```
