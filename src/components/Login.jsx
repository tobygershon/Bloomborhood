import React from "react";
import { signInUser, newUserSignUp } from "../services/firebaseAuthService.jsx";

export default function Login() {

    const [loginFormData, setLoginFormData] = React.useState({
        email: "",
        password: ""
    });

    const [signUpFormData, setSignUpFormData] = React.useState({
        email: "",
        password: "",
        passwordAgain: ""
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
        signInUser(loginFormData.email, loginFormData.password);
        resetLoginData();
    }

    function handleNewUserSubmit() {
        if (signUpFormData.password === signUpFormData.passwordAgain) {
            setButtonIsLoading(true);
            newUserSignUp(signUpFormData.email, signUpFormData.password);
            //add error handling.  if submitted w/o any imputs it gets stuck loading
            setButtonIsLoading(false);
            resetSignUpData();
        } else {
            setPasswordsMatch(false);
        }
    }

    function toggleModal() {
        setModalOpen(prevModalOpen => !prevModalOpen);
    }


    return (
        <section className="section pt-2 pb-5">
    
                    <nav className="level mb-0">

                        <div className="level-left">
                            <div className="level-item">
                                <p className="subtitle is-5 has-text-weight-semibold">Why Login?</p>
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

                    <div className={modalOpen ? "modal is-active" : "modal"}>
                        <div className="modal-background" onClick={toggleModal}></div>
                        <div className="modal-card">
                            <header className="modal-card-head">
                                <p className="modal-card-title">Sign Up with Email</p>
                                <button className="delete" aria-label="close" onClick={toggleModal}></button>
                            </header>
                            <section className="modal-card-body">Name
                                <p className="control">
                                    <input onChange={handleNewUserFormChange} className="input" type="email" placeholder="email" value={signUpFormData.email} name="email" />
                                </p>
                                <p className="control">
                                    <input onChange={handleNewUserFormChange} className="input" type="text" placeholder="password" value={signUpFormData.password} name="password" />
                                </p>
                                <p className={passwordsMatch ? "is-hidden" : ""}>Please make sure passwords match</p>
                                <p className="control">
                                    <input onChange={handleNewUserFormChange} className="input" type="text" placeholder="re-type password" value={signUpFormData.passwordAgain} name="passwordAgain" />
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

        </section>
    )
}