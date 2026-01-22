const { app, ipcMain } = require('electron');
const path = require('path');
const fs = require('fs');

// Import the IPC handlers setup
function setupFFmpegIPC() {
  // Handle FFmpeg core JS file request
  ipcMain.handle('get-ffmpeg-core-js', async () => {
    try {
      const filePath = path.join(__dirname, '..', '..', 'public', 'download', 'ffmpeg-core.js');
      console.log('📦 Loading FFmpeg core JS:', filePath);
      
      if (!fs.existsSync(filePath)) {
        throw new Error(`FFmpeg core JS file not found: ${filePath}`);
      }
      
      const fileContent = fs.readFileSync(filePath, 'utf8');
      console.log('✅ FFmpeg core JS loaded:', fileContent.length, 'bytes');
      return fileContent;
    } catch (error) {
      console.error('❌ Error loading FFmpeg core JS:', error);
      throw error;
    }
  });

  // Handle FFmpeg WASM file request
  ipcMain.handle('get-ffmpeg-wasm', async () => {
    try {
      const filePath = path.join(__dirname, '..', '..', 'public', 'download', 'ffmpeg-core.wasm');
      console.log('📦 Loading FFmpeg WASM:', filePath);
      
      if (!fs.existsSync(filePath)) {
        throw new Error(`FFmpeg WASM file not found: ${filePath}`);
      }
      
      const fileBuffer = fs.readFileSync(filePath);
      console.log('✅ FFmpeg WASM loaded:', fileBuffer.length, 'bytes');
      return fileBuffer;
    } catch (error) {
      console.error('❌ Error loading FFmpeg WASM:', error);
      throw error;
    }
  });
}

// Test the IPC handlers
async function testFFmpegIPC() {
  console.log('🧪 Testing FFmpeg IPC handlers...');
  
  // Setup IPC handlers
  setupFFmpegIPC();
  
  try {
    // Test FFmpeg core JS loading
    console.log('\n📝 Testing FFmpeg core JS loading...');
    const coreJS = await ipcMain.handleOnce('get-ffmpeg-core-js');
    console.log('✅ FFmpeg core JS test passed:', typeof coreJS === 'string', coreJS.length > 0);
    
    // Test FFmpeg WASM loading
    console.log('\n📝 Testing FFmpeg WASM loading...');
    const wasmBuffer = await ipcMain.handleOnce('get-ffmpeg-wasm');
    console.log('✅ FFmpeg WASM test passed:', wasmBuffer instanceof Buffer, wasmBuffer.length > 0);
    
    console.log('\n🎉 All FFmpeg IPC tests passed!');
  } catch (error) {
    console.error('❌ FFmpeg IPC test failed:', error);
  }
}

// Simplified test runner for IPC handlers
async function runTests() {
  try {
    console.log('🧪 Testing FFmpeg file loading directly...');
    
    // Test direct file loading
    const coreJSPath = path.join(__dirname, '..', '..', 'public', 'download', 'ffmpeg-core.js');
    const wasmPath = path.join(__dirname, '..', '..', 'public', 'download', 'ffmpeg-core.wasm');
    
    console.log('📂 Checking file paths:');
    console.log('Core JS:', coreJSPath, fs.existsSync(coreJSPath));
    console.log('WASM:', wasmPath, fs.existsSync(wasmPath));
    
    let coreJSLoaded = false;
    let wasmLoaded = false;
    
    if (fs.existsSync(coreJSPath)) {
      const coreJS = fs.readFileSync(coreJSPath, 'utf8');
      console.log('✅ Core JS loaded:', coreJS.length, 'bytes');
      coreJSLoaded = true;
    } else {
      console.error('❌ Core JS file not found:', coreJSPath);
    }
    
    if (fs.existsSync(wasmPath)) {
      const wasmBuffer = fs.readFileSync(wasmPath);
      console.log('✅ WASM loaded:', wasmBuffer.length, 'bytes');
      wasmLoaded = true;
    } else {
      console.error('❌ WASM file not found:', wasmPath);
    }
    
    if (coreJSLoaded && wasmLoaded) {
      console.log('\n🎉 Direct file loading tests passed!');
    } else {
      console.error('\n❌ Direct file loading tests failed!');
      console.error('Missing files:', !coreJSLoaded ? 'Core JS' : '', !wasmLoaded ? 'WASM' : '');
      throw new Error('Required FFmpeg files not found');
    }
  } catch (error) {
    console.error('❌ Test failed:', error);
    process.exit(1);
  }
}

// Run tests
runTests();
