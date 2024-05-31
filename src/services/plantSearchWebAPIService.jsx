import axios from 'axios';

const plantAPI = axios.create({
    baseURL: 'https://perenual.com/api'
})

export async function getAllPlants() {
    const response = await plantAPI.get('species-list?key=' + PLANT_API_KEY);
    return response.data.data;
}