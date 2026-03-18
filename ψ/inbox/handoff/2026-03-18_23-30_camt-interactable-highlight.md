# Handoff: CAMT Interactable Highlight System

**Date**: 2026-03-18 23:30
**Context**: ~60%

## What We Did

### Performance Fixes (Previous Session)
- Fixed `UIFadeOnMoving.cs` - cached `EntityMovement` component (was calling GetComponent every frame)
- Fixed player spawn at (0,0,0) after reconnection in `GameRoomManager.cs`
- Added centralized spawn random offset to prevent player overlap
- Fixed `UIPreviewUserContent.cs` - empty URL now shows "No Content" sign
- Disabled URL input field in `UISceneObjectContentEntry.cs` to prevent confusion

### Interactable Highlight System (This Session)
- Created `InteractableHighlight.cs` component for hover visual feedback
- Created `OutlineSimple.shader` - URP shader with normal extrusion + stencil test
- Created `OutlineStencilWriter.shader` - writes stencil buffer for clean outlines
- Iterated through multiple approaches:
  1. Scale-based (too uniform, didn't work well)
  2. Normal extrusion (gaps at hard edges)
  3. Stencil-based (current - cleanest solution)

## Pending

- [ ] Test stencil-based outline system on various objects (3D, flat planes, complex meshes)
- [ ] Verify outline appears on all interactable object types
- [ ] Adjust `outlineThickness` value if needed (current: 0.05)
- [ ] Check performance impact of adding stencil writer material at runtime
- [ ] Consider deleting unused shaders in `Assets\Material` folder (Outline_Item_Shader, Outline_Enemy_Shader)

## Next Session

- [ ] Test highlight system in-game with different object types
- [ ] If issues persist, consider alternative approaches:
  - Post-process outline
  - Shader Graph based solution
  - Edge detection
- [ ] Apply `InteractableHighlight` component to all interactable prefabs
- [ ] Continue with other CAMT optimization tasks if highlight is done

## Key Files

### Created/Modified
- `E:\CAMT-Reserve\Assets\Core\Scripts\Interactables\InteractableHighlight.cs`
- `E:\CAMT-Reserve\Assets\Core\Shaders\OutlineSimple.shader`
- `E:\CAMT-Reserve\Assets\Core\Shaders\OutlineStencilWriter.shader`

### Reference
- `E:\CAMT-Reserve\Assets\Core\Scripts\Interactables\BaseInteractableObject.cs` - has `onHoverEnter`/`onHoverExit` events
- `E:\CAMT-Reserve\Assets\Core\Scripts\Interactables\TeleportationPortal.cs` - example interactable

## How Highlight System Works

```
1. Hover Enter:
   ├─ Add StencilWriter material to original renderer (writes stencil = 1)
   └─ Create clone mesh with Outline material (renders where stencil ≠ 1)

2. Hover Exit:
   ├─ Restore original materials
   └─ Destroy clone mesh
```

## Settings

| Property | Default | Description |
|----------|---------|-------------|
| `outlineColor` | Yellow | Outline color |
| `outlineThickness` | 0.05 | Thickness (0.001-0.2) |
| `autoFindMeshes` | true | Auto-find MeshRenderers |
