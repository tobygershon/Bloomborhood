import React from "react";
import { updatePostRequest, addMail, deductCreditForUser, updatePostConfirmPickup, updatePostWhenShareCreditUsed } from "../services/firebaseDBService";


export default function PostCard(props) {

    const [modalOpen, setModalOpen] = React.useState(false);

    function toggleModal() {
        setModalOpen(!modalOpen)
    }

    const [addressRequested, setAddressRequested] = React.useState(false)

    function addressRequest() {
        const subject = 'MyBloomborhood Address Request';
        const html = `<h2>Requested Address for ${props.post.plantName} pickup</h2><br><h3>Address: ${props.post.address}</h3><br>
        <h3>Location: ${props.post.location}</h3><br>
        <h3>After picking up, <em>DON'T FORGET</em> to confirm below</h3>
        <p>Were the plants EXCELLENT quality? Click to confirm <a href='https://bloomborhood.netlify.app?task=confirm&postID=${props.post.id}&rating=good&id=${props.post.userId}&pu=${props.user.uid}'><button>pickup</button></a><br>
        <p>Were the plants ACCEPTABLE quality? Click to confirm <a href='https://bloomborhood.netlify.app?task=confirm&postID=${props.post.id}&rating=good&id=${props.post.userId}&pu=${props.user.uid}'><button>pickup</button></a><br>
        <p>Were the plants as good as DEAD WEEDS? Click to confirm <a href='https://bloomborhood.netlify.app?task=confirm&postID=${props.post.id}&rating=poor&id=${props.post.userId}&pu=${props.user.uid}'><button>pickup</button></a>`;
        //check to see if requesting user is same as posting user
        if (props.post.userId !== props.user.uid) {
            setAddressRequested(true);
            openModal();
            updatePostRequest(props.post, props.user);
            addMail(props.user.email, subject, html);
        } else {
            alert("Sorry! You can't request your own posting")
        }
    }

    function openModal() {
        (props.credits >= 1 && props.post.wasRequested === false) ? toggleModal() : alert("The address has been sent to your email");
    }

    function useCredits() {
        deductCreditForUser(props.user.uid);
        //set isAvailable to false
        updatePostWhenShareCreditUsed(props.post.id)
        alert("Great!  The address has been sent to your email.  You are the only one who can see this address, so no need to rush to pick up the plants.")
        toggleModal()
    }

    function doNotUseCredits() {
        toggleModal()
        alert("The address has been sent to your email")

    }

    function getTimeFromLastRequest(requestTime) {
        const currentDate = new Date();
        const timeDiffSec = (currentDate.getTime() / 1000) - requestTime.seconds;
        const timeDiffMin = timeDiffSec / 60
        const timeDiffHours = timeDiffMin / 60
        const timeDiffDays = timeDiffHours / 24

        let days = 0;
        let hours = 0;
        let min = 0;

        if (timeDiffDays >= 1) {
            days = Math.floor(timeDiffDays)
        }
        if (timeDiffHours >= 1) {
            hours = Math.floor(timeDiffHours)
        }
        if (timeDiffMin >= 2) {
            min = Math.floor(timeDiffMin)
        }

        let returnTime = "";
        if (days) {
            returnTime = `${days} day` + (days === 1 ? "" : "s");
        } else if (hours) {
            returnTime = `${hours} hour` + (hours === 1 ? "" : "s");
        } else if (min) {
            returnTime = `${min} minutes`;
        } else {
            returnTime = '1 minute';
        }



        return returnTime;
    }



    return (
        <>
            <div className="container my-4 search-container">
                <div className="notification has-background-white-ter search-box">
                    <div className="columns is-gapless">
                        <div className="column ">
                            <div className="post-box box-1 is-flex is-flex-direction-column is-align-items-center is-justify-content-center has-text-weight-semibold px-4">
                                <p className="is-flex is-justify-content-center is-size-7 is-size-6-desktop is-flex is-align-items-center has-text-grey">
                                    <i className="fa-solid fa-seedling is-size-5"></i><span className="ml-2 is-size-5 is-size-4-desktop has-text-dark">{props.post.plantName}</span>
                                </p>

                            </div>
                        </div>
                        <div className="column">
                            <div className="post-box box-2 is-flex is-flex-direction-column is-align-items-center is-justify-content-center has-text-dark is-size-6 is-size-5-desktop has-text-weight-semibold px-4">
                                <p className="is-flex is-justify-content-center is-align-items-center is-size-7 is-size-6-desktop has-text-grey">
                                    <i className="fas fa-stream is-size-5"></i><span className="ml-4 has-text-weight-semibold has-text-dark">{props.post.description}</span>
                                </p>
                            </div>
                        </div>
                        <div className="column">
                            <div className="post-box box-3 is-flex is-flex-direction-column is-align-items-center is-justify-content-space-evenly has-text-dark is-size-7 is-size-6-desktop px-4">

                                {!addressRequested && <div>
                                    <span className="is-flex is-justify-content-center ">{props.post.wasRequested ? "Requested " + props.post.numberOfRequests + " time" + (props.post.numberOfRequests === 1 ? "" : "s") : "Be the first to request!"}</span>
                                    <span className="is-flex is-justify-content-center is-size-7">{props.post.wasRequested ? "First request: " + getTimeFromLastRequest(props.post.firstRequestTime) + " ago" : ""}</span>
                                </div>}


                                {!addressRequested && props.post.plantName !== "Sample Post" && props.loggedIn && <button className="button" onClick={addressRequest}>Request Address</button>}
                                {!addressRequested && props.post.plantName !== "Sample Post" && !props.loggedIn && <div className="hover-div"><button className="button" onClick={""} disabled>Request Address</button></div>}
                                {!addressRequested && props.post.plantName === "Sample Post" && <button className="button" onClick={addressRequest} disabled>Request Address</button>}
                                {addressRequested && "Note: The policy is first come, first serve.  Your plants may not be available by the time you pick up."}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className={modalOpen ? "modal is-active" : "modal"}>
                <div onClick={toggleModal} className="modal-background"></div>
                <div className="modal-card">
                    <header className="modal-card-head modal-color">
                        <p className="modal-card-title has-text-weight-semibold has-text-primary-80-invert">Use your share credit?</p>
                        <button onClick={toggleModal} className="delete" aria-label="close"></button>
                    </header>
                    <section className="modal-card-body">
                        <p>Do you want to use one of your share credits to ensure that you are the only person who can request the address?</p>
                    </section>
                    <footer className="modal-card-foot modal-color">
                        <div className="buttons">
                            <button onClick={useCredits} className="button btn-css has-text-weight-semibold has-text-primary-80-invert">Yes!</button>
                            <button onClick={doNotUseCredits} className="button btn-css has-text-weight-semibold has-text-primary-80-invert">No Thanks</button>
                        </div>
                    </footer>
                </div>
            </div>

        </>
    )
}