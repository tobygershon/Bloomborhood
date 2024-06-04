import React from "react";
import { getPostById } from "../services/firebaseDBService";

export default function PostCard(props) {

    const [isExpanded, setIsExpanded] = React.useState(false);
    const [addressRequested, setAddressRequested] = React.useState(false)

    function toggleExpanded() {
        setIsExpanded(!isExpanded);
    }

    function addressRequest() {

        setAddressRequested(true);
        alert("The address has been sent to your email")
    }

    return (
        <>
            
                <div className="container my-4 search-container">
                    <div className="notification is-white search-box">
                        <div className="columns">
                            <div className="column is-flex is-flex-direction-column is-align-items-center is-justify-content-center">
                                <p className="is-flex is-justify-content-center is-size-6 is-flex is-align-items-center">Type of Plant: <span className="ml-1 mb-1 is-size-4 has-text-weight-semibold">{props.post.plantName}</span></p>
                                <p className="is-flex is-justify-content-center">Description: <span>{props.post.description}</span></p>
                            </div>
                            <div className="column is-flex is-flex-direction-column is-align-items-center is-justify-content-space-between">
                                <span className="is-flex is-justify-content-center is-size-5 is-text-weight-semibold">{props.post.wasRequested ? "Has been requested " + props.post.numberOfRequests + " time" + (props.post.numberOfRequests === 1 ? "" : "s") : "This hasn't been requested yet"}</span>
                                <span className="is-flex is-justify-content-center is-size-5 is-text-weight-semibold">{props.post.wasRequested ? "Was first requested at " + props.post.firstRequestTime : "Be the first to request!"}</span>
                            </div>
                            <div className="column is-flex is-flex-direction-column is-align-items-center is-justify-content-center">
                                <div>{ !addressRequested && <button className="button" onClick={addressRequest}>Request Address</button>}</div>
                                    <div>{ addressRequested && "Remember, the policy is first come first served.  Right now your plants are still listed as available, but may not be by the time you pick up"}</div> 
                                
                            </div>
                        </div>
                    </div>
                </div>

            <div onClick={toggleExpanded}>{isExpanded &&
                <div className="container my-1">
                    <div className="notification" >
                        <div className="columns">
                            <div className="column">Expanded info</div>
                            <div className="column">{props.post.description}</div>
                            <div className="column">{ }</div>
                        </div>
                    </div>
                </div>
            }</div>
        </>
    )
}