import React from "react";
import { redirect } from "react-router-dom";
import Home from "../components/Home";
import SearchComponent from "../components/SearchComponent";
import { addPost, addCreditsForUser, getZipArrayForUser, updateUser, updatePostConfirmPickup } from "../services/firebaseDBService";
import { useOutletContext } from "react-router-dom";
import { getCreditsForUser } from "../services/firebaseDBService";

export async function loader() {
    let params = new URLSearchParams(document.location.search);
    const task = params.get('task');
    const postID = params.get('postID');
    const rating = params.get('rating')
    const userId = params.get('id')
    const pickUpId = params.get('pu')

    if (task === 'confirm') {
        const status = await updatePostConfirmPickup(postID, userId, rating, pickUpId)
        throw redirect(`/Confirm/${status}`)
    } else {
        return null;
    }
}

export default function HomeLayout() {
    console.log('homeLayout')

    const loggedIn = useOutletContext()[0];
    const user = useOutletContext()[1];

    const [userCredits, setUserCredits] = React.useState(0)    
    const [postModalOpen, setPostModalOpen] = React.useState(false);
    const [updateModalOpen, setUpdateModalOpen] = React.useState(false);
    const [buttonIsLoading, setButtonIsLoading] = React.useState(false);

    const [newPostFormData, setNewPostFormData] = React.useState({
        plantName: "",
        description: "",
        address: "",
        zip: "",
        location: ""
    })

    const [updateUserFormData, setUpdateFormData] = React.useState({
        zipArray: ""
    })

    React.useEffect(() => {
        async function getCredits() {
            const userCredits = await getCreditsForUser(user.uid);
            if (userCredits) {
                setUserCredits(userCredits);
            }
        }
        if (loggedIn) {
        getCredits();
        }
    }, [loggedIn])

    // credits icons array

    function showCreditIcons() {
        let creditArray = []
        for (let i = 0; i < userCredits; i++) {
            creditArray.push(<><i key={i + 1} className="fa-solid fa-seedling is-size-5"></i>&nbsp;</>);
        }

        return creditArray;
    }

    function togglePostModal() {
        setPostModalOpen(prevPostModalOpen => !prevPostModalOpen);
    }

    function toggleUpdateModal() {
        setUpdateModalOpen(prevUpdateModal => !prevUpdateModal)
    }

    async function openUpdateModal() {
        const array = await getZipArrayForUser(user.uid);
        const arrayString = array.join(' ')
        setUpdateFormData({
            zipArray: arrayString
        })

        toggleUpdateModal();

    }

    function handleNewPostFormChange(event) {

        setNewPostFormData((prevPostFormData) => (
            {
                ...prevPostFormData,
                [event.target.name]: event.target.value
            }
        ))
    }

    function handleUpdateFormChange(event) {

        setUpdateFormData((prevUpdateFormData) => (
            {
                ...prevUpdateFormData,
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
        addPost(newPostFormData.plantName, newPostFormData.description, newPostFormData.address, newPostFormData.zip, newPostFormData.location, user.uid, user.email);
        // setButtonIsLoading(false);
        togglePostModal();
        alert("Your Post has been submitted.  Thank you!")
        resetNewPostFormData();

    }

    function handleUpdateUser() {
        const newArray = updateUserFormData.zipArray.trim().replaceAll(",", "").split(" ").filter((zip) => zip.length === 5);
        updateUser(user.uid, newArray)
        toggleUpdateModal()
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
                                        <button id="post-btn" onClick={togglePostModal} className="button has-text-weight-semibold is-size-7-mobile has-text-primary-80-invert is-centered is-responsive">Post Your Plants</button>
                                    </div>
                                </div>
                                <div>
                                        <button id="update-btn" onClick={openUpdateModal} className="button has-text-weight-semibold is-size-7-mobile has-text-primary-80-invert is-responsive">Update Profile</button>
                                    </div>
                               
                            </div>

                            {/* <div id="btn-box" className="level-right is-flex-mobile is-flex-direction-row">
                                
                               
                            </div> */}

                        </nav>
                    </div>
                   

                </section>

            }</div>

            <Home />
            <SearchComponent loggedIn={loggedIn} user={user} credits={userCredits}/>

            <div className={postModalOpen ? "modal is-active" : "modal"}>
                <div className="modal-background" onClick={togglePostModal}></div>
                <div className="modal-card">
                    <header className="modal-card-head">
                        <p className="modal-card-title">Share Your Extra Plants</p>
                        <button className="delete" aria-label="close" onClick={togglePostModal}></button>
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
                            <button className="button" onClick={togglePostModal}>Cancel</button>
                        </div>
                    </footer>
                </div>
            </div>

            <div className={updateModalOpen ? "modal is-active" : "modal"}>
                <div className="modal-background" onClick={toggleUpdateModal}></div>
                <div className="modal-card">
                    <header className="modal-card-head">
                        <p className="modal-card-title">Update your local zip codes</p>
                        <button className="delete" aria-label="close" onClick={toggleUpdateModal}></button>
                    </header>
                    <section className="modal-card-body">
                        <p className="control mb-2">
                            <input onChange={handleUpdateFormChange} className="input" type="text" placeholder="Local zip codes separated by a space" value={updateUserFormData.zipArray} name="zipArray" />
                        </p>
                    </section>
                    <footer className="modal-card-foot">
                        <div className="buttons">
                            <button className="button is-success" onClick={handleUpdateUser}>Save changes</button>
                            <button className="button" onClick={toggleUpdateModal}>Cancel</button>
                        </div>
                    </footer>
                </div>
            </div>

        </div>
    )
}