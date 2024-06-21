import React from "react";
import PlantSearchCard from "./PlantSearchCard";
import { useLoaderData } from "react-router-dom";
import { getAllPlants } from '../services/plantSearchWebAPIService'

export function loader() {
    return getAllPlants();
}

export default function PlantSearchList() {

    const data = useLoaderData();

    const searchResults = data.map(plant => {
        return <PlantSearchCard key={plant.id} plant={plant} />
    })

    return (
        <div>
            {searchResults}
        </div>

    )
}