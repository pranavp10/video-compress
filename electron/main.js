const { app, BrowserWindow, protocol, ipcMain } = require('electron');
const path = require('path');
const fs = require('fs');

// ============================================================================
// EXPECTED CONSOLE WARNINGS (These are normal and don't affect functionality)
// ============================================================================
// 
// The following warnings are expected in development:
// • Cross-Origin-Opener-Policy warnings - Normal for app:// protocol
// • Electron Security Warnings - Required for WASM functionality
// • Next.js RSC fetch errors - Fallback to client-side rendering
// • Worker redirect warnings - Worker loading disabled to avoid CORS
// • File extension validation messages - Normal behavior
//
// ✅ If FFmpeg loads without errors, the app is working correctly!
// ============================================================================

// ----- App Configuration -----
const isProd = app.isPackaged;
const isDev = !isProd;

// ----- Custom Protocol Handler -----
function registerStaticProtocol() {
  protocol.registerFileProtocol('app', (request, callback) => {
    const staticPath = getStaticPath();
    let requestUrl = request.url.replace('app://', '');
    
    // Remove any leading slash
    if (requestUrl.startsWith('/')) {
      requestUrl = requestUrl.substring(1);
    }
    
    // Handle URLs that got prefixed with "index.html" due to base URL
    if (requestUrl.startsWith('index.html/')) {
      requestUrl = requestUrl.substring('index.html/'.length);
    }
    
    let filePath;
    
    console.log('🔍 Processing request:', request.url, '→ URL:', requestUrl);
    
    // Handle different types of requests
    if (requestUrl === '' || requestUrl === 'index.html') {
      // Main page
      filePath = path.join(staticPath, 'index.html');
    } else if (requestUrl.startsWith('_next/static/')) {
      // Next.js static assets (CSS, JS, fonts, etc.)
      filePath = path.join(staticPath, requestUrl);
    } else if (requestUrl.startsWith('_next/')) {
      // Other Next.js assets
      filePath = path.join(staticPath, requestUrl);
    } else if (requestUrl.startsWith('download/')) {
      // Handle public/download files (like FFmpeg WASM files)
      filePath = path.join(__dirname, '..', 'public', requestUrl);
    } else if (requestUrl.includes('.') && !requestUrl.includes('/')) {
      // Handle root-level public files (favicon, etc.)
      filePath = path.join(staticPath, requestUrl);
    } else {
      // Try public directory first, then check for page routes
      const publicPath = path.join(process.cwd(), 'public', requestUrl);
      
      if (fs.existsSync(publicPath)) {
        filePath = publicPath;
      } else {
        // Check for page routes - handle both direct routes and nested routes
        let routePath = requestUrl;
        
        // Remove trailing slash if present
        if (routePath.endsWith('/')) {
          routePath = routePath.slice(0, -1);
        }
        
        // Try different HTML file patterns for static export
        const htmlPaths = [
          path.join(staticPath, routePath + '.html'),
          path.join(staticPath, routePath, 'index.html'),
          path.join(staticPath, routePath + '/index.html')
        ];
        
        let foundPath = null;
        for (const htmlPath of htmlPaths) {
          if (fs.existsSync(htmlPath)) {
            foundPath = htmlPath;
            break;
          }
        }
        
        if (foundPath) {
          filePath = foundPath;
        } else {
          // Default fallback
          filePath = path.join(staticPath, 'index.html');
          console.log('🔄 Fallback to index:', filePath);
        }
      }
    }
    
    // Check if file exists and return appropriate response
    if (fs.existsSync(filePath)) {
      callback({ 
        path: filePath,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
          'Cross-Origin-Embedder-Policy': 'require-corp',
          'Cross-Origin-Opener-Policy': 'same-origin'
        }
      });
    } else {
      // Return 404 or fallback to index
      callback({ 
        path: path.join(staticPath, 'index.html'),
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type'
        }
      });
    }
  });
}

// ----- FFmpeg Asset IPC Handlers -----
function setupFFmpegIPC() {
  // Handle FFmpeg core JS file request
  ipcMain.handle('get-ffmpeg-core-js', async () => {
    try {
      const filePath = path.join(__dirname, '..', 'public', 'download', 'ffmpeg-core.js');
      
      if (!fs.existsSync(filePath)) {
        throw new Error(`FFmpeg core JS file not found: ${filePath}`);
      }
      
      const fileContent = fs.readFileSync(filePath, 'utf8');
      return fileContent;
    } catch (error) {
      console.error('Error loading FFmpeg core JS:', error);
      throw error;
    }
  });

  // Handle FFmpeg WASM file request
  ipcMain.handle('get-ffmpeg-wasm', async () => {
    try {
      const filePath = path.join(__dirname, '..', 'public', 'download', 'ffmpeg-core.wasm');
      
      if (!fs.existsSync(filePath)) {
        throw new Error(`FFmpeg WASM file not found: ${filePath}`);
      }
      
      const fileBuffer = fs.readFileSync(filePath);
      return fileBuffer;
    } catch (error) {
      console.error('Error loading FFmpeg WASM:', error);
      throw error;
    }
  });
}

// ----- Static File Path Setup -----
function getStaticPath() {
  // Use the exported static files from the out directory
  return path.join(__dirname, '../out');
}

// ----- Create Electron Window -----
function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    show: false,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      webSecurity: false, // Temporarily disable for WASM loading
      allowRunningInsecureContent: true, // Allow WASM execution
      preload: path.join(__dirname, 'preload.js'),
    },
    titleBarStyle: 'default',
  });

  // Load the app using custom protocol
  win.loadURL('app:///');

  // Open DevTools in development
  if (isDev) {
    win.webContents.openDevTools();
  }

  win.once('ready-to-show', () => {
    win.show();
    
    // Inject minimal Electron API
    win.webContents.executeJavaScript(`
      window.electronAPI = {
        isElectron: true,
        isDev: ${isDev}
      };
    `);
  });

  win.webContents.on('did-fail-load', (event, errorCode, errorDescription, validatedURL) => {
    console.error('Load failed:', errorCode, errorDescription, validatedURL);
  });

  // Handle navigation events
  win.webContents.on('will-navigate', (event, url) => {
    // Allow navigation within the app protocol
    if (url.startsWith('app://')) {
      return;
    }
    
    // For relative paths, convert to app protocol
    if (url.startsWith('/')) {
      event.preventDefault();
      const newUrl = 'app://' + url.substring(1);
      win.loadURL(newUrl);
    }
  });

  return win;
}

let mainWindow;

app.whenReady().then(async () => {
  // Register custom protocol before creating window
  registerStaticProtocol();
  
  // Set up FFmpeg IPC handlers
  setupFFmpegIPC();
  
  // Create the main window
  mainWindow = createWindow();
});

// ----- App Event Handlers -----
// Quit app when all windows closed (except macOS)
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// Re-create window when dock icon clicked (macOS)
app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    mainWindow = createWindow();
  }
});

// Security: Prevent new window creation
app.on('web-contents-created', (event, contents) => {
  contents.on('new-window', (navigationEvent, url) => {
    navigationEvent.preventDefault();
  });
});
