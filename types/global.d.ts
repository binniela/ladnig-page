declare global {
    interface Window {
      VANTA: any; // or use a more specific type if you know it
    }
  }
  
  export {}; // This line ensures that the file is treated as a module
  