import React from "react";
import { useLoaderData, useOutletContext, useParams, useLocation } from "react-router-dom";
import PostCard from "./PostCard"
import { getPostsForUser, getZipArrayForUser } from '../services/firebaseDBService'
import { getCurrentUser2 } from "../services/firebaseAuthService";


export default function PostsList() {

    const [modalOpen, setModalOpen] = React.useState(false)
    const posts = useOutletContext()[0];
    const samplePost = useOutletContext()[5]
    const loggedIn = useOutletContext()[1];
    const user = useOutletContext()[2];
    const credits = useOutletContext()[3];

    const postCards = posts.filter((post) => post.isAvailable === true).map(post => {
        return <PostCard key={post.id} post={post} loggedIn={loggedIn} user={user} credits={credits} />
    })

    

    return (
        <>
            
                {postCards.length > 0 ? postCards : <div><h3 className="is-size-6 has-text-dark has-text-weight-bold" >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Sorry, no results for this zip code</h3><PostCard post={samplePost} /></div>}

        </>
    )
}