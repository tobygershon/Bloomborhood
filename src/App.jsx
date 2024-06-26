import React from 'react'
import './App.css'
import Layout from './layouts/Layout.jsx'
import About from './components/About.jsx'
import NotFound from './components/NotFound.jsx'
import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom"
import PostsList, { loader as postsLoader } from './components/PostsList.jsx'
import PlantSearchList, { loader as plantSearchLoader } from './components/PlantSearchList.jsx'
import HomeLayout from './layouts/HomeLayout.jsx'

function App() {
  // const [plants, setPlants] = useState(['plant1', 'plant2'])

  // getAllPosts();  // Uncomment this line to test the getAllPosts function
  // useEffect(() => {
  // const plantTestArray = getAllPlants();
  // setPlants(plantTestArray);
  // console.log(plants);
  // }, [count]);

  // const plantsArray = plants.map((plant) => {
  //   <h1>plant.common_name</h1>;
  // });

  const router = createBrowserRouter(createRoutesFromElements(

    <Route path="/" element={<Layout />} >

      <Route path="" element={<HomeLayout />} >

        <Route path="Posts" element={<PostsList />} loader={postsLoader} />

        <Route path="Posts/:zip" element={<PostsList />} loader={postsLoader} />

        <Route path="Plants" element={<PlantSearchList />} loader={plantSearchLoader}/>

      </Route>

      <Route path="About" element={<About />} />
      <Route path="*" element={<NotFound />} />

    </Route>

  ))

  return (
    <RouterProvider router={router} />
  )
}

export default App;
