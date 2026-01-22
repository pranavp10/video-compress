const { contextBridge, ipcRenderer } = require('electron');

// Expose FFmpeg asset loading functions to the renderer process
contextBridge.exposeInMainWorld('electronAPI', {
  // Load FFmpeg core JS file
  getFFmpegCoreJS: () => ipcRenderer.invoke('get-ffmpeg-core-js'),
  
  // Load FFmpeg WASM file
  getFFmpegWASM: () => ipcRenderer.invoke('get-ffmpeg-wasm'),
  
  // Utility function to check if running in Electron
  isElectron: () => true,
});
