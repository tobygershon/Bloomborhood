import React from "react";
import Home from "../components/Home";
import SearchComponent from "../components/SearchComponent";
import { addPost } from "../services/firebaseDBService";
import { useOutletContext, redirect } from "react-router-dom";

export default function HomeLayout() {


    const [loggedIn, setLoggedIn] = useOutletContext();
    const [modalOpen, setModalOpen] = React.useState(false);
    const [buttonIsLoading, setButtonIsLoading] = React.useState(false);
    const [counter, setCounter] = React.useState(0);

    console.log("homelayout render")

    const [newPostFormData, setNewPostFormData] = React.useState({
        plantName: "",
        description: "",
        other: ""
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
            other: ""
        })
    }

    function handleNewPostSubmit() {

        // setButtonIsLoading(true);
        //make sure to add any other necessary post object fields here
        addPost(newPostFormData.plantName, newPostFormData.description, newPostFormData.other);
        // setButtonIsLoading(false);
        toggleModal();
        resetNewPostFormData();
        setCounter(prev => prev + 1);
    }

    return (
        <div>
            <div>{loggedIn &&
                <nav className="level mb-3">
                    <div className="level-item has-text-centered">
                        <div>
                            <button id="post-btn" onClick={toggleModal} className="button has-text-primary-80-invert has-text-weight-semibold is-centered">Post your Plants to Share!</button>
                        </div>
                    </div>
                </nav>

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
                    <section className="modal-card-body">Name
                        <p className="control">
                            <input onChange={handleNewPostFormChange} className="input" type="text" placeholder="Plant Name" value={newPostFormData.plantName} name="plantName" />
                        </p>
                        <p className="control">
                            <input onChange={handleNewPostFormChange} className="input" type="text" placeholder="Description" value={newPostFormData.description} name="description" />
                        </p>
                        <p className="control">
                            <input onChange={handleNewPostFormChange} className="input" type="text" placeholder="other" value={newPostFormData.other} name="other" />
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