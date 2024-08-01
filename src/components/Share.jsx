import React from 'react'
import { addMail } from '../services/firebaseDBService'

export default function Share() {

    const [formData, setFormData] = React.useState({
        name: "",
        email: "",
        textArea: ""
    })

    function handleFormChange(event) {
        setFormData((prevData) => ({
            ...prevData,
            [event.target.name]: event.target.value
        }))
    }

    function handleResetInput() {
        setFormData({
            name: "",
            email: "",
            textArea: ""
        })
    }

    function handleSubmit() {
        const subjForSubmit = `${formData.name} shared MyBloomborhood with you!`
        const htmlForSubmit = `<h3>${formData.name} wants to share <a href="https://bloomborhood.netlify.app">My Bloomborhood</a> with you!</h3><br>
                            <p>${formData.textArea}</p><br>
                            <p><a href="https://bloomborhood.netlify.app">My Bloomborhood</a> helps neighbors share their extra plants, and participate in beautifying your bloomborhood!</p><br>
                            <h4>bloomborhood.netlify.app</h4>`

        const emailArray = formData.email.replaceAll(",", "").split(" ").filter((email) => email.length > 5);
        for (let email of emailArray) {
            addMail(email, subjForSubmit, htmlForSubmit)
        }
        handleResetInput()
        alert("Thanks for sharing!")
    }

    // function handleCopyClick(event) {
    //     window.Clipboard
    // }


    return (
        <>
            <section className="section pt-2 pb-4">
                <div className="container">
                    <div className="share-background notification has-text-grey-dark">

                        <h1 className="title mb-2">Share the Site!</h1>
                        <h2 className="subtitle">
                            MyBloomborhood only works if lots of people in your neighborhood use the site.  Share us with friends, family, and neighbors to help build a vibrant bloomborhood near you.
                        </h2>
                        <div className="columns">
                            <div className="container column is-four-fifths is-centered">
                                <div className="notification is-size-5 is-size-6-touch has-text-weight-bold is-flex is-justify-content-space-around is-align-items-center is-hidden-mobile">
                                    Share our URL address:
                                    <div className="block has-text-grey is-size-6-touch is-size-7-mobile is-flex is-align-items-center my-0">https://bloomborhood.netlify.app</div>
                                    {/* <span className="tag is-flex is-align-items-center"> Copy </span> */}
                                </div>
                            </div>
                        </div>
                        <div className="columns">
                        <div className="block column is-size-3 is-size-4-mobile is-4 is-offset-4 is-flex is-justify-content-center is-hidden-mobile">
                            - OR -
                        </div>
                        </div>

                        <div className="field">
                            <label className="label has-text-grey-dark">Please Type Your Name</label>
                            <div className="control">
                                <input onChange={handleFormChange} className="input input-css" type="text" placeholder="Your name" name="name" value={formData.name} />
                            </div>
                        </div>

                        <div className="field">
                            <label className="label has-text-grey-dark">Type the Email Addresses that You'd Like Us to Share MyBloomborhood With.</label>
                            <div className="control">
                                <input onChange={handleFormChange} className="input input-css" type="text" placeholder="Emails separated by spaces" name="email" value={formData.email} />
                            </div>
                        </div>

                        <div className="field">
                            <label className="label has-text-grey-dark">Type a Message if You'd Like</label>
                            <div className="control">
                                <textarea onChange={handleFormChange} className="textarea input-css" placeholder="Feel free to type a message here" value={formData.textArea} name="textArea"></textarea>
                            </div>
                        </div>

                        <div className="field is-grouped">
                            <div className="control">
                                <input onClick={handleSubmit} className="button is-responsive btn-css has-text-weight-semibold has-text-primary-80-invert" type="submit" value="Submit" />
                            </div>
                            <div className="control">
                                <input onClick={handleResetInput} className="button is-responsive btn-css has-text-weight-semibold has-text-primary-80-invert" type="reset" value="Reset Form" />
                            </div>
                        </div>
                    </div>
                </div>

            </section>
        </>
    )
}