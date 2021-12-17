import axios from 'axios';

const Base_URL = 'https://api.openweathermap.org/data/2.5/forecast?cnt=7';
const API_KEY = 'ef3cf5ac0e2f7c0c9f4c6ddb65623917';

const sevendayweather = async (cityname) => {
    try{
        const {data} = await axios.get(Base_URL + `&q=${cityname}+&appid=${API_KEY}`);
        return data;
    }catch(error) {
        throw error;
    }
}
export default sevendayweather;