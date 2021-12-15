import axios from 'axios';

const Base_URL = 'https://api.openweathermap.org/data/2.5/forecast?cnt=4';
const API_KEY = 'c66fda0dd71b4e16f3dc0ad5b571c449';

const fourtyeighthours = async (cityname) => {
    try{
        const {data} = await axios.get(Base_URL + `&q=${cityname}+&appid=${API_KEY}`);
        return data;
    }catch(error) {
        throw error;
    }
}
export default fourtyeighthours;