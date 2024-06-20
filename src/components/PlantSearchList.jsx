import React from "react";
import PlantSearchCard from "./PlantSearchCard";
import { useLoaderData } from "react-router-dom";
import { getAllPlants } from '../services/plantSearchWebAPIService'

export function loader() {
    console.log(getAllPlants());
    return null;
}

export default function PlantSearchList() {

    const data = useLoaderData();
    console.log(data)

    // const searchResults = data.map(plant => {
    //     return <PlantSearchCard key={plant.id} plant={plant} />
    // })

    return (
        <div>
            {/* {searchResults} */}
        </div>

    )
}