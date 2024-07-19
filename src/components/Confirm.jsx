import React from 'react'
import { useLoaderData } from 'react-router-dom'
import { getPostById, updatePostConfirmPickup } from '../services/firebaseDBService'

export function loader( { params } ) {
    
    return params.status
}

export default function Confirm() {

    // const [post, setPost] = React.useState(useLoaderData());
    const loader = useLoaderData();
    console.log(loader)

    return (
        
        <h1 id="test">{loader === 'success' ? "Thank you for confirming!" : "Sorry, it looks like someone already reported picking this up.  We'll look into it."}</h1>
        
    )
}