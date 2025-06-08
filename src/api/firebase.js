import { initializeApp } from "firebase/app";
import { 
  getAuth, 
  GoogleAuthProvider,
  connectAuthEmulator
} from "firebase/auth";

import { 
  getFirestore, 
  enableIndexedDbPersistence,
  connectFirestoreEmulator,
  Timestamp
} from "firebase/firestore";

import { 
  getFunctions,
  connectFunctionsEmulator
} from "firebase/functions";

import { 
  getDatabase,
  connectDatabaseEmulator
} from "firebase/database";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);
const functions = getFunctions(app);
const database = getDatabase(app);
const googleProvider = new GoogleAuthProvider();

// Connect emulators synchronously in development
if (import.meta.env.DEV) {
  connectAuthEmulator(auth, "http://localhost:9099");
  connectFirestoreEmulator(db, 'localhost', 8080);
  connectDatabaseEmulator(database, 'localhost', 9000);
  connectFunctionsEmulator(functions, 'localhost', 5001); // if you use Functions emulator
}

// Enable offline persistence for Firestore
enableIndexedDbPersistence(db).catch((err) => {
  console.error("Firestore offline persistence error:", err);
});

export { 
  auth, 
  db, 
  functions,
  database,
  googleProvider,
  Timestamp
};
