declare global {
  interface Window {
    electronAPI?: {
      isElectron: boolean;
      getLocalFileURL: (path: string) => string;
    };
  }
}

export {};
