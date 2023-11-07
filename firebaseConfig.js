import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDAdtkeRhM0bo4YDNt_RxqE91Qd3aBAf2g",
  authDomain: "rn-media-gallery.firebaseapp.com",
  projectId: "rn-media-gallery",
  storageBucket: "rn-media-gallery.appspot.com",
  messagingSenderId: "498549669670",
  appId: "1:498549669670:web:3be2e3438cfc23c7a3cbe7",
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);

export const FIRESTORE_DB = getFirestore(FIREBASE_APP);
export const FIREBASE_STORAGE = getStorage(FIREBASE_APP);
export const FIREBASE_AUTH = initializeAuth(FIREBASE_APP, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});
