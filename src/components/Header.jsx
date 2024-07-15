import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../assets/MyBloomborhoodDark.png'
import { signOutUser } from '../services/firebaseAuthService.jsx';


export default function Header({ loggedIn }) {

    const [menuActive, setMenuActive] = React.useState(false);

    function toggleNavMenu() {
        menuActive ?
            setMenuActive(false)
            : setMenuActive(true)
    }

    function handleClick() {
        signOutUser();
    }

    return (

        <nav id="header" className="navbar has-background-grey-darker" role="navigation" aria-label="main navigation">
            <div className="navbar-brand">

                <Link to={loggedIn ? "Posts" : "/"} className="navbar-item px-4 py-3 mb-1" >
                    <img src={logo} alt="My Bloomborhood logo" style={{ width: 250 }} />
                </Link>

                <a role="button" onClick={toggleNavMenu} className={`navbar-burger ${menuActive ? "is-active" : ""}`} aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                </a>
            </div>

            {/* need to toggle is-active class below when burger is clicked*/}
            <div id="navbarBasicExample" className={`navbar-menu ${menuActive ? "is-active" : ""}`}>
                <div className="navbar-end">
                    <div className="navbar-item">{
                        loggedIn && <button id="sign-out-btn" onClick={handleClick}>Sign Out</button>
                    }</div>
                    <Link to="/About" className="navbar-item">
                        About
                    </Link>
                    <Link className="navbar-item">
                        Contact
                    </Link>
                    <Link className="navbar-item">
                        Report an issue
                    </Link>
                </div>
            </div>
        </nav >

    )
}