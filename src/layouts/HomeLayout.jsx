import React from "react";
import Home from "../components/Home";
import SearchComponent from "../components/SearchComponent";
import { addPost } from "../services/firebaseDBService";
import { useOutletContext } from "react-router-dom";

export default function HomeLayout() {


    const loggedIn = useOutletContext()[0];
    const userId = useOutletContext()[1];
    const [modalOpen, setModalOpen] = React.useState(false);
    const [buttonIsLoading, setButtonIsLoading] = React.useState(false);
    const [counter, setCounter] = React.useState(0);

    console.log(loggedIn)
    console.log(userId)


    const [newPostFormData, setNewPostFormData] = React.useState({
        plantName: "",
        description: "",
        address: "",
        zip: "",
        location: ""
    })

    function toggleModal() {
        setModalOpen(prevModalOpen => !prevModalOpen);
    }

    function handleNewPostFormChange(event) {

        setNewPostFormData((prevPostFormData) => (
            {
                ...prevPostFormData,
                [event.target.name]: event.target.value
            }
        ))
    }

    function resetNewPostFormData() {
        setNewPostFormData({
            plantName: "",
            description: "",
            address: "",
            zip: "",
            location: ""
        })
    }

    function handleNewPostSubmit() {

        // setButtonIsLoading(true);
        //make sure to add any other necessary post object fields here
        addPost(newPostFormData.plantName, newPostFormData.description, newPostFormData.address, newPostFormData.zip, newPostFormData.location, userId);
        // setButtonIsLoading(false);
        toggleModal();
        alert("Your Post has been submitted.  Thank you!")
        resetNewPostFormData();
        setCounter(prev => prev + 1);
    }

    return (
        <div>
            <div>{loggedIn &&
                <section className="section py-0" >
                    <div className="container">
                        <div className="notification is-white py-0" >
                            <nav className="level mt-4 mb-5">
                                <div className="level-left">
                                <div className="level-item has-text-centered">
                                        <div>
                                            <button className="button has-text-primary-80-invert has-text-weight-semibold ">Update Your Profile</button>
                                        </div>
                                    </div>
                                    <div className="level-item has-text-centered">
                                        <div>
                                            <span className="is-size-5 has-text-weight-semibold">Share Credits<i className="fa-solid fa-seedling is-size-5"></i></span>
                                        </div>
                                    </div>
                                    
                                </div>
                                <div className="level-right">
                                    <div className="level-item has-text-centered">
                                        <div>
                                            <button id="post-btn" onClick={toggleModal} className="button has-text-primary-80-invert has-text-weight-semibold is-centered">Post Plants to Share!</button>
                                        </div>
                                    </div>
                                </div>

                            </nav>
                        </div>
                    </div>
                </section>

            }</div>

            <Home />
            <SearchComponent counter={counter} />

            <div className={modalOpen ? "modal is-active" : "modal"}>
                <div className="modal-background" onClick={toggleModal}></div>
                <div className="modal-card">
                    <header className="modal-card-head">
                        <p className="modal-card-title">Create a Post to Share Your Extra Plants</p>
                        <button className="delete" aria-label="close" onClick={toggleModal}></button>
                    </header>
                    <section className="modal-card-body">
                        <p className="control mb-2">
                            <input onChange={handleNewPostFormChange} className="input" type="text" placeholder="Plant Name" value={newPostFormData.plantName} name="plantName" />
                        </p>
                        <p className="control mb-2">
                            <input onChange={handleNewPostFormChange} className="input" type="text" placeholder="Description" value={newPostFormData.description} name="description" />
                        </p>
                        <p className="control mb-2">
                            <input onChange={handleNewPostFormChange} className="input" type="text" placeholder="Address of Pickup" value={newPostFormData.address} name="address" />
                        </p>
                        <p className="control mb-2">
                            <input onChange={handleNewPostFormChange} className="input" type="text" placeholder="Zip Code of Pickup" value={newPostFormData.zip} name="zip" />
                        </p>
                        <p className="control">
                            <input onChange={handleNewPostFormChange} className="input" type="text" placeholder="Location of Plants (i.e. 'on the curb', 'by the front steps'" value={newPostFormData.location} name="location" />
                        </p>
                    </section>
                    <footer className="modal-card-foot">
                        <div className="buttons">
                            <button className={buttonIsLoading ? "button is-success is-loading" : "button is-success"} onClick={handleNewPostSubmit}>Save changes</button>
                            <button className="button" onClick={toggleModal}>Cancel</button>
                        </div>
                    </footer>
                </div>
            </div>

        </div>
    )
}