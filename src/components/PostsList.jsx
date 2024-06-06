import React from "react";
import { useLoaderData, useOutletContext, useParams, useLocation} from "react-router-dom";
import PostCard from "./PostCard"
import { getAllPosts } from '../services/firebaseDBService'


export function loader( { params } ) {
    console.log('loader')
    console.log(params.zip)
    return getAllPosts(params.zip);
}

export default function PostsList() {

    const data = useLoaderData()
    const zip = useLocation().state

    const [passedZipInput, setPassedZipInput] = React.useState(zip)
    const [passedCounter, setPassedCounter] = useOutletContext();
    // const [postsResult, setPostsResult] = React.useState();
    

    React.useEffect(() => setPassedZipInput(zip), [zip, passedCounter]);

    // React.useEffect(() => {
    //     async function updatePosts() {
    //         const update = await getAllPosts(passedZipInput);
    //         setPostsResult(update);
    //         console.log('update fired')
    //     }
    //     updatePosts();

    // }, [passedCounter, data])
    
    const postCards = data.map(post => {
        return <PostCard key={post.id} post={post} />
    })

    return (
        <>
                {postCards}
        </>
    )
}