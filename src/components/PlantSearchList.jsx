import React from "react";
import PlantSearchCard from "./PlantSearchCard";
import { useLoaderData, useOutletContext } from "react-router-dom";
import { getAllPlants } from '../services/plantSearchWebAPIService'

export function loader() {
    // return getAllPlants();
    return []
}

export default function PlantSearchList() {

    const data = useLoaderData();

    const searchPlants = useOutletContext()[4];
    const [plants, setPlants] = React.useState([])

    React.useEffect(() => {
        setPlants(searchPlants)
    }, [searchPlants])


    const searchResults = plants.map(plant => {
        return <PlantSearchCard key={plant.id} plant={plant} />
    })

    return (
        <div>
            {searchResults}
        </div>

    )
}