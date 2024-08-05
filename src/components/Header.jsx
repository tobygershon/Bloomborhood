import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import logo from '../assets/MyBloomborhoodDark.png'
import { signOutUser } from '../services/firebaseAuthService.jsx';


export default function Header({ loggedIn }) {

    const [menuActive, setMenuActive] = React.useState(false);

    const navigate = useNavigate();

    function toggleNavMenu() {
        setMenuActive(!menuActive)
    }

    function handleClick() {
        toggleNavMenu();
        signOutUser();
        navigate("/")
        
    }

    return (

        <nav id="header" className="navbar has-background-grey-darker mb-4" role="navigation" aria-label="main navigation">
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
                    {
                        loggedIn && <Link onClick={handleClick} className="navbar-item has-text-grey-light"><button className="sign-out-btn">Sign Out</button></Link>
                    }
                    <Link onClick={toggleNavMenu} to="/About" className="navbar-item has-text-grey-light"><button className="sign-out-btn" >
                        About
                    </button></Link>
                    <Link onClick={toggleNavMenu} to="/Feedback" className="navbar-item has-text-grey-light"><button className="sign-out-btn">
                        Feedback
                    </button></Link>
                    <Link onClick={toggleNavMenu} to="/Share" className="navbar-item has-text-grey-light"><button className="sign-out-btn">
                        Share the Site
                    </button></Link>
                </div>
            </div>
        </nav >

    )
}