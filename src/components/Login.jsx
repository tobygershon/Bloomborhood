import React from "react";
import { signInUser, newUserSignUp } from "../services/firebaseAuthService.jsx";
import { addUser } from "../services/firebaseDBService.jsx";

export default function Login() {

    const [loginFormData, setLoginFormData] = React.useState({
        email: "",
        password: ""
    });

    const [signUpFormData, setSignUpFormData] = React.useState({
        email: "",
        password: "",
        passwordAgain: "",
        requestedZips: [],
        requestedPlants: []
    })

    const [modalOpen, setModalOpen] = React.useState(false);
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
        signInUser(loginFormData.email.toLowerCase(), loginFormData.password.toLowerCase());
        resetLoginData();
    }

    async function handleNewUserSubmit() {
        if (signUpFormData.password === signUpFormData.passwordAgain && signUpFormData.password.trim() !== "") {
            setButtonIsLoading(true);
            const ID = await newUserSignUp(signUpFormData.email.toLowerCase(), signUpFormData.password.toLowerCase());
            addUser(ID, signUpFormData.email.toLowerCase(), signUpFormData.requestedZips, signUpFormData.requestedPlants);
            //add error handling.  if submitted w/o any imputs it gets stuck loading
            setButtonIsLoading(false);
            // resetSignUpData();
            setPasswordsMatch(true);
        } else {
            setPasswordsMatch(false);
        }
    }

    function toggleModal() {
        setModalOpen(prevModalOpen => !prevModalOpen);
    }


    return (
        <section className="section pt-2 pb-5">

            <div className="container">
                <div className="notification is-white py-0" >
                    <nav className="level mb-0">

                        <div className="level-left">
                            <div className="level-item">
                                <p className="subtitle is-5 has-text-weight-semibold is-hidden-mobile">Why Login?</p>
                            </div>

                        </div>
                        <div className="level-right">
                            <div className="level-item">
                                <div className="field has-addons">
                                    <p className="control">
                                        <input onChange={handleFormChange} className="input" type="email" placeholder="email" value={loginFormData.email} name="email" />
                                    </p>
                                    <p className="control">
                                        <input onChange={handleFormChange} className="input" type="text" placeholder="password" value={loginFormData.password} name="password" />
                                    </p>
                                    <p className="control">
                                        <button onClick={handleSubmit} className="button">Login</button>
                                    </p>
                                </div>
                            </div>
                            <div className="level-item">
                                <p className="subtitle is-5 has-text-weight-semibold">New? <button onClick={toggleModal}>Sign Up!</button></p>
                            </div>
                        </div>
                    </nav>
                </div>
            </div>

            <div className={modalOpen ? "modal is-active" : "modal"}>
                <div className="modal-background" onClick={toggleModal}></div>
                <div className="modal-card">
                    <header className="modal-card-head">
                        <p className="modal-card-title">Sign Up with Email</p>
                        <button className="delete" aria-label="close" onClick={toggleModal}></button>
                    </header>
                    <section className="modal-card-body">Create Username and Password
                        <p className="control mb-2">
                            <input onChange={handleNewUserFormChange} className="input" type="email" placeholder="email" value={signUpFormData.email} name="email" />
                        </p>
                        <p className="control mb-2">
                            <input onChange={handleNewUserFormChange} className="input" type="text" placeholder="password" value={signUpFormData.password} name="password" />
                        </p>
                        <p className={passwordsMatch ? "is-hidden" : ""}>Please make sure passwords match</p>
                        <p className="control">
                            <input onChange={handleNewUserFormChange} className="input" type="text" placeholder="re-type password" value={signUpFormData.passwordAgain} name="passwordAgain" />
                        </p>
                        <p className="control mb-2">
                            <input onChange={handleNewUserFormChange} className="input" type="text" placeholder="Enter Local Zip Codes to Search" value={signUpFormData.requestedZips} name="requestedZips" />
                        </p>
                        <p className="control">
                            <input onChange={handleNewUserFormChange} className="input" type="text" placeholder="Enter any plant names to recieve email alerts when posted" value={signUpFormData.requestedPlants} name="requestedPlants" />
                        </p>
                    </section>
                    <footer className="modal-card-foot">
                        <div className="buttons">
                            <button className={buttonIsLoading ? "button is-success is-loading" : "button is-success"} onClick={handleNewUserSubmit}>Save changes</button>
                            <button className="button" onClick={toggleModal}>Cancel</button>
                        </div>
                    </footer>
                </div>
            </div>

        </section >
    )
}