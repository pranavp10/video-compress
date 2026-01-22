# Electron Desktop App Setup

This guide explains how to build and run Video Compressor as a standalone desktop application.

## Key Changes Summary

### Previous Issues
- Early Electron used a background Next.js server (port 3000) instead of static files
- Caused port conflicts and required a local server process
- Now fully static and serverless (out/ folder only)

### New Architecture 
- **Static File Serving**: Direct file serving from the `out/` folder (not `.next/`)
- **No Ports**: Uses `app://` protocol without port usage
- **Fully Offline**: No network connection required
- **FFmpeg IPC**: Load WASM files from main process to resolve CORS

> **Note:**
> - `.next/` is the internal Next.js build output (used for SSR/dev server). Electron does **not** use this folder.
> - `out/` is the static export output (via `next export` or build script). Electron uses **only** this folder for all static assets and HTML.

## Core Features

✅ **Standalone App** - No server required, no port conflicts  
✅ **Offline First** - Works completely offline  
✅ **Cross-Platform** - macOS, Windows, Linux support  
✅ **FFmpeg WASM** - Stable WASM loading via IPC  
✅ **Auto Build** - Automated builds with GitHub Actions  

## Quick Start

### Development Environment

```bash
# Install dependencies
bun install

# Build Next.js (required)
bun run build

# Export static files to out/
bun run export   # or next export

# Run Electron app (serves from out/)
bun run electron:dev
```

### Production Build

```bash
# Build for current platform
bun run electron:build

# Build for distribution (CI for all platforms / local with your setup)
bun run electron:dist
```

## Build Targets

### macOS
- `.dmg` installer (Universal: Apple Silicon + Intel)
- `.zip` portable app

### Windows  
- `.exe` installer (NSIS)
- `.zip` portable app

### Linux
- `.AppImage` portable
- `.deb` package (Ubuntu/Debian)

## Automated Releases

**📖 For CI/CD setup and release instructions, see [CICD_GUIDE.md](./CICD_GUIDE.md)**

## Code Structure

```
├── electron/
│   ├── main.js              # Main Electron process
│   ├── preload.js           # Renderer process API
│   └── tests/               # Test files
├── out/                     # Built static file output (Electron uses this)
├── dist/                    # Electron build output from out/
├── .github/workflows/       # CI/CD automation
└── public/                  # Static assets (icons, ffmpeg, etc.)
```

## Key Files Explained

### `electron/main.js`
- Custom `app://` protocol registration
- FFmpeg IPC handlers setup
- Static file serving logic (from `out/`)

### `electron/preload.js`
- Expose safe APIs to renderer process
- FFmpeg file loading interface

### `app/(compress)/components/compress.tsx`
- Electron environment detection logic
- FFmpeg WASM loading via IPC

## Development Tips

### 1. Development Notes
```bash
# Always build Next.js first
bun run build

# Export static files to out/
bun run export   # or next export

# Then run Electron
bun run electron:dev
```

### 2. Debugging
- DevTools open automatically in development mode
- Main process logs in terminal
- Renderer process logs in DevTools

### 3. Icon Setup
- `public/launcher-icon.icns` (macOS)
- `public/launcher-icon.ico` (Windows)
- `public/launcher-icon.png` (Linux)

### 4. Code Signing
- See [CICD_GUIDE.md](./CICD_GUIDE.md) for signing setup
- Optional for development builds

## Troubleshooting

### Build Issues
```bash
# Check out/ folder exists (static export)
bun run export   # or next export

# Clear cache
rm -rf dist node_modules && bun install
```

### FFmpeg Issues
- FFmpeg loads from static build, no server required
- Check browser console for loading errors
- Use `electron/tests/test-ffmpeg-ipc.js` to verify file existence

### Platform Requirements
- **macOS**: Xcode command line tools required
- **Windows**: Install Visual Studio Build Tools
- **Linux**: Install development libraries (`build-essential`)

## Testing

### FFmpeg IPC Test
```bash
cd electron/tests
node test-ffmpeg-ipc.js
```

Success: "🎉 Direct file loading tests passed!"  
Failure: "❌ Direct file loading tests failed!" + error logs

## Additional Improvements

### Completed
- ✅ Port conflict issues resolved
- ✅ FFmpeg WASM CORS issues resolved  
- ✅ Fully offline operation
- ✅ Cross-platform build automation

### Future Improvements
- 🔄 Auto-updater implementation
- 🔄 Better error handling
- 🔄 Performance optimizations
- 🔄 UI/UX improvements

---

**Important**: This setup is fully compatible with the existing web version. The web version still works normally, and Electron is provided as an additional option.
