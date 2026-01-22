# CI/CD Setup & Usage

This guide explains how to set up and use the automated build and release system for the Electron app.

## Overview

The project uses GitHub Actions with 2 workflows:
- **Development builds**: Test builds on every push/PR
- **Release builds**: Production builds with multi-architecture support

## GitHub Actions Configuration

### Workflow Files
```
.github/workflows/
├── build-electron.yml      # Development builds (push/PR)
└── build-release.yml       # Production releases (tags only)
```

### Development Workflow (`build-electron.yml`)
- **Trigger**: Push to main, Pull requests
- **Purpose**: Quick validation builds
- **Platforms**: macOS, Windows, Linux (single arch each)

### Release Workflow (`build-release.yml`)  
- **Trigger**: Tag push (v*) or manual dispatch
- **Purpose**: Production releases
- **Platforms**: 
  - macOS (Intel x64 + Apple Silicon arm64)
  - Windows (x64)
  - Linux (x64)
- **Output**: Auto-generated GitHub release

---

## Quick Release Guide

### 1. Create Release

```bash
# Tag and push for release
git tag v0.1.1
git push origin v0.1.1
```

**Note:**
If the release workflow does not trigger, you may need to delete and recreate the tag:
```bash
git tag -d v0.1.1
git push origin :refs/tags/v0.1.1
git tag v0.1.1
git push origin v0.1.1
```

### 2. Monitor Progress
- Go to GitHub Actions → "Build and Release Electron Apps"
- Watch 4 build jobs: Linux x64, Windows x64, macOS x64, macOS arm64
- Check for errors

### 3. Download Results
- Release is auto-created with all installers
- Download from GitHub Releases page

## 4. Code Signing (Optional)

**Only needed if you want signed installers for distribution.**

---

### GitHub Secrets Required

**Essential**
```bash
# Basic Requirement
NEXT_PUBLIC_URL  # App host URL, as set in .env (e.g., https://localhost:3000)
```

**Optional** (required only for publishing to desktop app stores):
```bash
# macOS (Apple Developer Account needed)
CSC_LINK             # Base64-encoded .p12 certificate
CSC_KEY_PASS         # Certificate password

# Windows (Code signing certificate needed)
WINDOWS_CSC_LINK     # Base64-encoded .p12 certificate
WINDOWS_CSC_KEY_PASS # Certificate password
```

> ⚠️ **Note:**  
> Code signing certificates are not required to build or run the app.  
> Unsigned installers can still be downloaded and used by others, but users may see security warnings when installing.  
> Code signing is only required if you want to publish to the Mac App Store, Microsoft Store, or to avoid OS security prompts.

### Setup Process
1. Get certificates from Apple/CA
2. Export as .p12 files
3. Convert to base64: `base64 -i cert.p12 | pbcopy`
4. Add to GitHub repo secrets

## Build Outputs

### Files Generated
- **macOS**: `.dmg` installer + `.zip` portable
- **Windows**: `.exe` installer + `.zip` portable  
- **Linux**: `.AppImage` portable + `.deb` package

### Artifact Names
```
electron-app-darwin-x64/     # macOS Intel
electron-app-darwin-arm64/   # macOS Apple Silicon  
electron-app-win32-x64/      # Windows
electron-app-linux-x64/      # Linux
```

---

## Local Development

### Build Locally
```bash
# Build Next.js first
bun run build

# Build Electron for current platform
bun run electron:build
```

### Test Before Release
```bash
# Run locally to test
bun run electron:dev
```

---

## Troubleshooting

### Common Issues
1. **Build fails**: Check Node.js/Bun versions in workflow
2. **Missing artifacts**: Verify files exist in `dist/` folder after build
3. **Release not created**: Ensure tag starts with 'v' (e.g., v1.0.0)

### Debug Steps
```bash
# Check specific workflow logs
# Look at "Build Electron app" steps for errors
# Verify artifact upload shows files found
```

### Platform Requirements
- **macOS builds**: Need Xcode command line tools
- **Cross-platform**: Use GitHub Actions (local cross-build is complex)

---

**💡 Pro Tip**: Use the development workflow (`build-electron.yml`) to test changes, then create tags for releases (`build-release.yml`) when ready to ship!
