import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";


export async function newUserSignUp(email, password) {

    let newUser;
    
    const auth = getAuth();

    await createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed up 
            newUser = userCredential.user;
        })
        .catch((error) => {
            console.log(error.code);
            console.log(error.message);

            // ..
        });

        return newUser.uid;
}

export async function signInUser(email, password) {

    const auth = getAuth();

    await signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            // ...
            return user;
        })
        .catch((error) => {
            console.log(error.code);
            console.log(error.message);
            alert("Sorry, your email and/or password did not match our records")
        });
}

export function signOutUser() {

    const auth = getAuth();

    signOut(auth).then(() => {
        console.log("user signed out")
    }).catch((error) => {
        // An error happened.
        console.log(error)
        alert("Sorry, an error occured.  Please try to logout again")
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
        return user;
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        // ...
    } else {
        console.log("no signed in user")
    }
}