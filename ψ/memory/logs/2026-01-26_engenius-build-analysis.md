# EngGenius Build Time Analysis

**Date**: 2026-01-26
**Project**: E:\ENG_Project
**Goal**: ลด Build time จาก ~100 นาที เหลือ ~20 นาที

---

## สรุปการวิเคราะห์

### Build Time Breakdown (ที่พบ)

| Phase | เวลา | หมายเหตุ |
|-------|------|----------|
| **Addressables Build** | 20-40 นาที | ตัวการหลัก! |
| **IL2CPP/Postprocess** | 10-20 นาที | Incremental ช่วยได้ |
| **Player Build อื่นๆ** | ~10 นาที | scenes, assets |
| **Asset Reimport** | ?? นาที | หลัง optimize |
| **Total** | ~60-100 นาที | |

### ปัญหาที่พบ

1. **Addressables build 751 MB ทุกครั้ง** - ใช้เวลา 20-40 นาที
2. **IL2CPP compilation** - 10-20 นาที (ลดได้ถ้า incremental)
3. **Texture optimization ช่วย Build Time ได้น้อย** - ช่วย size มากกว่า

### สิ่งที่ทำไปแล้ว

- [x] สร้าง AssetOptimizer.cs ที่ `E:\ENG_Project\Assets\Scripts\Editor\`
- [x] User optimize รูป 2000+ ไฟล์
- [x] Audio ลดจาก 387 MB → 29.7 MB (ดีมาก!)

### สิ่งที่ต้องทำต่อ

1. **ดู Addressables Settings**
   - ปิด "Build Addressables on Player Build"
   - แยก Groups ตาม update frequency
   - เปิด Asset Bundle Cache

2. **ดู IL2CPP Settings**
   - เปิด Incremental IL2CPP Build
   - ใช้ "Faster (Smaller) Builds" code generation

3. **ลบ Demo Assemblies ที่ไม่ใช้**
   - AVProVideo.Demos
   - Vuplex.WebViewDemos

---

## Files ที่เกี่ยวข้อง

- `E:\ENG_Project\Assets\Scripts\Editor\AssetOptimizer.cs` - Tool ที่สร้าง
- `E:\ENG_Project\Library\Bee\buildreport.json` - Build timing
- `E:\ENG_Project\Library\com.unity.addressables\BuildReports\` - Addressables reports
- `C:\Users\Lenovo\AppData\Local\Unity\Editor\Editor.log` - Full log

---

## Build Report Comparison

### ก่อน Optimize
- Total: 26 นาที (Player Build only)
- IL2CPP: 19.4 นาที
- Sounds: ~387 MB

### หลัง Optimize
- Total: 21.6 นาที (Player Build only)
- IL2CPP: 10.4 นาที (incremental)
- Sounds: 29.7 MB

**แต่ Addressables ยังไม่ได้แก้ = ยังช้าอยู่**
