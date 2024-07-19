
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

export async function addPost(plantNameInput, descriptionInput, addressInput, zipInput, locationInput, postingUserId, userEmail) {
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

    //add postId to user's array of posts that they've submitted
    updateUserPosts(postingUserId, newDocRef.id)

    //send mail to user who posted confirming post and button to confirm pickup with 'poster' listed under pickupUser
    const subject = 'MyBloomborhood post confirmation'
    const html = `<h2>Thank you for posting to share your ${plantNameInput}!</h2><br>
                 <h4>If you notice that your plants have been picked up, <em>help us out</em> by 
                 <a href='https://bloomborhood.netlify.app?task=confirm&postID=${newDocRef.id}&rating=none&id=${postingUserId}&pu=poster'><button>Clicking Here</button></a>
                 to keep our system up to date!</h4>`
    addMail(userEmail, subject, html)
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


export async function updatePostRequest(post, user) {
    const updateDocRef = doc(db, 'posts', post.id);

    updateUserRequests(user.uid, post.id)

    if (post.wasRequested == false) {

        await updateDoc(updateDocRef, {
            wasRequested: true,
            firstRequestTime: Timestamp.fromDate(new Date()),
            numberOfRequests: increment(1),
            requestArray: arrayUnion({
                user: user.uid,
                requestTime: Timestamp.fromDate(new Date())
            })
        })
    } else {

        await updateDoc(updateDocRef, {
            numberOfRequests: increment(1),
            requestArray: arrayUnion({
                user: user.uid,
                requestTime: Timestamp.fromDate(new Date())
            })
        })
    }
}

export async function updatePostConfirmPickup(postId, postingUserId, rating, pickUpUserId) {
    console.log(postId)
    const updateDocRef = doc(db, "posts", postId);
    const docSnap = await getDoc(updateDocRef)

    if (docSnap.exists()) {
        
        console.log('exists')

    } else {
        console.log("No such document!");
    }

    const post = docSnap.data();

    //below I am checking whether it was already reported as picked up so that credit's arent given more than once.
    //isAvailable can't be used for this b/c it's changed to false before pickup when someone uses credit at request time.
    //the 2nd conditional is there to check if a pickup user was given, in the case that the post is reported as picked up by the user who posted.
    if (!post.pickUp || post.pickUp.pickUpUser === 'poster') {
        // needs to also account for posting user reporting as picked up?
        addCreditsForUser(postingUserId, rating, postId);
        await updateDoc(updateDocRef, {
            isAvailable: false,
            pickUp: {
                pickUpTime: Timestamp.fromDate(new Date()),
                pickUpUser: pickUpUserId,
                rating: rating
            }
        })
        return 'success'
    } else if (pickUpUserId === 'poster') {
        //in the case that pickUpUser already reported picking up, and then the user who posted reports pickup
        return 'success'
    } else {
        return 'failure'
    }
}

async function updateUserPosts(uid, postId) {
    const userDocRef = query(usersCollectionRef, where("ID", "==", uid));
    const querySnapshot = await getDocs(userDocRef);

    const docId = querySnapshot.docs[0].id

    const updateDocRef = (doc(db, 'users', docId))

    await updateDoc(updateDocRef, {
        posts: arrayUnion(postId)
    })
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

export async function updateUser(userId, zips) {
    const q = query(usersCollectionRef, where("ID", "==", userId));
    const querySnapshot = await getDocs(q);

    const docId = querySnapshot.docs[0].id

    const updateDocRef = (doc(db, 'users', docId))

    await updateDoc(updateDocRef, {
        zipArray: zips
    })
}

export async function updateUserRequests(userId, postId) {
    const q = query(usersCollectionRef, where("ID", "==", userId));
    const querySnapshot = await getDocs(q);

    const docId = querySnapshot.docs[0].id

    const updateDocRef = (doc(db, 'users', docId))

    await updateDoc(updateDocRef, {
        requestsArray: arrayUnion({
            post: postId,
            requestTime: Timestamp.fromDate(new Date())
        })
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

export async function addCreditsForUser(uid, rating, postId) {
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

export async function deductCreditForUser(uid) {
    const q = query(usersCollectionRef, where("ID", "==", uid));
    const querySnapshot = await getDocs(q);

    const docId = querySnapshot.docs[0].id

    const updateDocRef = (doc(db, 'users', docId))

    await updateDoc(updateDocRef, {
        credits: increment(-1)
    })
}


export async function getKeyById(id) {
    const docRef = await doc(db, "keys", id);
    const postSnapshot = await getDoc(docRef);

    const key = postSnapshot.data().plantKey;

    return key;
}
