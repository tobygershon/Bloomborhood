import React from "react";
import { useLoaderData, useOutletContext, useParams, useLocation } from "react-router-dom";
import PostCard from "./PostCard"
import { getPostsForUser, getZipArrayForUser } from '../services/firebaseDBService'
import { getCurrentUser2 } from "../services/firebaseAuthService";


export default function PostsList() {
    console.log('PostsList')
    const [modalOpen, setModalOpen] = React.useState(false)
    const posts = useOutletContext()[0];
    const loggedIn = useOutletContext()[1];
    const user = useOutletContext()[2];
    const credits = useOutletContext()[3];

    const postCards = posts.filter((post) => post.isAvailable === true).map(post => {
        return <PostCard key={post.id} post={post} loggedIn={loggedIn} user={user} credits={credits} />
    })

    

    return (
        <>
            
                {postCards}

        </>
    )
}