import React from "react";
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import { getZipArrayForUser, getPostsForUser } from "../services/firebaseDBService";
import PostCard from "./PostCard";

export default function SearchComponent({ loggedIn, userId }) {
    console.log('searchComp')

    const samplePost = {
        plantName: "Sample Post",
        description: "Each post displays plant information, and request details",
    }

    const [tab, setTab] = React.useState("");
    const [userArray, setUserArray] = React.useState([]);
    const [posts, setPosts] = React.useState([samplePost])

    const navigate = useNavigate();

    const location = useLocation();
    React.useEffect(() => setTab(location.pathname), [location])

    React.useEffect(() => {

        async function getPosts() {
            const zipArray = await getZipArrayForUser(userId);
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



    //Plant and Post searches state and methods below

    const [plantSearchInput, setPlantSearchInput] = React.useState("");
    const [postsSearchInput, setPostsSearchInput] = React.useState("");

    function plantInputChange(event) {
        setPlantSearchInput(event.target.value)
    }

    function postsInputChange(event) {
        setPostsSearchInput(event.target.value)
    }

    function handlePlantSearchClick() {

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
        <section className="section mt-0 pt-0">

            <div className="container">
                <div className="background notification is-white pt-0" >
                    <nav className="level">

                        <div className="level-left">
                            <div className="level-item">
                                <p className="subtitle has-text-weight-semibold">{tab === "/Plants" ? "Search Plants" : "Search Posts"}</p>
                            </div>
                            <div className="level-item">
                                <div className={loggedIn ? "field mb-0" : "field mb-0 has-addons"}>
                                    <p className="control">
                                        {tab === "/Plants" ?
                                            <input onChange={plantInputChange} value={plantSearchInput} className="input" type="text" name="plantsSearch" placeholder="Tip: Spelling Matters" />
                                            : <input onChange={postsInputChange} onFocus={clearPostSearchInput} value={postsSearchInput} className="input" type="text" name="postsSearch" placeholder="5 digit Zip (ex: 01001)" />
                                        }
                                    </p>
                                    <p className="control">
                                        {tab === "/Plants" ? <button onClick={handlePlantSearchClick} id="plants-search-btn" className="button is-rounded">Search</button>
                                            : !loggedIn && 
                                                <button onClick={handlePostsSearchClick} id="posts-search-btn" className="button is-rounded">Search</button>}
                                    </p>
                                </div>
                            </div>
                            <div className="level-item">
                                <div className="field has-addons mb-0">
                                    <p className="control">
                                        {loggedIn && <div><button onClick={handlePostsSearchClick} id="posts-search-btn" className={loggedIn ? "logged-in button is-rounded is-responsive" : "button is-rounded is-responsive"}>Search Zip</button>
                                                <button onClick={handleUserPostsClick} id="user-posts-btn" className="button ml-2 is-rounded is-responsive">See My Zips</button></div>}
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
            

            <Outlet context={[posts, setPosts]} />



        </section >
    )
}