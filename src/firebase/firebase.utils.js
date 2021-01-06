import firebase from 'firebase/app';

import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyDw-UN8xg1EZtttnMqa6kTh521YO7Lk8ko",
    authDomain: "crwn-db-7ef2b.firebaseapp.com",
    projectId: "crwn-db-7ef2b",
    storageBucket: "crwn-db-7ef2b.appspot.com",
    messagingSenderId: "1074685360910",
    appId: "1:1074685360910:web:6f2cb293ed183485a6b55f",
    measurementId: "G-4GEEQ7VDSD"
  };

  export const createProfileUserDocument = async(userAuth, additionalData) => {
      if(!userAuth) return false;
       const userRef = firestore.doc(`users/${userAuth.uid}`);
       const snapShot = await userRef.get(); 
        console.log(snapShot);
        if(!snapShot.exists) {
            const { displayName, email } = userAuth;
            const createdAt = new Date();
            try {
                await userRef.set({
                    displayName,
                    email,
                    createdAt,
                    ...additionalData
                })
            } catch (error) {
                console.log('error creating user', error.message )
            }
        } 
        return userRef;  

  };

  firebase.initializeApp(config);

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({ prompt: 'select_account'});
  export const signInWithGoogle = () => auth.signInWithPopup(provider);

  export default firebase;