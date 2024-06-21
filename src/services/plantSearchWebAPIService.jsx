import axios from 'axios';
import { getKeyById } from './firebaseDBService';

const plantKeyId = "1";
const plantAPI = axios.create({
    baseURL: 'https://perenual.com/api'
})


export async function getAllPlants() {

    const value = await getKeyById(plantKeyId);
    const response = await plantAPI.get(`species-list?key=${value}`);
    return response.data.data;
}