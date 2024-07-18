
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
import { getFirestore, collection, getDocs, doc, getDoc, addDoc, Timestamp, updateDoc, query, where, increment, arrayUnion } from "firebase/firestore/lite";  //remove lite if you want to use the full version with real-time updates 
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAMuWD-nLc-REPd-YGRPfLNODpBQP9zVck",
    authDomain: "mybloomborhood.firebaseapp.com",
    projectId: "mybloomborhood",
    storageBucket: "mybloomborhood.appspot.com",
    messagingSenderId: "397503307692",
    appId: "1:397503307692:web:251433ab6a0f01b148e409"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const postsCollectionRef = collection(db, "posts");
const usersCollectionRef = collection(db, "users");
const mailCollectionRef = collection(db, "mail");

export async function getPostsForUser(zipArray) {

    let dataArray;


    if (zipArray.length > 0) {
        const q = query(postsCollectionRef, where("zip", "in", zipArray));
        const querySnapshot = await getDocs(q);
        dataArray = querySnapshot.docs.map(doc => ({
            ...doc.data(),
            id: doc.id
        }));

    } else {
        dataArray = []
    }

    return dataArray;
}

export async function getPostsByZipInput(zip) {

    let dataArray;

    if (zip.length === 5) {
        const q = query(postsCollectionRef, where("zip", "==", zip));
        const querySnapshot = await getDocs(q);
        dataArray = querySnapshot.docs.map(doc => ({
            ...doc.data(),
            id: doc.id
        }));

    } else {
        dataArray = []
        // perhaps return a specific doc or object giving info that no posts for zip exist or input was incorrect
    }

    return dataArray;
}

export async function getPostById(id) {
    const docRef = doc(db, "posts", id);
    const postSnapshot = await getDoc(docRef);

    const post = {
        ...postSnapshot.data(),
        id: postSnapshot.id
    }

    return post;
}

export async function addPost(plantNameInput, descriptionInput, addressInput, zipInput, locationInput, postingUserId) {
    const newDocRef = await addDoc(postsCollectionRef, {
        userId: postingUserId,
        plantName: plantNameInput,
        description: descriptionInput,
        address: addressInput,
        zip: zipInput,
        location: locationInput,
        postTime: Timestamp.fromDate(new Date()),
        firstRequestTime: "",
        wasRequested: false,
        numberOfRequests: 0,
        isAvailable: true
    })
}

export async function addMail(userEmail, subject, html) {
    const newDocRef = await addDoc(mailCollectionRef, {
        to: userEmail,
        message: {
            subject: subject,
            html: html
        }
    })

    //Attempted to get state back to determine if successfully sent, but couldn't get back after state was finalized
    //also tried using === 'PROCESSING" and "PENDING" but still no success
    // let newDoc = await getDoc(newDocRef)
    // while (newDoc.data().state !== 'SUCCESS' || newDoc.data().state === undefined) {
    //     newDoc = await getDoc(newDocRef)
    //     console.log(newDoc.data().state)
    // }

    //     // return newDoc.data().state
}


export async function updatePostRequest(post) {
    const updateDocRef = doc(db, 'posts', post.id);

    if (post.wasRequested == false) {

        await updateDoc(updateDocRef, {
            wasRequested: true,
            firstRequestTime: Timestamp.fromDate(new Date()),
            numberOfRequests: increment(1)
        })
    } else {

        await updateDoc(updateDocRef, {
            numberOfRequests: increment(1)
        })
    }
}

export async function updatePostConfirmPickup(id) {
    const updateDocRef = doc(db, 'posts', id);

    await updateDoc(updateDocRef, {
        isAvailable: false
    })

    return 'success'
}

export async function updateLastLogin(uid) {
    const userDocRef = query(usersCollectionRef, where("ID", "==", uid));
    const querySnapshot = await getDocs(userDocRef);

    const docId = querySnapshot.docs[0].id

    const updateDocRef = (doc(db, 'users', docId))

    await updateDoc(updateDocRef, {
        lastLoginTimeStamp: Timestamp.fromDate(new Date())
    })
}

export async function addUser(userId, userEmail, zipArray) {
    const newDocRef = await addDoc(usersCollectionRef, {
        ID: userId,
        createdTimeStamp: Timestamp.fromDate(new Date()),
        lastLoginTimeStamp: Timestamp.fromDate(new Date()),
        email: userEmail,
        credits: 0,
        zipArray: zipArray,
        // plantRequests: requestedPlants,
        // searches: []
    })
}

export async function getZipArrayForUser(uid) {
    const q = query(usersCollectionRef, where("ID", "==", uid));
    const querySnapshot = await getDocs(q);

    return querySnapshot.docs[0].data().zipArray;
}

export async function getCreditsForUser(uid) {
    const q = query(usersCollectionRef, where("ID", "==", uid));
    const querySnapshot = await getDocs(q);

    return querySnapshot.docs[0].data().credits;
}

export async function updateCreditsForUser(uid, rating, postId) {
    const q = query(usersCollectionRef, where("ID", "==", uid));
    const querySnapshot = await getDocs(q);

    const docId = querySnapshot.docs[0].id

    const updateDocRef = (doc(db, 'users', docId))
    if (rating === 'good') {
        await updateDoc(updateDocRef, {
            credits: increment(1)
        })
    } else if (rating === 'poor') {
        await updateDoc(updateDocRef, {
            poorReviews: arrayUnion(postId)
        })
    } else {
        console.log('something went wrong with updating user credits/rating')
    }
}


export async function getKeyById(id) {
    const docRef = await doc(db, "keys", id);
    const postSnapshot = await getDoc(docRef);

    const key = postSnapshot.data().plantKey;

    return key;
}
