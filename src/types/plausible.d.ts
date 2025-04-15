export {};

interface PlausibleOptions {
  callback?: () => void;
  props?: Record<string, string | number | boolean>;
  revenue?: {
    currency: string;
    amount: number;
  };
}

type PlausibleFunction = (
  eventName: string,
  options?: PlausibleOptions | (() => void)
) => void;

declare global {
  interface Window {
    plausible?: (eventName: string, options?: PlausibleOptions) => void;
    plausible_queue?: {
      q: Array<[string, PlausibleOptions | (() => void)]>;
    };
  }
} 