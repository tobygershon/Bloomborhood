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
            <div onClick={toggleExpanded}>{ !isExpanded &&
                <div className="container my-3 search-container">
                    <div className="notification is-white">
                        <div className="columns">
                            <div className="column">{props.post.plantName}</div>
                            <div className="column">{props.post.description}</div>
                             <div className="column">{props.post.wasRequested ? "was requested" : "not yet requested"}</div>
                            <div className="column">
                                <button className="button" onClick={addressRequest}>
                                    {addressRequested ? "Hide Address" : "Show Address"}
                                </button>
                                </div>
                        </div>
                    </div>
                </div>
            }</div>

            <div onClick={toggleExpanded}>{ isExpanded &&
            <div className="container my-1">
                <div className="notification" >
                    <div className="columns">
                        <div className="column">Expanded info</div>
                        <div className="column">{props.post.description}</div>
                        <div className="column">{}</div>
                    </div>
                </div>
            </div>
            }</div>
        </>
    )
}