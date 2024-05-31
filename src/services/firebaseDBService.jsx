
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

export async function getAllPosts() {
    const postsSnapshot = await getDocs(postsCollectionRef);
    const dataArray = postsSnapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id
    }));

    return dataArray;
}

export async function getPostsByZip(zip) {

    const q = query(postsCollectionRef, where("zip", "==", zip));

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
  // doc.data() is never undefined for query doc snapshots
    console.log(doc.id, " => ", doc.data());
});

    //to get query list of posts:
    // import query and where above from firestore
    // instead of getDocs on postsCollectionRef, do this ex: const query = query(postsCollectionRef, where("plantName", "==", "hosta"));
    //then use query in getDocs(query)

    
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

export async function addPost(plantNameInput, descriptionInput, otherInput) {
    const newDocRef = await addDoc(postsCollectionRef, {
        address: "front end test address post",
        description: descriptionInput,
        plantName: plantNameInput,
        other: otherInput,
        postTime: Timestamp.fromDate(new Date()),
        wasRequested: false
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