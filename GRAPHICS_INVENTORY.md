# Synergy UI Graphics Inventory & Replacement Guide

## 📊 Critical Brand Graphics (Require Replacement)

| # | File Name | Location | Dimensions | Format | Priority | Usage |
|---|-----------|----------|-----------|--------|----------|-------|
| 1 | **banner.png** | Root directory | ~1600x900* | PNG | 🔴 CRITICAL | README header image |
| 2 | **demo.png** | Root directory | ~1600x900* | PNG | 🔴 CRITICAL | README demo screenshot |
| 3 | **logo.png** | `backend/synergy_ui/static/` | 500x500 | PNG | 🔴 CRITICAL | Main app logo |
| 4 | **favicon.svg** | `backend/synergy_ui/static/` | Scalable | SVG | 🔴 CRITICAL | Browser favicon (vector) |
| 5 | **favicon.ico** | `backend/synergy_ui/static/` | 16x16 | ICO | 🟠 HIGH | Browser tab icon |
| 6 | **favicon.png** | `backend/synergy_ui/static/` | 500x500 | PNG | 🟠 HIGH | Favicon PNG variant |
| 7 | **favicon-dark.png** | `backend/synergy_ui/static/` | 500x500 | PNG | 🟠 HIGH | Dark theme favicon |
| 8 | **favicon-96x96.png** | `backend/synergy_ui/static/` | 96x96 | PNG | 🟠 HIGH | Medium favicon |
| 9 | **web-app-manifest-192x192.png** | `backend/synergy_ui/static/` | 192x192 | PNG | 🟠 HIGH | PWA home screen |
| 10 | **web-app-manifest-512x512.png** | `backend/synergy_ui/static/` | 512x512 | PNG | 🟠 HIGH | PWA splash screen |
| 11 | **apple-touch-icon.png** | `backend/synergy_ui/static/` | 180x180 | PNG | 🟠 HIGH | iOS home screen |
| 12 | **splash.png** | `backend/synergy_ui/static/` | 500x500 | PNG | 🟠 HIGH | PWA splash (light) |
| 13 | **splash-dark.png** | `backend/synergy_ui/static/` | 500x500 | PNG | 🟠 HIGH | PWA splash (dark) |

---

## 🎨 Asset Organization Structure

```
backend/synergy_ui/static/
├── favicon.svg (vector - use for all sizes)
├── favicon.ico (16x16)
├── favicon.png (500x500)
├── favicon-96x96.png
├── favicon-dark.png
├── apple-touch-icon.png (180x180)
├── web-app-manifest-192x192.png
├── web-app-manifest-512x512.png
├── splash.png
├── splash-dark.png
└── logo.png
```

---

## 🚀 Fastest Iteration Workflow

### **Recommended Approach: Master SVG Method**

1. **Create ONE master SVG** (your prototype icon)
   - Save as: `logo-master.svg`
   - Ensure it's 500x500px viewBox for consistency
   
2. **Use SVG for favicon**
   - Update `favicon.svg` with your master SVG
   - Browsers automatically scale for all sizes
   - This covers: favicon.ico, favicon.png, favicon-96x96.png

3. **Batch export PNG variants** from master SVG
   - Use tools to export multiple sizes from one file:
     - **InkScape** (free): File → Export PNG Image → Set DPI for scale
     - **Adobe Illustrator**: Export Asset → Set sizes
     - **Online tools**: svg-to-png converters (batch processing)
   
4. **Specific PNG exports needed from master SVG:**
   - `favicon.png` (500×500)
   - `favicon-96x96.png` (96×96)
   - `favicon-dark.png` (500×500) - with dark background
   - `web-app-manifest-192x192.png` (192×192)
   - `web-app-manifest-512x512.png` (512×512)
   - `apple-touch-icon.png` (180×180)
   - `splash.png` (500×500) - light variant
   - `splash-dark.png` (500×500) - dark variant
   - `logo.png` (500×500)

5. **Update README graphics**
   - `banner.png`: ~1600×900 (can be screenshot or custom design)
   - `demo.png`: ~1600×900 (app UI screenshot)

---

## ⚡ Quick Start Steps

### **Option A: Use Your Prototype Icon (FASTEST)**

If your icon is already in SVG:

```powershell
# 1. Save master SVG to backend
Copy-Item "path\to\your\logo.svg" -Destination "backend/synergy_ui/static/favicon.svg"

# 2. Use online batch converter or tool for PNG variants
#    Input: favicon.svg
#    Outputs: favicon.png (500x500), favicon-96x96.png, web-app-manifest-192x192.png, etc.

# 3. Replace all generated files in backend/synergy_ui/static/

# 4. Update banner.png and demo.png manually
```

### **Option B: Convert Your Icon to SVG First**

If your icon is PNG/JPG:

1. Trace image to SVG (Inkscape: Paths → Trace Bitmap)
2. Save as SVG with 500x500 viewBox
3. Then follow Option A

---

## 📝 Replacement Checklist

- [ ] Master SVG created (favicon.svg)
- [ ] favicon.svg - saved
- [ ] favicon.ico - replaced
- [ ] favicon.png (500×500) - replaced
- [ ] favicon-dark.png (500×500) - replaced  
- [ ] favicon-96x96.png (96×96) - replaced
- [ ] apple-touch-icon.png (180×180) - replaced
- [ ] web-app-manifest-192x192.png (192×192) - replaced
- [ ] web-app-manifest-512x512.png (512×512) - replaced
- [ ] splash.png (500×500) - replaced
- [ ] splash-dark.png (500×500) - replaced
- [ ] logo.png (500×500) - replaced
- [ ] banner.png (~1600×900) - replaced
- [ ] demo.png (~1600×900) - replaced
- [ ] Test in browser (check favicon loads)
- [ ] Test on mobile (PWA home screen)
- [ ] Verify manifest.json icon paths

---

## 🛠️ Tool Recommendations

**Free Options:**
- **Inkscape** (open source): Batch export SVG to PNG
- **ImageMagick** (CLI): `convert logo.svg -resize 192x192 output-192.png`
- **Affinity Designer** (affordable): SVG + export presets

**Online Tools:**
- cloudconvert.com (batch SVG to PNG)
- convertio.co (simple single conversions)
- svgtopng.com

**Professional:**
- Adobe Illustrator
- Figma (export at multiple scales)

---

## 📍 Important Notes

- **Vector SVG is master** → Scale without quality loss
- **favicon.ico** requires special handling (16×16, limited colors)
- **Dark variants** need adjusted background/contrast
- **Splash screens** may need additional branding text
- **Test across browsers** (Chrome, Firefox, Safari, Edge)

---

## 🔄 File Dependency Map

```
favicon.svg (MASTER)
    ├── favicon.png (500×500)
    ├── favicon-dark.png (500×500)
    ├── favicon-96x96.png (96×96)
    ├── apple-touch-icon.png (180×180)
    ├── web-app-manifest-192x192.png (192×192)
    ├── web-app-manifest-512x512.png (512×512)
    ├── favicon.ico (16×16)
    ├── splash.png (500×500)
    └── splash-dark.png (500×500)

logo.png (INDEPENDENT)
    └── Used in: App UI, backend references

banner.png & demo.png (INDEPENDENT)
    └── Used in: README.md marketing
```

---

**Estimated Time to Replace All Graphics:**
- With SVG master: **~30 mins** (export + file replacements)
- Without SVG: **~2 hours** (manual creation + export)
