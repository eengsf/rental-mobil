import { FirebaseApp, initializeApp } from 'firebase/app';
import {
  initializeFirestore,
  memoryLocalCache,
  persistentLocalCache,
} from 'firebase/firestore';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_API_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_API_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_API_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_API_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_API_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_API_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// const db = getFirestore(app);
const initializeFirestoreWithCache = (app: FirebaseApp) => {
  if (typeof window !== 'undefined') {
    return initializeFirestore(app, {
      localCache: persistentLocalCache(),
    });
  } else {
    return initializeFirestore(app, {
      localCache: memoryLocalCache(),
    });
  }
};

const db = initializeFirestoreWithCache(app);

const googleProvider = new GoogleAuthProvider();
const storage = getStorage(app);

export { db, auth, googleProvider, storage };
