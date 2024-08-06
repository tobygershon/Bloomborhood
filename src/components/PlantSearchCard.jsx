import React from 'react'

export default function PlantSearhCard({ plant }) {

    const [pictureModalOpen, setPictureModalOpen] = React.useState(false)

    function togglePictureModal() {
        setPictureModalOpen(prev => !prev)
    }

    return (
        <>
            {/* // <div className="container my-1">
        //     <div className="notification">
        //         <div className="columns">
        //             <div className="column">{props.plant.id}</div>
        //             <div className="column">{props.plant.common_name}</div>
        //             <div className="column">{props.plant.scientific_name[0]}</div>
        //         </div>
        //     </div>
        // </div> */}

            <div className="container my-4 search-container">
                <div className="notification has-background-white-ter search-box">
                    <div className="columns is-gapless">
                        <div className="column">
                            <div className="post-box box-1 is-flex is-align-items-center is-justify-content-center has-text-weight-semibold px-4">
                                <i className="fa-solid fa-seedling is-size-5 has-text-grey"></i>
                                <div className="ml-4 is-flex is-flex-direction-column is-justify-content-space-evenly">
                                    <p className="is-flex is-justify-content-center is-size-7 is-size-6-desktop is-align-items-center has-text-grey">
                                        <span className="has-text-centered is-size-6 is-size-5-desktop has-text-dark">{plant.common_name}</span>
                                    </p>
                                    <p className="is-flex is-justify-content-center is-size-7 is-align-items-center">
                                        <span className="has-text-centered is-size-7 is-size-6-desktop has-text-grey-dark has-text-weight-semibold">{plant.other_name[0]}</span>
                                    </p>
                                    <p className="is-flex is-justify-content-center is-size-7 is-align-items-center has-text-grey">
                                        <span className="has-text-centered is-size-7 has-text-weight-normal is-italic">{plant.scientific_name[0]}</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="column">
                            <div className="post-box box-2 is-flex is-align-items-center is-justify-content-center has-text-dark is-size-6 is-size-5-desktop has-text-weight-semibold px-4">
                                <i className="fas fa-stream is-size-5 has-text-grey"></i>
                                <div className="is-flex is-flex-direction-column is-align-items-center is-justify-content-space-evenly has-text-weight-semibold px-4">
                                    <p className="is-flex is-justify-content-center is-align-items-center is-size-7 is-size-6-desktop has-text-grey">
                                        <span className="has-text-centered ml-4 has-text-weight-semibold has-text-dark">{plant.cycle}</span>
                                    </p>
                                    <p className="is-flex is-justify-content-center is-align-items-center is-size-7 is-size-6-desktop has-text-grey">
                                        <span className="has-text-centered ml-4 has-text-weight-semibold has-text-dark">Water: {plant.watering}</span>
                                    </p>
                                    <p className="is-flex is-justify-content-center is-align-items-center is-size-7 is-size-6-desktop has-text-grey">
                                        <span className="has-text-centered ml-4 has-text-weight-semibold has-text-dark">Sunlight: {plant.sunlight[0]}{plant.sunlight[1] ? `, ${plant.sunlight[1]}` : ""}</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="column">
                            <div className="post-box box-3 is-flex is-flex-direction-column is-align-items-center is-justify-content-space-evenly has-text-dark is-size-7 is-size-6-desktop px-4">
                                <button className="button" onClick={togglePictureModal}>See Picture</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className={pictureModalOpen ? "modal is-active" : "modal"} >
                <div onClick={togglePictureModal} className="modal-background"></div>
                <div className="modal-content">
                    <p className="image is-4by3">
                        {plant.default_image !== null && plant.default_image.license !== 451 ?
                            <img src={plant.default_image.small_url} alt="plant image" />
                            : <h1 className="is-size-3 has-text-light has-text-centered has-text-weight-bold">Sorry, no image exists</h1>
                        }
                    </p>
                </div>
                <button onClick={togglePictureModal} className="modal-close is-large" aria-label="close"></button>
            </div >

        </>
    )
}