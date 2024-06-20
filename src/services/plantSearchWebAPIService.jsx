import axios from 'axios';
import { getEnvVar } from './netlifyEnvVar';

const plantAPI = axios.create({
    baseURL: 'https://perenual.com/api'
})


export async function getAllPlants() {
    const value =  await getEnvVar();
    const response = await plantAPI.get(`species-list?key=${value}`);
    return response.data.data;
}