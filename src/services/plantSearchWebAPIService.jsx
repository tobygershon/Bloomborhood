import axios from 'axios';
import { getKeyById } from './firebaseDBService';

// https://perenual.com/api/species-list?key=sk-lnZA664cd0f929e175593&q=periwinkle

// {
//     "data": [
//         {
//             "id": 1715,
//             "common_name": "Madagascar periwinkle",
//             "scientific_name": [
//                 "Catharanthus roseus"
//             ],
//             "other_name": [],
//             "cycle": "Herbaceous Perennial",
//             "watering": "Average",
//             "sunlight": [
//                 "full sun",
//                 "part shade"
//             ],
//             "default_image": {
//                 "license": 4,
//                 "license_name": "Attribution License",
//                 "license_url": "https://creativecommons.org/licenses/by/2.0/",
//                 "original_url": "https://perenual.com/storage/species_image/1715_catharanthus_roseus/og/49305331131_4e5ab296ac_b.jpg",
//                 "regular_url": "https://perenual.com/storage/species_image/1715_catharanthus_roseus/regular/49305331131_4e5ab296ac_b.jpg",
//                 "medium_url": "https://perenual.com/storage/species_image/1715_catharanthus_roseus/medium/49305331131_4e5ab296ac_b.jpg",
//                 "small_url": "https://perenual.com/storage/species_image/1715_catharanthus_roseus/small/49305331131_4e5ab296ac_b.jpg",
//                 "thumbnail": "https://perenual.com/storage/species_image/1715_catharanthus_roseus/thumbnail/49305331131_4e5ab296ac_b.jpg"
//             }
//         },
//     ],
// "to": 6,
// "per_page": 30,
// "current_page": 1,
// "from": 1,
// "last_page": 1,
// "total": 6
// }

const plantKeyId = "1";
const plantAPI = axios.create({
    baseURL: 'https://perenual.com/api'
})


export async function getAllPlants(search) {

    const value = await getKeyById(plantKeyId);
    const response = await plantAPI.get(`species-list?key=${value}&q=${search}`);
    return response.data.data;
}