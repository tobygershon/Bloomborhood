import React from 'react';
import { Link } from 'react-router-dom'

export default function Home() {

    const [shareBox, setShareBox] = React.useState(false)    
      
    React.useEffect(() => {
        setTimeout(() => {
            setShareBox(true)
        }, 3000)
    }, [])


    return (

        <section className="hero is-small mx-4 pb-5 pt-2" >
            <div id="hero-box" className="hero-body is-flex is-align-items-center is-justify-content-flex-end">
                <div className="columns">
                    <div className={shareBox ? "column is-one-third is-hidden-mobile" : "column is-one-third is-hidden"} style={{opacity: .75}} >
                        <div className="card is-flex is-flex-direction-column is-justify-content-space-evenly" style={{height: 150}}>
                            <div className="card-content py-4">
                        
                                <div className="content is-size-7-touch has-text-weight-bold">
                                    MyBloomborhood only works with lots of neighbors participating!
                                </div>
                            </div>
                            <footer className="card-footer">
                                <Link to="Share" className="card-footer-item"><button className="button is-small btn-css has-text-dark">Share the Site!</button></Link>
                            </footer>
                        </div>
                    </div>
                    <div className="column is-flex is-flex-direction-column is-justify-content-space-evenly" >
                        <div className="is-flex is-flex-direction-column">
                            <p className="title has-text-white is-size-2-desktop is-size-4-mobile has-text-weight-bold has-text-right mr-2 mb-1">It's a <span id="bloomiful">Bloomiful</span> Day in the <span id="Bloom">Bloom</span><span id="borhood">borhood</span></p>
                            <p className="subtitle is-size-3 is-size-5-mobile has-text-right mt-1 mr-2 has-text-weight-bold has-text-white">buy less . . . plant more!</p>
                        </div>
                    </div>
                </div>
            </div>
        </section >

    )
}