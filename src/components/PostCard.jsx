import React from "react";
import { getPostById, updatePost } from "../services/firebaseDBService";

export default function PostCard(props) {

    const [addressRequested, setAddressRequested] = React.useState(false)

    function addressRequest() {

        setAddressRequested(true);
        alert("The address has been sent to your email")
        updatePost(props.post)
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

            if (min) {
                returnTime += `${min - hours * 60} minutes`;
            } else {
                returnTime += '1 minute';
            }
            if (hours) {
                returnTime = `${hours - days * 24} hours, ` + returnTime;
            }
            if (days) {
                returnTime = `${days} days, ` + returnTime;
            }

           return returnTime; 
        } 

        
    
    return (
        <>

            <div className="container my-4 search-container">
                <div className="notification has-background-white-ter search-box">
                    <div className="columns is-gapless">
                        <div className="column ">
                            <div className="post-box box-1 is-flex is-flex-direction-column is-align-items-center is-justify-content-center has-text-weight-semibold">
                                <p className="is-flex is-justify-content-center is-size-7 is-size-6-desktop is-flex is-align-items-center has-text-grey">
                                    <i className="fa-solid fa-seedling is-size-5"></i><span className="ml-2 is-size-5 is-size-4-desktop has-text-dark">{props.post.plantName}</span>
                                </p>

                            </div>
                        </div>
                        <div className="column">
                            <div className="post-box box-2 is-flex is-flex-direction-column is-align-items-center is-justify-content-center has-text-dark is-size-6 is-size-5-desktop has-text-weight-semibold">
                                <p className="is-flex is-justify-content-center is-align-items-center is-size-7 is-size-6-desktop has-text-grey">
                                    <i className="fas fa-stream is-size-5"></i><span className="ml-2 has-text-weight-semibold has-text-dark">{props.post.description}</span>
                                    </p>
                            </div>
                        </div>
                        <div className="column">
                            <div className="post-box box-3 is-flex is-flex-direction-column is-align-items-center is-justify-content-space-evenly has-text-dark is-size-7 is-size-6-desktop ">

                                {!addressRequested && <div>
                                    <span className="is-flex is-justify-content-center ">{props.post.wasRequested ? "Requested " + props.post.numberOfRequests + " time" + (props.post.numberOfRequests === 1 ? "" : "s") : "Be the first to request!"}</span>
                                    <span className="is-flex is-justify-content-center is-size-7">{props.post.wasRequested ? "First request: " + getTimeFromLastRequest(props.post.firstRequestTime) + " ago" : ""}</span>
                                </div>}


                                <div>{!addressRequested && <button className="button" onClick={addressRequest}>Request Address</button>}</div>
                                <div>{addressRequested && "Remember, the policy is first come first serve.  Right now your plants are still listed as available, but may not be by the time you pick up"}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}