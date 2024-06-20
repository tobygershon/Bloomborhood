import axios from 'axios';

const netflifyEnvVar = axios.create({
        baseURL: 'https://api.netlify.com/api/v1/api/v1/sites/'
    })


export async function getEnvVar() {
    const plantAPI = await netflifyEnvVar.get('b08a0438-b480-4b18-ae0f-40526d255cbe/env');
    return plantAPI[0].key;
}
    