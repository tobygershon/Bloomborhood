import React from 'react';

export default function Home() {
    

    return (

        <section className={"is-hidden-mobile hero is-small"}>
            <div id="hero-box" className="hero-body is-flex is-align-items-center is-justify-content-flex-end">
                <div className="is-flex is-flex-direction-column">
                    <p className="title has-text-white is-size-2-desktop is-size-4-mobile has-text-weight-bold has-text-right mr-2 mb-1">It's a <span id="bloomiful">Bloomiful</span> Day in the <span id="Bloom">Bloom</span><span id="borhood">borhood</span></p>
                    <p className="subtitle is-size-3 is-size-5-mobile has-text-right mt-1 mr-2 has-text-weight-bold has-text-white">buy nothing . . . plant everything!</p>
                </div>
            </div>
        </section >

    )
}