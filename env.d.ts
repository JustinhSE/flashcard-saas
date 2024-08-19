declare global {
    namespace NodeJS {
        interface ProcessEnv {
            NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: string;
            CLERK_SECRET_KEY: string;
            NEXT_PUBLIC_CLERK_SIGN_IN_URL: string;
            NEXT_PUBLIC_CLERK_SIGN_UP_URL: string;
            STRIPE_PUBLISHABLE_KEY_TEST: string;
            STRIPE_SECRET_KEY_TEST: string;
            STRIPE_WEBHOOK_SECRET: string;
            OPENAI_API_KEY: string;
            NEXT_PUBLIC_FIREBASE_API_KEY: string;
            NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN: string;
            NEXT_PUBLIC_FIREBASE_PROJECT_ID: string;
            NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET: string;
            NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID: string;
            NEXT_PUBLIC_FIREBASE_APP_ID: string;
            NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID: string;
        }
    }
}

export {}