import React from 'react'

export default function PlantSearhCard(props) {

    return (
        <div className="container my-1">
            <div className="notification">
                <div className="columns">
                    <div className="column">{props.plant.id}</div>
                    <div className="column">{props.plant.common_name}</div>
                    <div className="column">{props.plant.scientific_name[0]}</div>
                </div>
            </div>
        </div>
    )
}