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
                <div className="notification has-background-white-ter search-box">
                    <div className="columns is-gapless">
                        <div className="column ">
                            <div className="box box-1 is-flex is-flex-direction-column is-align-items-center is-justify-content-center has-text-weight-semibold">
                                <p className="is-flex is-justify-content-center is-size-7 is-size-6-desktop is-flex is-align-items-center has-text-grey">Type of Plant: <span className="ml-1 mb-1 is-size-5 is-size-4-desktop has-text-dark">{props.post.plantName}</span></p>
                                <p className="is-flex is-justify-content-center is-size-7 is-size-6-desktop has-text-grey">Description: <span className="ml-1 has-text-weight-semibold has-text-dark">{props.post.description}</span></p>
                            </div>
                        </div>
                        <div className="column">
                            <div className="box box-2 is-flex is-flex-direction-column is-align-items-center is-justify-content-center has-text-dark is-size-6 is-size-5-desktop has-text-weight-semibold">
                                <span className="is-flex is-justify-content-center ">{props.post.wasRequested ? "Has been requested " + props.post.numberOfRequests + " time" + (props.post.numberOfRequests === 1 ? "" : "s") : "Be the first to request!"}</span>
                                <span className="is-flex is-justify-content-center ">{props.post.wasRequested ? "Was first requested at " + props.post.firstRequestTime : ""}</span>
                            </div>
                        </div>
                        <div className="column">
                            <div className="box box-3 is-flex is-flex-direction-column is-align-items-center is-justify-content-center has-text-dark is-size-7 is-size-6-desktop ">
                                <div>{!addressRequested && <button className="button" onClick={addressRequest}>Request Address</button>}</div>
                                <div>{addressRequested && "Remember, the policy is first come first serve.  Right now your plants are still listed as available, but may not be by the time you pick up"}</div>
                            </div>
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