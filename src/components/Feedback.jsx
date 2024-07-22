import React from 'react'
import { addMail } from '../services/firebaseDBService'

export default function Feedback() {

    const [formData, setFormData] = React.useState({
        name: "",
        email: "",
        select: "",
        textArea: ""
    })

    function handleFormChange(event) {
        setFormData((prevFormData) => ({
            ...prevFormData,
            [event.target.name]: event.target.value
        })
        )
    }

    function handleResetInput() {
        setFormData({
            name: "",
            email: "",
            select: "",
            textArea: ""
        })
    }

    const htmlForSubmit = `<h3>From: ${formData.name} - ${formData.email} -</h3><br><p>${formData.textArea}</p>`

    function handleSubmit(event) {
        event.preventDefault();

        addMail('tgershon@hotmail.com', formData.select, htmlForSubmit);
        alert("Thanks for your input!")
        handleResetInput();
    }

    console.log(formData)


    return (
        <>

            <section className="section pt-2 pb-4">
                <div className="container">
                    <div id="feedback-background" className="notification has-text-grey-dark">

                        <h1 className="title">Feedback</h1>
                        <h2 className="subtitle">
                            Please submit any questions or comments and we'll get back to you as soon as possible.
                        </h2>

                        <div className="field">
                            <label className="label has-text-grey-dark">Please Type Your Name</label>
                            <div className="control">
                                <input onChange={handleFormChange} className="input input-css" type="text" placeholder="Name" name="name" value={formData.name} />
                            </div>
                        </div>

                        <div className="field">
                            <label className="label has-text-grey-dark">Please Type Your Email</label>
                            <div className="control">
                                <input onChange={handleFormChange} className="input input-css" type="email" placeholder="Email" name="email" value={formData.email} />
                            </div>
                        </div>

                        <div className="field">
                            <label className="label has-text-grey-dark">Type of Feedback</label>
                            <div className="control">
                                <div className="select">
                                    <select name="select" onChange={handleFormChange} value={formData.select}>
                                        <option value="">- Choose -</option>
                                        <option >Report a Problem</option>
                                        <option >Question</option>
                                        <option >Other Feedback</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="field">
                            <label className="label has-text-grey-dark">Message</label>
                            <div className="control">
                                <textarea onChange={handleFormChange} className="textarea input-css" placeholder="Type text here" value={formData.textArea} name="textArea"></textarea>
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