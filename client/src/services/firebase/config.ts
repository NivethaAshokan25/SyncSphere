/**
 * Firebase Configuration Scaffold
 * Integrates with Google Cloud Firebase via environment variables.
 */

// import { initializeApp } from 'firebase/app';
// import { getFirestore } from 'firebase/firestore';
// import { getAuth } from 'firebase/auth';
// import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || 'mock-api-key',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || 'mock-domain',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || 'indigo-coder-463611-g5',
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || 'mock-bucket',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || 'mock-sender-id',
  appId: import.meta.env.VITE_FIREBASE_APP_ID || 'mock-app-id'
};

// Mock initialization for UI/Demo stability
export const app = { name: 'FirebaseApp_Mock', options: firebaseConfig };
export const auth = { currentUser: null };
export const db = { type: 'Firestore_Mock' };
export const storage = { type: 'GCS_Mock' };

console.log('Firebase initialized (mocked for demo):', firebaseConfig.projectId);
