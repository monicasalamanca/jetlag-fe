declare module "*.css";

declare global {
  interface Window {
    gtag: (
      command: "config" | "event" | "js" | "set" | "consent",
      targetIdOrAction?: string,
      config?: Record<string, unknown>,
    ) => void;
    grecaptcha: {
      ready: (cb: () => void) => void;
      execute: (
        siteKey: string,
        options: { action: string },
      ) => Promise<string>;
    };
  }
}
