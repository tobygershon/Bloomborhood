import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";


export function newUserSignUp(email, password) {

    const auth = getAuth();

    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed up 
            const user = userCredential.user;
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            // ..
        });

    return user
}

export function signInUser(email, password) {

    const auth = getAuth();

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            // ...
            return user;
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
        });
}

export function signOutUser() {

    const auth = getAuth();

    signOut(auth).then(() => {
        console.log("user signed out")
    }).catch((error) => {
        // An error happened.
    });
}

export function getCurrentUser1() {
    // use this option with signInWithRedirect method from firebase (preffered method)
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
        if (user) {
            // User is signed in, see docs for a list of available properties
            // https://firebase.google.com/docs/reference/js/auth.user
            const uid = user.uid;
            console.log(uid)
            // ...
        } else {
            console.log("user is signed out")
        }
    });
}

export function getCurrentUser2() {
    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
        console.log(user.uid)
        return user;
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        // ...
    } else {
        console.log("no signed in user")
    }
}