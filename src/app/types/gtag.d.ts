declare global {
  interface Window {
    gtag: (
      command: "config" | "event" | "js" | "set" | "consent",
      targetIdOrAction?: string,
      config?: Record<string, unknown>,
    ) => void;
  }
}
