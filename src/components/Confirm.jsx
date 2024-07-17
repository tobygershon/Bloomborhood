import React from 'react'
import { useLoaderData } from 'react-router-dom'
import { getPostById, updatePostConfirmPickup } from '../services/firebaseDBService'

export function loader({ params }) {
    
    return updatePostConfirmPickup(params.postId);
}

export default function Confirm() {

    // const [post, setPost] = React.useState(useLoaderData());
    const loader = useLoaderData();

    return (
        
        <h1 id="test">{loader === 'success' ? "Thank you for confirming!" : "it didn't work"}</h1>
        
    )
}