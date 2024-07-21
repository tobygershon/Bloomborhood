import React from 'react';
import { Outlet, redirect } from 'react-router-dom';
import Header from '../components/Header';
import Login from '../components/Login';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { updateLastLogin } from '../services/firebaseDBService';
import { Footer } from '../components/Footer';

    export default function Layout() {

        const [loggedIn, setLoggedIn] = React.useState(false);
        const [user, setUser] = React.useState("");

        const auth = getAuth();

        onAuthStateChanged(auth, (user) => {
            if (user) {
                // User is signed in, see docs for a list of available properties
                // https://firebase.google.com/docs/reference/js/auth.user
                setUser(user);
                setLoggedIn(true);
                updateLastLogin(user.uid)
                // ...
            } else {
                // User is signed out
                setUser("");
                setLoggedIn(false);
                console.log('no user')
            }
        });

        return (
            <div id="body">
                <Header loggedIn={loggedIn} />
                <div>{!loggedIn && <Login />}</div>
                <Outlet context={[loggedIn, user]} />
                <Footer />
            </div>

        )
    }