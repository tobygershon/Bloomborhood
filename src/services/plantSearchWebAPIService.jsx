import axios from 'axios';
// import { getEnvVar } from './netlifyEnvVar';

const bar = Netlify.env.get("PLANT_API_KEY")

function getPlantAPI() {

   console.log(new Response(bar));
   
}

// export const config = { path: "/*" };

const plantAPI = axios.create({
    baseURL: 'https://perenual.com/api'
})


export async function getAllPlants() {
    const value =  await getPlantAPI();
    console.log(value);
    const response = await plantAPI.get(`species-list?key=${value}`);
    return response.data.data;
}