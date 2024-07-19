import React from 'react'

export default function PlantSearhCard( { plant } ) {

    return (
        // <div className="container my-1">
        //     <div className="notification">
        //         <div className="columns">
        //             <div className="column">{props.plant.id}</div>
        //             <div className="column">{props.plant.common_name}</div>
        //             <div className="column">{props.plant.scientific_name[0]}</div>
        //         </div>
        //     </div>
        // </div>

        <div className="container my-4 search-container">
            <div className="notification has-background-white-ter search-box">
                <div className="columns is-gapless">
                    <div className="column ">
                        <div className="post-box box-1 is-flex is-flex-direction-column is-align-items-center is-justify-content-center has-text-weight-semibold px-4">
                            <p className="is-flex is-justify-content-center is-size-7 is-size-6-desktop is-flex is-align-items-center has-text-grey">
                                <i className="fa-solid fa-seedling is-size-5"></i><span className="ml-2 is-size-5 is-size-4-desktop has-text-dark">{plant.common_name}</span>
                            </p>

                        </div>
                    </div>
                    <div className="column">
                        <div className="post-box box-2 is-flex is-flex-direction-column is-align-items-center is-justify-content-center has-text-dark is-size-6 is-size-5-desktop has-text-weight-semibold px-4">
                            <p className="is-flex is-justify-content-center is-align-items-center is-size-7 is-size-6-desktop has-text-grey">
                                <i className="fas fa-stream is-size-5"></i><span className="ml-4 has-text-weight-semibold has-text-dark">{plant.scientific_name}</span>
                            </p>
                        </div>
                    </div>
                    <div className="column">
                        <div className="post-box box-3 is-flex is-flex-direction-column is-align-items-center is-justify-content-space-evenly has-text-dark is-size-7 is-size-6-desktop px-4">
                           <button className="button" onClick={""} disabled>expand</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}