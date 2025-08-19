/**
 * Global type definitions for the Crypto AI Platform
 * Ensures type safety across the entire application
 */

// Global augmentations for Next.js
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_SUPABASE_URL: string;
      NEXT_PUBLIC_SUPABASE_ANON_KEY: string;
      SUPABASE_SERVICE_KEY: string;
      OPENAI_API_KEY: string;
      ANTHROPIC_API_KEY: string;
      COINMARKETCAP_API_KEY: string;
      COINGECKO_API_KEY?: string;
      SENTRY_DSN?: string;
      NEXT_PUBLIC_SENTRY_DSN?: string;
      SENDGRID_API_KEY?: string;
      TWILIO_ACCOUNT_SID?: string;
      TWILIO_AUTH_TOKEN?: string;
      AWS_ACCESS_KEY_ID?: string;
      AWS_SECRET_ACCESS_KEY?: string;
      REDIS_URL?: string;
      NEXT_PUBLIC_APP_URL: string;
      CSRF_SECRET?: string;
      CLOUDFLARE_ZONE_ID?: string;
      CLOUDFLARE_API_TOKEN?: string;
      NODE_ENV: 'development' | 'production' | 'test';
    }
  }

  // React component augmentations
  interface Window {
    ANALYTICS?: {
      writeDataPoint: (data: {
        blobs: string[];
        doubles: number[];
        indexes: string[];
      }) => void;
    };
    gtag?: (...args: unknown[]) => void;
    dataLayer?: Record<string, unknown>[];
  }
}

// Module augmentations
declare module '*.svg' {
  const content: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
  export default content;
}

declare module '*.png' {
  const content: string;
  export default content;
}

declare module '*.jpg' {
  const content: string;
  export default content;
}

declare module '*.jpeg' {
  const content: string;
  export default content;
}

declare module '*.gif' {
  const content: string;
  export default content;
}

declare module '*.webp' {
  const content: string;
  export default content;
}

declare module '*.avif' {
  const content: string;
  export default content;
}

// Component prop augmentations
declare module 'react' {
  interface HTMLAttributes<T = HTMLElement> {
    abTestVariant?: string;
    abTestConvert?: () => void;
    abTestTrack?: (eventName: string, properties?: Record<string, unknown>) => void;
    className?: string
    children?: React.ReactNode
  }
}

// Export to make this a module
export {};
