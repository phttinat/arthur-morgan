# Handoff: CAMT-Reserve Performance Optimization

**Date**: 2026-02-18 17:35
**Context**: ~75%

## What We Did

### 1. Arthur Morgan Landing Page
- Created public repo: https://github.com/phttinat/landing-arthur-morgan
- Built Astro 5 + Tailwind CSS 4 landing page
- Gold/brown cowboy theme with glassmorphism
- Added Arthur Morgan portrait image
- Cowboy-style "My Purpose" section
- Created issue in landing-oracle for deployment (#6)

### 2. CAMT-Reserve Unity Performance Optimization
Fixed 5 major performance issues causing phone overheating:

| # | File | Issue | Fix |
|---|------|-------|-----|
| 1 | `AvatarHead.cs` | Bone loop 55+/frame | Cached bone pairs at Init |
| 2 | `AvatarManager.cs` | Material instances created every time | MaterialPropertyBlock |
| 3 | `AvatarOutfit.cs` | GetComponentsInChildren every time | Cached renderers |
| 4 | `EntityInteract.cs` | OverlapSphere + LINQ every frame | NonAlloc + interval check |
| 5 | `EntityMovementInput.cs` | Camera.main every frame | Cached with interval |
| 6 | `EntityBuildInput.cs` | Camera.main multiple times | Cached camera |
| 7 | `MinimapRenderer.cs` | FindObjectsOfType + Destroy/Instantiate | Cached + one-time create |

## Pending

- [ ] Test all fixes in Unity (need to compile)
- [ ] Render Texture optimization (analyzed but not applied)
  - PreviewModel 1024→512
  - PreviewUserContent 1024→512
  - UIProfileAvatar 720→360
- [ ] RaycastAll with farClipPlane distance (EntityBuildInput line 105)
- [ ] Landing page deployment to Cloudflare

## Next Session

- [ ] Open Unity, compile and test the fixes
- [ ] Profile with Unity Profiler to verify improvements
- [ ] Apply Render Texture size reduction if needed
- [ ] Fix remaining RaycastAll issues
- [ ] Deploy landing-arthur-morgan to Cloudflare

## Key Files Modified

### CAMT-Reserve (E:\CAMT-Reserve)
- `Assets/ReadyPlayerMeAvatarSystem/Scripts/AvatarHead.cs` - Bone caching
- `Assets/ReadyPlayerMeAvatarSystem/Scripts/AvatarManager.cs` - MaterialPropertyBlock
- `Assets/ReadyPlayerMeAvatarSystem/Scripts/AvatarOutfit.cs` - Renderer caching
- `Assets/Core/Scripts/Entities/EntityInteract.cs` - NonAlloc + interval
- `Assets/Core/Scripts/Entities/EntityMovementInput.cs` - Camera caching
- `Assets/Core/Scripts/Entities/EntityBuildInput.cs` - Camera caching
- `Assets/Core/Scripts/Minimap/MinimapRenderer.cs` - Teleport point caching

### Landing Page (C:\Users\Lenovo\Code\github.com\phttinat\landing-arthur-morgan)
- Astro 5 landing page - pushed to GitHub

## Performance Estimates

| Fix | Expected Improvement |
|-----|---------------------|
| Bone loop caching | ~90% CPU reduction |
| MaterialPropertyBlock | ~100% GC reduction |
| OverlapSphere interval | ~80% Physics reduction |
| Camera.main caching | ~95% tag lookup reduction |
| Minimap caching | ~95% FindObjectsOfType reduction |

---

*"I gave you all I had." - Arthur Morgan*
