import React from "react";
import { Outlet, Link, useLocation } from "react-router-dom";

export default function SearchComponent({ counter }) {

    console.log("search render")

    const [tab, setTab] = React.useState("")
    const [passedCounter, setPassedCounter] = React.useState(0)

    React.useEffect(() => setPassedCounter(counter), [counter])

    const { pathname } = useLocation();
    React.useEffect(() => setTab(pathname), [pathname])

    return (
        <section className="section mt-2 pt-0">

            <div className="container">
                <div className="notification is-white">

                    <nav className="level">

                        <div className="level-left">
                            <div className="level-item">
                                <p className="subtitle is-5 has-text-weight-semibold">{tab === "/Plants" ? "Search Plants" : "Search Posts"}</p>
                            </div>
                            <div className="level-item">
                                <div className="field has-addons">
                                    <p className="control">
                                        { tab === "/Plants" ?
                                           <input className="input" type="text" name="plantsSearch" placeholder="Tip: Spelling Matters" />
                                         : <input className="input" type="text" name="postsSearch" placeholder="5 digit Zip (ex: 01001)" />
                                        }
                                        </p>
                                    <p className="control">
                                        {tab === "Plants" ? <button id="plants-search-btn" className="button">Search</button> : <button id="posts-search-btn" className="button">Search</button>}
                                    </p>
                                </div>
                            </div>
                        </div>


                        <div className="level-right">
                            <div className="level-item">
                                <div className="tabs is-toggle">
                                    <ul>
                                        <li className={tab.toLowerCase() === "/posts" ? "is-active" : ""}>
                                            <Link to="Posts">
                                                {/* <span class="icon is-small"
                            ><i class="fas fa-image" aria-hidden="true"></i
                            ></span> */}
                                                <span>Search Posts</span>
                                            </Link>
                                        </li>
                                        <li className={tab.toLowerCase() === "/plants" ? "is-active" : ""}>
                                            <Link to="Plants">
                                                {/* <span class="icon is-small"
                            ><i class="fas fa-music" aria-hidden="true"></i
                            ></span> */}
                                                <span>Search Plants</span>
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                    </nav>





                    <div>{pathname === "/" &&
                        <div className="container my-1">
                            <div className="notification" >
                                <div className="columns">
                                    <div className="column">sample test</div>
                                    <div className="column">test data</div>
                                    <div className="column">sample data</div>
                                </div>
                            </div>
                        </div>
                    }</div>

                    <Outlet context={[passedCounter, setPassedCounter]} />
                </div>
            </div>

        </section>
    )
}