import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import Login from '../components/Login';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { Footer } from '../components/Footer';

export default function Layout() {

    const [loggedIn, setLoggedIn] = React.useState(false)

    const auth = getAuth();

    onAuthStateChanged(auth, (user) => {
        if (user) {
            // User is signed in, see docs for a list of available properties
            // https://firebase.google.com/docs/reference/js/auth.user
            //   const uid = user.uid;
            setLoggedIn(true);
            // ...
        } else {
            // User is signed out
            // ...
            setLoggedIn(false);
        }
    });

    return (
        <div id="body">
            <Header loggedIn={loggedIn} />
            <div>{!loggedIn && <Login />}</div>
            <Outlet context={[loggedIn, setLoggedIn]}/>
            <Footer />
        </div>

    )
}