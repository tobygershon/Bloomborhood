import React from "react";
import { getPostById } from "../services/firebaseDBService";

export default function PostCard(props) {

    const [isExpanded, setIsExpanded] = React.useState(false);
    const [addressRequested, setAddressRequested] = React.useState(false)
    const [requestedAddress, setRequestedAddress] = React.useState("")

    function toggleExpanded() {
        setIsExpanded(!isExpanded);
    }

    async function addressRequest() {

        setAddressRequested(!addressRequested);
        const requestedPost = await getPostById(props.post.id)
        setRequestedAddress(requestedPost.address)
    }

    return (
        <>
            <div onClick={toggleExpanded}>{!isExpanded &&
                <div className="container my-3 search-container">
                    <div className="notification is-white search-box">
                        <div className="columns">
                            <div className="column is-flex is-flex-direction-column">
                                <span className="is-flex is-justify-content-center is-size-5 has-text-weight-semibold mb-1">{props.post.plantName}</span>
                                <span className="is-flex is-justify-content-center">{props.post.description}</span>
                            </div>
                            <div className="column">
                                <span className="">{props.post.wasRequested ? "was requested" : "not yet requested"}</span>
                            </div>
                            <div className="column">
                                <button className="button" onClick={addressRequest}>
                                    {addressRequested ? "Hide Address" : "Show Address"}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            }</div>

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