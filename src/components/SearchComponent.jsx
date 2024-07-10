import React from "react";
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";

export default function SearchComponent({ counter }) {

    const [tab, setTab] = React.useState("")
    const [passedCounter, setPassedCounter] = React.useState(0)

    React.useEffect(() => setPassedCounter(counter), [counter])

    const location = useLocation();
    React.useEffect(() => setTab(location.pathname), [location])

    //Plant and Post searches state and methods below

    const [plantSearchInput, setPlantSearchInput] = React.useState("");
    
    const [postsSearchInput, setPostsSearchInput] = React.useState("");
    // const [postsSearchData, setPostsSearchData] = React.useState("")

    function plantInputChange(event) {
        setPlantSearchInput(event.target.value)
    }

    function postsInputChange(event) {
        setPostsSearchInput(event.target.value)
    }

    const navigate = useNavigate();

    function handlePlantSearchClick() {

    }

    function clearPostSearchInput() {
        setPostsSearchInput("")
    }


    function handlePostsSearchClick() {
        if (postsSearchInput.length === 5) {
        navigate(`Posts/${postsSearchInput}`, { state: postsSearchInput })
        setTab("Posts")
        } else {
            setPostsSearchInput("5 digit zip please")
            }
    }

    return (
        <section className="section mt-2 pt-0">

                <div className="container">
                <div className="background notification is-white" >
                    <nav className="level">

                        <div className="level-left">
                            <div className="level-item">
                                <p className="subtitle is-5 has-text-weight-semibold">{tab === "/Plants" ? "Search Plants" : "Search Posts"}</p>
                            </div>
                            <div className="level-item">
                                <div className="field has-addons mb-1">
                                    <p className="control">
                                        { tab === "/Plants" ?
                                           <input onChange={plantInputChange} value={plantSearchInput} className="input" type="text" name="plantsSearch" placeholder="Tip: Spelling Matters" />
                                         : <input onChange={postsInputChange} onFocus={clearPostSearchInput} value={postsSearchInput} className="input" type="text" name="postsSearch" placeholder="5 digit Zip (ex: 01001)" />
                                        }
                                        </p>
                                    <p className="control">
                                        {tab === "/Plants" ? <button onClick={handlePlantSearchClick} id="plants-search-btn" className="button">Search</button>
                                            : <button onClick={handlePostsSearchClick} id="posts-search-btn" className="button">Search</button>}
                                    </p>
                                </div>
                            </div>
                        </div>


                        <div className="level-right">
                            <div className="level-item">
                                <div className="tabs is-toggle is-toggle-rounded">
                                    <ul>
                                        <li className={tab.toLowerCase().substring(0, 6) === "/posts" ? "is-active" : ""}>
                                            <Link id="toggle-posts" to={postsSearchInput.length === 5 ? `Posts/${postsSearchInput}` : "Posts"}>
                                                {/* <span class="icon is-small"
                            ><i class="fas fa-image" aria-hidden="true"></i
                            ></span> */}
                                                <span >Search Posts</span>
                                            </Link>
                                        </li>
                                        <li className={tab.toLowerCase().substring(0, 7) === "/plants" ? "is-active" : ""}>
                                            <Link id="toggle-plants" to="Plants">
                                                {/* <span class="icon is-small"
                            ><i class="fas fa-music" aria-hidden="true"></i
                            ></span> */}
                                                <span >Search Plants</span>
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                           
                    </nav>
                    </div>
                    </div>




                    <div>{location.pathname === "/" &&
                        <div className="container my-1 search-container">
                            <div className="notification is-white search-box" >
                                <div className="columns">
                                    <div className="column">sample test</div>
                                    <div className="column">test data</div>
                                    <div className="column">sample data</div>
                                </div>
                            </div>
                        </div>
                    }</div>

                    <Outlet context={[passedCounter, setPassedCounter]} />
               
            

        </section>
    )
}