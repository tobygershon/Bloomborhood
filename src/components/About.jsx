import roses from "../assets/roses.jpg"
import phlox from "../assets/phlox1.jpg"
import patio from "../assets/patio.jpg"
import { useLoaderData } from "react-router-dom";

export function loader() {

    let picArray = [patio, phlox, roses];

    return picArray;
}

export default function About() {

    const loader = useLoaderData();

    return (
        <div id="about-div">

            <section className="section pt-5 pb-0">
                <div className="columns">
                    <div className="box is-shadowless column is-background-white is-flex is-align-items-center is-one-third my-0">
                        <figure className="image about-img ">
                            <img src={loader[0]} />
                        </figure>
                    </div>
                    <div className="box is-shadowless column is-background-white is-flex is-flex-direction-column is-justify-content-center my-0">
                        <h1 className="title mb-3 is-size-5-touch has-text-grey-light">Inspiration</h1>
                        <h2 className="subtitle is-size-6-touch has-text-grey-dark">
                            <div className="my-3">
                                Cultivating a diverse, lush garden is rewarding ... and expensive!
                            </div>
                            <div className="my-3">
                                My Bloomborhood aims to make sharing extra plants with neighbors easier.
                            </div>
                            <div className="my-3">
                                Search, post, learn, and participate in beautifying your bloomborhood.
                            </div>
                        </h2>
                    </div>
                </div>

            </section>

            <section className="section py-0">
                <div className="columns">
                    <div className="box is-shadowless column is-background-white is-flex is-flex-direction-column is-justify-content-center my-0">
                        <h1 className="title mb-3 is-size-5-touch has-text-grey-light">Policy</h1>
                        <h2 className="subtitle is-size-6-touch has-text-grey-dark">
                            <div className="my-3">
                                First come, first served.
                            </div>
                            <div className="my-3">
                                Request the address for available plants, but it may be gone before you get there.
                            </div>
                            <div className="my-3">
                                Let us know after you've picked up so we can stay up to date!
                            </div>
                        </h2>
                    </div>
                    <div className="box is-shadowless column is-background-white  is-flex is-align-items-center is-hidden-mobile is-one-third my-0">
                        <figure className="image about-img">
                            <img src={loader[1]} />
                        </figure>
                    </div>
                </div>
            </section>

            <section className="section pt-0 pb-5">
                <div className="columns">
                    <div className="box is-shadowless column is-background-white is-flex is-align-items-center is-hidden-mobile is-one-third my-0">
                        <figure className="image about-img">
                            <img src={loader[2]} />
                        </figure>
                    </div>
                    <div className="box is-shadowless column is-background-white is-flex is-flex-direction-column is-justify-content-center my-0">
                        <h1 className="title is-size-5-touch has-text-grey-light mb-3">Earn Share Credits&nbsp;<i className="fa-solid fa-seedling is-size-4 has-text-grey-dark"></i></h1>
                        <h2 className="subtitle is-size-6-touch has-text-grey-dark">
                            <div className="my-3">
                                Anytime you share your plants, you earn one share credit!
                            </div>
                            <div className="my-3">
                                Spend a share credit to guarantee that you will be the only one requesting a pickup.
                            </div>
                        </h2>
                    </div>
                </div>
            </section>
        </div>
    )
}