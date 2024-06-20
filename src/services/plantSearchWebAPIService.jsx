import axios from 'axios';

const plantAPI = axios.create({
    baseURL: 'https://perenual.com/api'
})


export async function getAllPlants() {
    console.log(PLANT_API_KEY)

    // const response = await plantAPI.get(`species-list?key=${value}`);
    // return response.data.data;
}