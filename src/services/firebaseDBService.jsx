
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
import { getFirestore, collection, getDocs, doc, getDoc, addDoc, Timestamp, updateDoc, query, where } from "firebase/firestore/lite";  //remove lite if you want to use the full version with real-time updates 
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

export async function getAllPosts(zip) {

    let dataArray; 

    if (zip && zip.length === 5) {
        const q = query(postsCollectionRef, where("zip", "==", zip));
        const querySnapshot = await getDocs(q);
        dataArray = querySnapshot.docs.map(doc => ({
            ...doc.data(),
            id: doc.id
    }));

    } else {
    const postsSnapshot = await getDocs(postsCollectionRef);
    dataArray = postsSnapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id
    }));
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

export async function addUser(userId, userEmail) {
    const newDocRef = await addDoc(usersCollectionRef, {
        ID: userId,
        createdTimeStamp: Timestamp.fromDate(new Date()),
        lastLoginTimeStamp: Timestamp.fromDate(new Date()),
        email: userEmail,
        credits: 0
        // searchZips: requestedZips,
        // plantRequests: requestedPlants,
        // searches: []
    })
}

export async function updatePost(id) {
    const updateDocRef = doc(db, 'posts', id);

    await updateDoc(updateDocRef, {
        plantName: '',
        wasRequested: true,
        address: ''
    })
}

export async function getKeyById(id) {
    const docRef = await doc(db, "keys", id);
    const postSnapshot = await getDoc(docRef);

    const key = postSnapshot.data().plantKey;

    return key;
}