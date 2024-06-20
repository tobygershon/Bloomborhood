import roses from "../assets/roses.jpeg"

export default function About() {
    return (
        <div>

            <section className="section is-flex is-justify-content-space-between is-align-items-center py-0">
                <div className="box is-background-white my-0">
                    <figure className="image">
                        <img src={roses} />
                    </figure>
                </div>
                <div className="box is-background-white is-flex is-flex-direction-column my-0">
                    <h1 className="title mb-3">Inspiration</h1>
                    <h2 className="subtitle">
                    <div className="my-1">
                        Curating a diverse, lush garden is rewarding ... and Expensive! 
                        </div>
                        <div className="my-1">
                        My Bloomborhood aims to make sharing extra plants with neighbors easier.
                        </div>
                        <div className="my-1">
                            Search, Post, Learn, and participate in beautifying your bloomborhood.
                            </div>
                    </h2>
                </div>

            </section>

            <section className="section is-flex is-justify-content-space-between is-align-items-center py-0">
                <div className="box is-background-white is-flex is-flex-direction-column my-0">
                    <h1 className="title">Section</h1>
                    <h2 className="subtitle">
                        A simple container to divide your page into <strong>sections</strong>, like
                        the one you're currently reading.
                    </h2>
                </div>
                <div className="box is-background-white my-0">
                    <figure className="image">
                        <img src={roses} />
                    </figure>
                </div>
            </section>

            <section className="section is-flex is-justify-content-space-between is-align-items-center py-0">
                <div className="box is-background-white my-0">
                    <figure className="image ">
                        <img src="https://bulma.io/assets/images/placeholders/256x256.png" />
                    </figure>
                </div>
                <div className="box is-background-white is-flex is-flex-direction-column my-0">
                    <h1 className="title">Section</h1>
                    <h2 className="subtitle">
                        A simple container to divide your page into <strong>sections</strong>, like
                        the one you're currently reading.
                    </h2>
                </div>
            </section>
        </div>
    )
}