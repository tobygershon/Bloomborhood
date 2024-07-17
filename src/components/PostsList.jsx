import React from "react";
import { useLoaderData, useOutletContext, useParams, useLocation} from "react-router-dom";
import PostCard from "./PostCard"
import { getPostsForUser, getZipArrayForUser } from '../services/firebaseDBService'
import { getCurrentUser2 } from "../services/firebaseAuthService";


export default function PostsList() {
    console.log('PostsList')

    const [posts, setPosts] = useOutletContext()[0];
    const loggedIn = useOutletContext()[1];
    const user = useOutletContext()[2];
    console.log(`from PostsList ${loggedIn}`)
    
    const postCards = posts.map(post => {
        return <PostCard key={post.id} post={post} loggedIn={loggedIn} user={user} />
    })

    return (
        <>
                {postCards}
        </>
    )
}