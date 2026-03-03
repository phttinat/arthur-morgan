# Handoff: CAMT Sub-Room Features & Localization

**Date**: 2026-03-03 18:22
**Context**: ~60%

## What We Did

### Sub-Room Ordering Fix
- Fixed sub-room ordering to sort by `userSceneId` (oldest first)
- Added `SubRoomSortOrder` enum with `OldestFirst` / `NewestFirst` options
- Can now set sorting per-prefab in Inspector

### Sub-Room Counter
- Created `UISubRoomCounter.cs` - displays "ห้องย่อยทั้ง X ห้อง"
- Added `onSubRoomCountChanged` event to `UIUserScenes`
- Supports `LocalizedString` for 2-language support

### Localization Support (Unity Localization)
- `UIUserScene.cs`: Added `localizedSubRoomTitle` field
- `UISubRoomCounter.cs`: Added `localizedFormat` field
- `UIUserScenes.cs`: Added `localizedAllRoomsText` field for "All Rooms" summary
- All with fallback to original behavior if not set

## Pending

- [ ] Wire `onCreate` event → refresh `UIUserScenes` (Option A in Inspector)
- [ ] Add localization to `UISceneObjectContentEntry` for inputLabel
- [ ] Add localization for enum names in `UISceneObjectContentEntry`
- [ ] Test all sub-room features in Unity

## inputLabel List (needs localization)

| Label | Files |
|-------|-------|
| URL | WebViewerObject, TextureViewerObject, ModelViewerObject, MediaPlayerObject |
| Scene Name | TeleportationPortal |
| Position X/Y/Z | TeleportationPortal |
| Y Angle | TeleportationPortal |
| Message | PostItObject |
| Volume | MediaPlayerObject |
| Mute | MediaPlayerObject |
| Min/Max Distance | MediaPlayerObject |
| Location Name | JumpPortal |
| Interact Content Type/Url | CustomContentInteraction |

## Next Session

- [ ] Add `LocalizedString` to `UISceneObjectContentEntry` for label lookup
- [ ] Add enum name localization in `UISceneObjectContentEntry`
- [ ] Test sub-room creation flow with refresh
- [ ] Verify localization works in both Thai and English

## Key Files

```
# Modified
E:/CAMT-Reserve/Assets/Core/Scripts/UI/UserScene/UIUserScenes.cs
E:/CAMT-Reserve/Assets/Core/Scripts/UI/UserScene/UIUserScene.cs
E:/CAMT-Reserve/Assets/Core/Scripts/UI/UserScene/UISubRoomCounter.cs (NEW)

# Related Prefabs
E:/CAMT-Reserve/Assets/_Prefabs/UI/UserRoom/UI-RoomViewer-Panel.prefab
E:/CAMT-Reserve/Assets/_Prefabs/UI/UserRoom/Entry--UserScene-ChildrenRoom.prefab
E:/CAMT-Reserve/Assets/_Prefabs/UI/UserRoom/Entry-Child-Room-AllRooms.prefab
E:/CAMT-Reserve/Assets/_Prefabs/UI/UserRoom/UI--UserSceneManagement.prefab

# For inputLabel localization
E:/CAMT-Reserve/Assets/Core/Scripts/UI/SceneObjectEditor/UISceneObjectContentEntry.cs
```

## Inspector Setup Needed

1. **UI-RoomViewer-Panel** → Content (UIUserScenes):
   - Assign `localizedAllRoomsText`
   - Set `sortOrder` if needed

2. **UI--UserSceneManagement**:
   - Wire `onCreateButtonClick` → open UICreateUserScene
   - Wire `onCreate` → UIUserScenes.ReloadCurrent()

3. **UISubRoomCounter** (if added):
   - Assign `textCount`, `targetUserScenes`, `localizedFormat`
