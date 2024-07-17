import React from "react";
import { updatePostRequest, addMail } from "../services/firebaseDBService";


export default function PostCard(props) {

    const [addressRequested, setAddressRequested] = React.useState(false)

    function addressRequest() {
        const subject = 'Bloomborhood Address Request';
        const html = `to: ${props.user.email}<br><h1>Requested Address</h1><br><h3>Address: ${props.post.address}</h3><br>
        <h3>Location: ${props.post.location}</h3><br><br><a href='https://bloomborhood.netlify.app/Confirm/${props.post.id}'>Click to verify pickup</a>`;

        setAddressRequested(true);
        alert("The address has been sent to your email")
        updatePostRequest(props.post)
        addMail('tgershon@hotmail.com', subject, html);
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
            if (days ) {
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

        </>
    )
}