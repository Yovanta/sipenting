import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";

import { firebaseConfig } from "./config";

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
export const signInWithFirebase = async (email, password) => {
  try {
    const response = await auth.signInWithEmailAndPassword(email, password);
    const idToken = await response.user.getIdToken()
    return { user: response.user, idToken };
  } catch (error) {
    throw new Error(error.message);
  }
};
export const signUpWithFirebase = async (name, email, password) => {
  try {
    const response = await auth.createUserWithEmailAndPassword(email, password);
    await response.user.updateProfile({name})
    return response.user;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const signInWithGoogle = async() => {
  const provider = new firebase.auth.GoogleAuthProvider();
  const result = await firebase.auth().signInWithPopup(provider)
  return result.user;
}

