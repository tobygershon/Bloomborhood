import React from "react";
import { signInUser, newUserSignUp } from "../services/firebaseAuthService.jsx";
import { addUser, updateLastLogin, addMail } from "../services/firebaseDBService.jsx";

export default function Login() {

    const [loginFormData, setLoginFormData] = React.useState({
        email: "",
        password: ""
    });

    const [signUpFormData, setSignUpFormData] = React.useState({
        email: "",
        password: "",
        passwordAgain: "",
        requestedZips: "",
        // requestedPlants: []
    })

    const [signUpModalOpen, setSignUpModalOpen] = React.useState(false);
    const [learnModalOpen, setLearnModalOpen] = React.useState(false);
    const [passwordsMatch, setPasswordsMatch] = React.useState(true);
    const [buttonIsLoading, setButtonIsLoading] = React.useState(false);

    function handleFormChange(event) {

        setLoginFormData((prevData) => ({
            ...prevData,
            [event.target.name]: event.target.value
        }))

    }

    function handleNewUserFormChange(event) {

        setSignUpFormData((prevData) => ({
            ...prevData,
            [event.target.name]: event.target.value
        }))

    }

    function resetLoginData() {
        setLoginFormData({
            email: "",
            password: ""
        })
    }

    function resetSignUpData() {
        setSignUpFormData({
            email: "",
            password: "",
            passwordAgain: ""
        })
    }

   function handleSubmit() {
        try {
            const user = signInUser(loginFormData.email.toLowerCase(), loginFormData.password.toLowerCase());
                if (user) {
                updateLastLogin(user.uid)
                }
        } catch {
            alert("Sorry, something went wrong.  Please try again later")
        } finally {
          resetLoginData();  
        }    
    }

    async function handleNewUserSubmit() {
        const subj = "Welcome to MyBloomborhood!"
        const html = "<h2>Thank you for registering with MyBloomborhood!</h2><br><h3>Now that you're registered you can request addresses for posted plants, as well as share your extra plants and earn share credits!</h3><br><a href='https://bloomborhood.netlify.app/About'><button>Learn more</button></a><br><br><a href='https://bloomborhood.netlify.app/Share'><button>Share the Site!</button></a>"
        if (signUpFormData.password === signUpFormData.passwordAgain && signUpFormData.password.trim() !== "") {
            setButtonIsLoading(true);
            const zipArray = convertZipStringToArray(signUpFormData.requestedZips);
            try {
                const ID = await newUserSignUp(signUpFormData.email.toLowerCase(), signUpFormData.password.toLowerCase());
                if (ID) {
                    addUser(ID, signUpFormData.email.toLowerCase(), zipArray);
                    addMail(signUpFormData.email.toLowerCase(), subj, html)
                }
            } catch {
                alert('Sorry something went wrong.  Please make sure your email is not already registered')
            } finally {
            toggleSignUpModal();
            setButtonIsLoading(false);
            setPasswordsMatch(true);
            resetSignUpData();
            }
        } else {
            setPasswordsMatch(false);
        }
    }

    function convertZipStringToArray(zips) {
        const zipArray = zips.replaceAll(",", "").split(" ");
        return zipArray.filter((zip => zip.length === 5))
    }

    function toggleSignUpModal() {
        setSignUpModalOpen(prevModalOpen => !prevModalOpen);
    }

    function toggleLearnModal() {
        setLearnModalOpen(prevModalOpen => !prevModalOpen);
    }


    return (
        <section className="section pt-0 pb-2 px-0">

            <div className="container">
                <div className="background notification is-white py-0 px-0" >
                    <nav className="level mb-0">

                        <div className="level-left">

                        </div>
                        <div className="level-right">
                            <div className="level-item">
                                <div className="field has-addons">
                                    <p className="control">
                                        <input onChange={handleFormChange} className="input input-css" type="email" placeholder="email" value={loginFormData.email} name="email" />
                                    </p>
                                    <p className="control">
                                        <input onChange={handleFormChange} className="input input-css" type="text" placeholder="password" value={loginFormData.password} name="password" />
                                    </p>
                                    <p className="control">
                                        <button onClick={handleSubmit} className="button btn-css is-rounded has-text-weight-semibold has-text-primary-80-invert">Login</button>
                                    </p>
                                </div>
                            </div>
                            <div className="level-item">
                                <p className="subtitle is-5 has-text-weight-semibold">New?&nbsp;&nbsp;<button className="login-level-btn" onClick={toggleSignUpModal}>Register!</button></p>
                            </div>
                            <div className="level-item">
                                <p className="subtitle is-5 has-text-weight-semibold is-hidden-mobile"><button className="login-level-btn" onClick={toggleLearnModal}>Learn Why?</button></p>
                            </div>
                        </div>
                    </nav>
                </div>
            </div>

            <div className={signUpModalOpen ? "modal is-active" : "modal"}>
                <div className="modal-background" onClick={toggleSignUpModal}></div>
                <div className="modal-card">
                    <header className="modal-card-head modal-color">
                        <p className="modal-card-title has-text-weight-semibold has-text-primary-80-invert">Sign Up with Email</p>
                        <button className="delete" aria-label="close" onClick={toggleSignUpModal}></button>
                    </header>
                    <section className="modal-card-body">Create Username and Password
                        <p className="control mb-2">
                            <input onChange={handleNewUserFormChange} className="input input-css" type="email" placeholder="email" value={signUpFormData.email} name="email" />
                        </p>
                        <p className="control mb-2">
                            <input onChange={handleNewUserFormChange} className="input input-css" type="text" placeholder="password" value={signUpFormData.password} name="password" />
                        </p>
                        <p className={passwordsMatch ? "is-hidden" : ""}>Please make sure passwords match</p>
                        <p className="control mb-2">
                            <input onChange={handleNewUserFormChange} className="input input-css" type="text" placeholder="re-type password" value={signUpFormData.passwordAgain} name="passwordAgain" />
                        </p>
                        <p className="control">
                            <input onChange={handleNewUserFormChange} className="input input-css" type="text" placeholder="Enter your local 5 digit zip codes separated by SPACES ex.(10001 10002 etc)" value={signUpFormData.requestedZips} name="requestedZips" />
                        </p>
                        {/* <p className="control">
                            <input onChange={handleNewUserFormChange} className="input" type="text" placeholder="Enter any plant names to recieve email alerts when posted" value={signUpFormData.requestedPlants} name="requestedPlants" />
                        </p> */}
                    </section>
                    <footer className="modal-card-foot modal-color">
                        <div className="buttons">
                            <button className={buttonIsLoading ? "button is-success is-loading btn-css has-text-weight-semibold has-text-primary-80-invert" : "button is-success btn-css has-text-weight-semibold has-text-primary-80-invert"} onClick={handleNewUserSubmit}>Save changes</button>
                            <button className="button btn-css has-text-weight-semibold has-text-primary-80-invert" onClick={toggleSignUpModal}>Cancel</button>
                        </div>
                    </footer>
                </div>
            </div>

            <div className={learnModalOpen ? "modal is-active" : "modal"}>
                <div className="modal-background" onClick={toggleLearnModal}></div>
                <div className="modal-card">
                    <header className="modal-card-head modal-color">
                        <p className="modal-card-title has-text-weight-semibold has-text-primary-80-invert">Why should I sign up?</p>
                        <button className="delete" aria-label="close" onClick={toggleLearnModal}></button>
                    </header>
                    <section className="modal-card-body">
                        <div className="content">

                            <h6>Get Plants</h6>
                            <p>Anyone can search posts, but only logged in users have access to the pick-up address</p>
                            <h6>Share Plants</h6>
                            <p>Only registered users can post their extra plants to share</p>
                            <h6>Earn Credits</h6>
                            <p>When you share plants you earn credits that 'buy' you exclusive rights to pick up a post of your choice</p>
                            <h6>User Experience</h6>
                            <p>Logged in users recieve a more personalized experience</p>

                        </div>
                    </section>

                    <footer className="modal-card-foot modal-color">
                        <div className="buttons">
                            <button className="button btn-css has-text-weight-semibold has-text-primary-80-invert" onClick={toggleLearnModal} aria-label="close">Got it!</button>
                        </div>
                    </footer>
                </div>
            </div>

        </section >
    )
}