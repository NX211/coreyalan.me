interface FormbricksInstance {
  track: (eventName: string, properties?: Record<string, any>) => void;
  identify: (userId: string, attributes?: Record<string, any>) => void;
  reset: () => void;
}

declare global {
  interface Window {
    formbricks?: FormbricksInstance;
  }
} 