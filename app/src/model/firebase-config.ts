import {
  FIREBASE_API_KEY,
  FIREBASE_AUTH_DOMAIN,
  FIREBASE_PROJECT_ID,
  FIREBASE_APP_ID,
  FIREBASE_MESSAGING_SENDER_ID,
  FIREBASE_STORAGE_BUCKET,
} from '@env';
import { initializeApp, FirebaseApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
import {
  CollectionReference,
  collection,
  DocumentData,
  initializeFirestore,
  Firestore,
} from 'firebase/firestore';

let db: Firestore;

export const getApp = () => {
  if (app) {
    return app;
  }

  const firebaseConfig = {
    apiKey: FIREBASE_API_KEY ?? '',
    authDomain: FIREBASE_AUTH_DOMAIN ?? '',
    projectId: FIREBASE_PROJECT_ID ?? '',
    storageBucket: FIREBASE_STORAGE_BUCKET ?? '',
    messagingSenderId: FIREBASE_MESSAGING_SENDER_ID ?? '',
    appId: FIREBASE_APP_ID ?? '',
  };

  return initializeApp(firebaseConfig);
};

const app: FirebaseApp = getApp();

export const getDB = () => {
  if (!db) {
    db = initializeFirestore(app, {
      experimentalForceLongPolling: true,
      useFetchStreams: false,
    } as any);
  }

  return db;
};

let storage: any;

export const getCloudStorage = () => {
  if (!storage) {
    storage = getStorage();
  }

  return storage;
};

export const getCollection = <T = DocumentData>(collectionName: string) => {
  return collection(getDB(), collectionName) as CollectionReference<T>;
};
