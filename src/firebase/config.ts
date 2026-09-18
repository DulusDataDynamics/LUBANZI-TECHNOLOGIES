
export const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "key-placeholder",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "auth-placeholder",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "project-placeholder",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "storage-placeholder",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "sender-placeholder",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "app-placeholder",
};
