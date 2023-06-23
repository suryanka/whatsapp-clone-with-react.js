import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'

const firebaseApp =  firebase.initializeApp({
    //Provide your own firebase details
});

const db=  firebase.firestore();
const auth= firebase.auth();
const provider= new firebase.auth.GoogleAuthProvider();

export { auth, provider};
export default db;