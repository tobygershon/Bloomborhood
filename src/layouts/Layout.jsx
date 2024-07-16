import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import Login from '../components/Login';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { updateLastLogin } from '../services/firebaseDBService';
import { Footer } from '../components/Footer';

export default function Layout() {
    console.log('layout')

    const [loggedIn, setLoggedIn] = React.useState(false);
    const [userId, setUserId] = React.useState("");

    const auth = getAuth();

    onAuthStateChanged(auth, (user) => {
        if (user) {
            // User is signed in, see docs for a list of available properties
            // https://firebase.google.com/docs/reference/js/auth.user
            setUserId(user.uid);
            setLoggedIn(true);
            updateLastLogin(user.uid)
            console.log("user exists")
            // ...
        } else {
            // User is signed out
            setUserId("");
            setLoggedIn(false);
            console.log('no user')
        }
    });

    return (
        <div id="body">
            <Header loggedIn={loggedIn} />
            <div>{!loggedIn && <Login />}</div>
            <Outlet context={[loggedIn, userId]}/>
            <Footer />
        </div>

    )
}