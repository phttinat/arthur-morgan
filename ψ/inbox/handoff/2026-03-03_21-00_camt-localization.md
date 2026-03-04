# Handoff: CAMT Localization Session

**Date**: 2026-03-03 21:00
**Context**: ~70%

## What We Did

### 1. UIUserScenes - All Rooms Localization (Fixed)
- ปัญหา: `Entry-Child-Room-AllRooms` ไม่เปลี่ยนภาษา
- สาเหตุ: `localizedAllRoomsText` ต้อง assign บน **UIUserScenes component** ที่เป็น parent (ไม่ใช่บน prefab เอง)
- แก้ไข: Assign `localizedAllRoomsText` บน `Bottom-Subroom` ใน `Entry--UserScene-ChildrenRoom` prefab

### 2. UIUserScene - Room Header Labels Localization (Done)
เพิ่ม fields ใหม่:
```csharp
public LocalizedString localizedMainRoomLabel;  // สำหรับ "ห้องหลัก {0}"
public LocalizedString localizedSubRoomLabel;   // สำหรับ "ห้องย่อย {0}"
```
- ถ้า assign → ใช้ localized version
- ถ้าไม่ assign → fallback ใช้ format string เดิม

### 3. UISceneObjectContentEntry - Label Localization (Pending Issue)
เพิ่ม localization สำหรับ inputLabel:
```csharp
private const string LocalizationTable = "LocalizedTables";
private const string LabelKeyPrefix = "scene_object.label.";

// Key format: "Min Distance" → "scene_object.label.min_distance"
textLabel.text = GetLocalizedLabel(definition.inputLabel);
```

## Pending Issue - Double Localization

**ปัญหา:**
- `MediaOrTextureObject.cs` ใช้ `LanguageManager` localize label แล้ว (return "ลิงค์")
- `UISceneObjectContentEntry.cs` พยายาม localize อีกรอบ
- Error: `No translation found for 'scene_object.label.ลิงค์'`

**SceneObject ที่ localize แล้ว:**
- `MediaOrTextureObject.cs` ✅ (ใช้ LanguageManager)

**SceneObject ที่ยัง hardcode English:**
- `MediaPlayerObject.cs`
- `ModelViewerObject.cs`
- `TextureViewerObject.cs`
- `WebViewerObject.cs`
- `PostItObject.cs`
- `TeleportationPortal.cs`
- `JumpPortal.cs`
- `CustomContentInteraction.cs`

**ทางเลือก (รอถาม Dev):**
- **A**: Revert UISceneObjectContentEntry → ใช้ label ตรงๆ (ให้ SceneObject จัดการ localize เอง)
- **B**: ลบ localization จาก MediaOrTextureObject → ให้ UISceneObjectContentEntry localize ที่เดียว

## Notes

| หัวข้อ | รายละเอียด |
|--------|------------|
| String Table | `LocalizedTables` |
| MCP (Unity) | ใช้งานไม่ได้ session นี้ |

## Files Modified

```
E:/CAMT-Reserve/Assets/Core/Scripts/UI/UserScene/UIUserScene.cs
E:/CAMT-Reserve/Assets/Core/Scripts/UI/SceneObjectEditor/UISceneObjectContentEntry.cs
```

## Next Session

- [ ] ถาม Dev เรื่อง double localization → เลือก Option A หรือ B
- [ ] ถ้าเลือก B: แก้ MediaOrTextureObject.cs ให้ใช้ English label
- [ ] เพิ่ม keys ใน String Table `LocalizedTables`
- [ ] Test localization ใน Unity

## Key Files Reference

```
# Localization
E:/CAMT-Reserve/Assets/Core/Scripts/UI/SceneObjectEditor/UISceneObjectContentEntry.cs
E:/CAMT-Reserve/Assets/Core/Scripts/Interactables/MediaOrTextureObject.cs

# Room Labels
E:/CAMT-Reserve/Assets/Core/Scripts/UI/UserScene/UIUserScene.cs
E:/CAMT-Reserve/Assets/Core/Scripts/UI/UserScene/UIUserScenes.cs

# Prefabs
E:/CAMT-Reserve/Assets/_Prefabs/UI/UserRoom/Entry--UserScene-ChildrenRoom.prefab
```
