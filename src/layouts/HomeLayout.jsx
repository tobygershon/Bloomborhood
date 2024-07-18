import React from "react";
import { redirect } from "react-router-dom";
import Home from "../components/Home";
import SearchComponent from "../components/SearchComponent";
import { addPost } from "../services/firebaseDBService";
import { useOutletContext } from "react-router-dom";
import { getCreditsForUser } from "../services/firebaseDBService";

export function loader() {
    let params = new URLSearchParams(document.location.search);
    const task = params.get('task');
    const id = params.get('id');

    if (task === 'confirm') {
        throw redirect(`/Confirm/${id}`)
    } else {
        return null;
    }
}

export default function HomeLayout() {
    console.log('homeLayout')

    const loggedIn = useOutletContext()[0];
    const user = useOutletContext()[1];

    const [userCredits, setUserCredits] = React.useState(0)    
    const [modalOpen, setModalOpen] = React.useState(false);
    const [buttonIsLoading, setButtonIsLoading] = React.useState(false);

    const [newPostFormData, setNewPostFormData] = React.useState({
        plantName: "",
        description: "",
        address: "",
        zip: "",
        location: ""
    })

    React.useEffect(() => {
        async function getCredits() {
            const userCredits = await getCreditsForUser(user.uid);
            if (userCredits) {
                setUserCredits(userCredits);
            }
        }
        if (user.uid) {
        getCredits();
        }
    }, [user.uid])

    // credits icons array

    function showCreditIcons() {
        let creditArray = []
        for (let i = 0; i < userCredits; i++) {
            creditArray.push(<><i key={i + 1} className="fa-solid fa-seedling is-size-5"></i>&nbsp;</>);
        }

        return creditArray;
    }

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
        addPost(newPostFormData.plantName, newPostFormData.description, newPostFormData.address, newPostFormData.zip, newPostFormData.location, user.uid);
        // setButtonIsLoading(false);
        toggleModal();
        alert("Your Post has been submitted.  Thank you!")
        resetNewPostFormData();

    }

    return (
        <div>
            <div>{loggedIn &&
                <section className="section py-0 px-0" >
                    
                    <div className="background notification is-white py-0 px-0" >
                        <nav className="level py-0 mx-5 my-3">
                            <div className="level-left is-flex is-flex-direction-row">
                                <div className="level-item has-text-centered">
                                    <div>
                                        <span className="is-size-5 has-text-weight-semibold is-hidden-mobile">Welcome! {userCredits ? `You Have ${userCredits} Share Credit${userCredits > 1 ? "'s" : ""}` : ""}&nbsp;{showCreditIcons()}</span>
                                    </div>
                                </div> 
                                <div className="level-item has-text-centered">
                                    <div>
                                        <button id="post-btn" onClick={toggleModal} className="button has-text-weight-semibold is-size-7-mobile has-text-primary-80-invert is-centered is-responsive">Post Your Plants</button>
                                    </div>
                                </div>
                                <div>
                                        <button id="update-btn" className="button has-text-weight-semibold is-size-7-mobile has-text-primary-80-invert is-responsive">Update Profile</button>
                                    </div>
                               
                            </div>

                            {/* <div id="btn-box" className="level-right is-flex-mobile is-flex-direction-row">
                                
                               
                            </div> */}

                        </nav>
                    </div>
                   

                </section>

            }</div>

            <Home />
            <SearchComponent loggedIn={loggedIn} user={user} />

            <div className={modalOpen ? "modal is-active" : "modal"}>
                <div className="modal-background" onClick={toggleModal}></div>
                <div className="modal-card">
                    <header className="modal-card-head">
                        <p className="modal-card-title">Share Your Extra Plants</p>
                        <button className="delete" aria-label="close" onClick={toggleModal}></button>
                    </header>
                    <section className="modal-card-body">
                        <p className="control mb-2">
                            <input onChange={handleNewPostFormChange} className="input" type="text" placeholder="Plant Name" value={newPostFormData.plantName} name="plantName" />
                        </p>
                        <p className="control mb-2">
                            <input onChange={handleNewPostFormChange} className="input" type="text" placeholder="Description (under 50 letters please)" value={newPostFormData.description} name="description" />
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