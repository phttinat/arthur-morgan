# Handoff: CAMT TextureLoadingManager NullRef Fixes

**Date**: 2026-03-04 23:01
**Context**: 35%

## What We Did

### Identified NullRef Issue
- Found root cause: async callbacks firing after MonoBehaviour destroyed
- Located all 9 call sites using `TextureLoadingManager.GetSprite()` and `GetTexture()`

### Fixed 2 Files (Callback Pattern)
- `UIUserContent.cs:80` - Added null check in GetSprite callback
- `UIPreviewUserContent.cs:199` - Added null check in GetSprite callback

## Pending

### High Priority - Remaining NullRef Fixes
- [ ] `UISceneTemplateCategory.cs` - LoadImages (lines 61, 85)
- [ ] `UISceneTemplate.cs` - LoadImages (lines 95, 119)
- [ ] `UIJoinedUser.cs` - LoadProfileImage (line 107)
- [ ] `TextureViewerObject.cs` - UpdateUrl (line 115)
- [ ] `UIPlayerEntry.cs` - Setup (line 40)
- [ ] `UILeaderboardEntry.cs` - Setup (line 31)
- [ ] `UIMyProfileImage.cs` - LoadProfileImage (line 23)

### From Previous Handoff
- [ ] Verify upload works on iOS/Android
- [ ] 16 KB Page Size - Contact vendors
- [ ] Localization decisions
- [ ] iOS Build Automation (iOSPostProcessBuild.cs)

## Next Session

1. **ถาม user** ว่าต้องการแก้ทุกไฟล์ หรือแค่ไฟล์ที่เกี่ยวกับ UserContent
2. **Apply fixes** ด้วย pattern:
   ```csharp
   // For await pattern
   var texture = await TextureLoadingManager.GetTexture(url);
   if (this == null) return;
   ```
3. **Test** ใน Unity Editor ว่า compile ผ่าน
4. **Continue** กับ upload testing หรือ iOS automation

## Key Files

```
# Already Fixed
E:/CAMT-Reserve/Assets/Core/Scripts/UI/UserContent/UIUserContent.cs
E:/CAMT-Reserve/Assets/Core/Scripts/UI/UserContent/UIPreviewUserContent.cs

# To Fix (await pattern)
E:/CAMT-Reserve/Assets/Core/Scripts/UI/UserScene/UISceneTemplateCategory.cs
E:/CAMT-Reserve/Assets/Core/Scripts/UI/UserScene/UISceneTemplate.cs
E:/CAMT-Reserve/Assets/Core/Scripts/UI/User/UIJoinedUser.cs
E:/CAMT-Reserve/Assets/Core/Scripts/Interactables/TextureViewerObject.cs
E:/CAMT-Reserve/Assets/Core/Scripts/UI/Players/UIPlayerEntry.cs
E:/CAMT-Reserve/Assets/Core/Scripts/UI/Leaderboard/UILeaderboardEntry.cs
E:/CAMT-Reserve/Assets/Core/Scripts/UI/Entity/UIMyProfileImage.cs
```

## Fix Pattern Reference

```csharp
// Callback pattern (already applied to 2 files)
TextureLoadingManager.GetSprite(url, sprite =>
{
    if (this == null) return;
    imageThumbnail.sprite = sprite;
});

// Await pattern (remaining 7 files)
var texture = await TextureLoadingManager.GetTexture(url);
if (this == null) return;
image.texture = texture;
```

## Notes

- User หยุดก่อนที่จะ apply fixes ทั้งหมด ต้องการ review ก่อน
- Previous handoff: `ψ/inbox/handoff/2026-03-04_02-00_camt-upload-debugging.md`
