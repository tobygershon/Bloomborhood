import React from "react";
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import { getZipArrayForUser, getPostsForUser } from "../services/firebaseDBService";
import { getAllPlants } from "../services/plantSearchWebAPIService";
import PostCard from "./PostCard";

export default function SearchComponent({ loggedIn, user, credits }) {

    const samplePost = {
        plantName: "Sample Post",
        description: "Each post displays plant information, and request details",
    }

    const [tab, setTab] = React.useState("");
    const [userArray, setUserArray] = React.useState([]);
    const [posts, setPosts] = React.useState([samplePost])
    const [plants, setPlants] = React.useState([])

    const navigate = useNavigate();

    const location = useLocation();
    React.useEffect(() => setTab(location.pathname), [location])

    React.useEffect(() => {

        async function getPosts() {
            const zipArray = await getZipArrayForUser(user.uid);
            if (zipArray) {
                setUserArray(zipArray)

                const postsArray = await getPostsForUser(zipArray);
                if (postsArray) {
                    setPosts(postsArray);
                    if (posts) {
                        navigate("Posts");
                        setTab("/Posts")
                    }
                }
            }
        }

        if (loggedIn) {
            getPosts();
        } else {
            setPosts([])
            setUserArray([])
        }
    }, [loggedIn])


    async function getPlants() {
        const plantsArray = await getAllPlants(plantSearchInput)
        setPlants(plantsArray)
    }

    function handlePlantSearchClick() {
        getPlants()
    }



    //Plant and Post searches state and methods below

    const [plantSearchInput, setPlantSearchInput] = React.useState("");
    const [postsSearchInput, setPostsSearchInput] = React.useState("");

    function plantInputChange(event) {
        setPlantSearchInput(event.target.value)
    }

    function postsInputChange(event) {
        setPostsSearchInput(event.target.value)
    }

    function clearPostSearchInput() {
        setPostsSearchInput("")
    }

    async function handlePostsSearchClick() {

        if (postsSearchInput.length === 5) {
            const searchArray = await getPostsForUser([postsSearchInput])
            if (searchArray) {
                setPosts(searchArray)
                navigate("Posts")
                setTab("/Posts");
            }

        } else {
            setPostsSearchInput("5 digit zips please")
        }
    }

    async function handleUserPostsClick() {
        if (userArray) {
            const returnedArray = await getPostsForUser(userArray);
            if (returnedArray) {
                setPosts(returnedArray)
            }
        }
    }



    return (
        <section className="section mt-0 pt-2">

            <div id="search-bar" className="container">
                <div className="background notification is-white pt-0 px-2" >
                    <nav className="level">

                        <div className="level-left">
                            <div className="level-item">
                                <p className="subtitle has-text-weight-semibold">{tab === "/Plants" ? "Search Plants" : "Search Posts"}</p>
                            </div>
                            <div className="level-item">
                                <div className={(loggedIn && tab === "/Posts") ? "field mb-0" : "field mb-0 has-addons"}>
                                    <p className="control">
                                        {tab === "/Plants" ?
                                            <input onChange={plantInputChange} value={plantSearchInput} className="input input-css" type="text" name="plantsSearch" placeholder="Tip: Spelling Matters" />
                                            : <input onChange={postsInputChange} onFocus={clearPostSearchInput} value={postsSearchInput} className="input input-css" type="text" name="postsSearch" placeholder="5 digit Zip (ex: 01001)" />
                                        }
                                    </p>
                                    <p className="control">
                                        {tab === "/Plants" ? <a href="#hero-box"><button onClick={handlePlantSearchClick} className="button is-rounded btn-css has-text-weight-semibold has-text-primary-80-invert">Search</button></a>
                                            : !loggedIn &&
                                            <a href="#hero-box"><button onClick={handlePostsSearchClick} className="button is-rounded btn-css has-text-weight-semibold has-text-primary-80-invert">Search</button></a>}
                                    </p>
                                </div>
                            </div>
                            <div className="level-item">
                                <div className="field has-addons mb-0">
                                    <p className="control">
                                        {(loggedIn && tab === "/Posts") && <><a href="#hero-box"><button onClick={handlePostsSearchClick} id="posts-search-btn" className={loggedIn ? "logged-in button is-rounded is-size-7-mobile is-responsive btn-css has-text-weight-semibold has-text-primary-80-invert" : "button is-rounded is-responsive btn-input-css has-text-weight-semibold has-text-primary-80-invert"}>Search Zip Code</button></a>
                                            <a href="#hero-box"><button onClick={handleUserPostsClick} id="user-posts-btn" className="button ml-2 is-rounded is-size-7-mobile is-responsive btn-css has-text-weight-semibold has-text-primary-80-invert">Back to My Zips</button></a></>}
                                    </p>
                                </div>
                            </div>
                        </div>


                        <div className="level-right">
                            <div className="level-item">
                                <div className="tabs is-toggle is-toggle-rounded">
                                    <ul>
                                        <li className={tab.substring(0, 6) === "/Posts" ? "is-active" : ""}>
                                            <Link id="toggle-posts" to="Posts">
                                                {/* <span class="icon is-small"
                            ><i class="fas fa-image" aria-hidden="true"></i
                            ></span> */}
                                                <span >Search Posts</span>
                                            </Link>
                                        </li>
                                        <li className={tab.substring(0, 7) === "/Plants" ? "is-active" : ""}>
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
                </div >
            </div >


            {(!loggedIn && location.pathname === "/") &&
                <PostCard post={samplePost} />
            }


            <Outlet context={[posts, loggedIn, user, credits, plants, samplePost]} />



        </section >
    )
}