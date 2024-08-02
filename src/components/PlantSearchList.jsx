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

    const samplePlant = {
        common_name: "No Results",
        other_name: ["Make Sure spelling is correct"],
        scientific_name: ["Sample Plant"],
        cycle: "Perrenial",
        watering: "Average",
        sunlight: ["part sun"],
        default_image: null
    }

    React.useEffect(() => {
        setPlants(searchPlants)
    }, [searchPlants])


    const searchResults = plants.map(plant => {
                return <PlantSearchCard key={plant.id} plant={plant} />
            })
       


    return (
        <div>
            {searchResults.length > 0 ? searchResults : <PlantSearchCard key='sample' plant={samplePlant} />}
        </div>

    )
}