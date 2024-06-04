import React from "react";
import { useLoaderData, Link, useOutletContext} from "react-router-dom";
import PostCard from "./PostCard"
import { getAllPosts } from '../services/firebaseDBService'


export function loader() {
    return getAllPosts();
}

export default function PostsList() {

    let data = useLoaderData();

    const [postsResult, setPostsResult] = React.useState(data);
    const [passedCounter, setPassedCounter] = useOutletContext();


    React.useEffect(() => {
        async function updatePosts() {
            const update = await getAllPosts();
            setPostsResult(update);
        }
        updatePosts();

    }, [passedCounter])


    
    const postCards = postsResult.map(post => {
        return <PostCard key={post.id} post={post} />
    })

    return (
        <>
            <Link >
                {postCards}
            </Link>
        </>
    )
}