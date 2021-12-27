
import axios from 'axios';
const API_KEY = 'ef3cf5ac0e2f7c0c9f4c6ddb65623917';

const currentweather = async (cityname) => {
    const Base_URL1 = 'https://api.openweathermap.org/data/2.5/weather?';
    try{
        const {data} = await axios.get(Base_URL1 + `q=${cityname}&appid=${API_KEY}`);
        return data;
    }catch(error) {
        throw error;
    }
}

const fivedayweather = async (cityname) => {
    const Base_URL2 = 'https://api.openweathermap.org/data/2.5/forecast?cnt=40';
    try{
        const {data} = await axios.get(Base_URL2 + `&q=${cityname}+&appid=${API_KEY}`);
        return data;
    }catch(error) {
        throw error;
    }
}
const sevendayweather = async (lat,lon) => {
    const Base_URL3='https://api.openweathermap.org/data/2.5/onecall?exclude=hourly,minutely'
    try{
        const {data} = await axios.get(Base_URL3 + `&lat=${lat}&lon=${lon}&appid=${API_KEY}`);
        return data;
    }catch(error) {
        throw error;
    }
}
const fourtyeighthours = async (lat,lon) => {
    const Base_URL4='https://api.openweathermap.org/data/2.5/onecall?exclude=daily,minutely'
    try{
        const {data} = await axios.get(Base_URL4 + `&lat=${lat}&lon=${lon}&appid=${API_KEY}`);
        return data;
    }catch(error) {
        throw error;
    }
}
export {
    currentweather,fivedayweather,fourtyeighthours,sevendayweather,
}
