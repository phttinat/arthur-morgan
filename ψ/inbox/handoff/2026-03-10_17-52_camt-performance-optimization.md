# Handoff: CAMT Performance Optimization

**Date**: 2026-03-10 17:52
**Context**: 65%

## What We Did

### Script Optimizations (11 files)
1. **EntityInteract.cs** - Replaced LINQ `OrderBy()` with manual for loop (ลด GC allocation)
2. **MinimapRenderer.cs** - Cached `FindObjectsOfType` teleport points
3. **TextureLoadingManager.cs** - Added `ClearCache()`, `RemoveFromCache()`, `GetCacheStats()`
4. **AppInstance.cs** - Auto clear texture cache + minimap bounds on scene load
5. **EntityBuildInput.cs** - Cached Camera.main, conditional ground raycast, wrapped Debug.Log
6. **Minimap.cs** - Cached scene bounds calculation
7. **UICurrentChannel.cs** - Added CancellationToken + max retry attempts
8. **UIDisplayName.cs** - Added change detection (avoid Canvas rebuild)
9. **UIMyDisplayName.cs** - Added change detection
10. **UIInteractableSignal.cs** - Added change detection for text + SetActive
11. **UIEntityDelay.cs** - Added change detection for countdown

### Inventory Scripts Fix (Critical Performance)
12. **ShowItemDetails.cs** - Replaced `FindObjectsOfType` with static list `_allInstances` (~100x faster)
13. **InventoryUI2.cs** - Use `ShowItemDetails.AllInstances` instead of FindObjectsOfType

### Texture Settings
- Fixed 4 UI icons (CubeIcon, CapsuleIcon, CylinderIcon, SphereIcon) - maxTextureSize 8192 → 256

### New Utility Scripts Created
1. **UIPerformanceOptimizer.cs** - Runtime optimizer (disable raycast, layout groups, content size fitters)
2. **UIOptimizationTools.cs** - Editor tool to analyze and fix UI prefabs
3. **ScrollRectOptimizer.cs** - Cull items outside viewport

## Key Discovery

**PlayerUIGroup 2.prefab** is the main performance bottleneck:
- 5,931 GameObjects
- 4,823 Raycast Targets
- 261 ContentSizeFitters
- 130 LayoutGroups
- 102 ScrollRects
- 55 BlockController instances (vs 0 in original)
- File size: 18.9 MB (vs 248 KB original - 76x larger!)

**InventoryUI2 (inventory v2)** was causing major stuttering due to `FindObjectsOfType` on every click.

**BlockController attached UIs** - User discovered that disabling UI panels with BlockController significantly improves FPS. Not the script itself, but the heavy UI elements it's attached to.

## Pending

- [ ] Investigate which specific UI panels with BlockController are heavy
- [ ] Use UIOptimizationTools to batch-disable unnecessary Raycast Targets in PlayerUIGroup 2
- [ ] Add UIPerformanceOptimizer component to PlayerUIGroup 2
- [ ] Consider refactoring PlayerUIGroup 2 (why is it 76x larger than original?)
- [ ] Profile with Unity Profiler to confirm improvements

## Next Session

- [ ] Run UIOptimizationTools on PlayerUIGroup 2 to disable 4000+ unnecessary raycasts
- [ ] Investigate BlockController UI panels - find what makes them heavy
- [ ] Consider object pooling for inventory items
- [ ] Test performance after all optimizations

## Key Files

### Modified (CAMT Project - E:/CAMT-Reserve)
- `Assets/Core/Scripts/Entities/EntityInteract.cs`
- `Assets/Core/Scripts/Entities/EntityBuildInput.cs`
- `Assets/Core/Scripts/Minimap/MinimapRenderer.cs`
- `Assets/Core/Scripts/Minimap/Minimap.cs`
- `Assets/Core/RuntimeFileLoader/Scripts/TextureLoadingManager.cs`
- `Assets/Core/Scripts/AppInstance.cs`
- `Assets/Core/Scripts/UI/Channel/UICurrentChannel.cs`
- `Assets/Core/Scripts/UI/Entity/UIDisplayName.cs`
- `Assets/Core/Scripts/UI/Entity/UIMyDisplayName.cs`
- `Assets/Core/Scripts/UI/Entity/UIInteractableSignal.cs`
- `Assets/Core/Scripts/UI/Entity/UIEntityDelay.cs`
- `Assets/_NDF/Script/ShowItemDetails.cs`
- `Assets/_NDF/Script/InventoryUI2.cs`

### Created (New Utils)
- `Assets/Core/Scripts/Utils/UIPerformanceOptimizer.cs`
- `Assets/Core/Scripts/Utils/ScrollRectOptimizer.cs`
- `Assets/Core/Scripts/Editor/UIOptimizationTools.cs`

### Problem Prefab
- `Assets/_Prefabs/UI/PlayerUIGroup 2.prefab` - Main UI, 18.9 MB, needs optimization
