import axios from 'axios';

const plantAPI = axios.create({
    baseURL: 'https://perenual.com/api'
})

export async function getAllPlants() {
    const response = await plantAPI.get('species-list?key=');
    return response.data.data;
}