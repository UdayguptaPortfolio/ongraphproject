import axios from 'axios';

const Base_URL='https://api.openweathermap.org/data/2.5/onecall?exclude=daily,minutely'
const API_KEY = 'ef3cf5ac0e2f7c0c9f4c6ddb65623917';

const fourtyeighthours = async (lat,lon) => {
    try{
        const {data} = await axios.get(Base_URL + `&lat=${lat}&lon=${lon}&appid=${API_KEY}`);
        return data;
    }catch(error) {
        throw error;
    }
}
export default fourtyeighthours;