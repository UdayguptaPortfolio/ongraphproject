import React,{useState,useEffect} from 'react';
import './App.css';
import currentweather from './currentweather';
import thirtyweather from './thirtyweather';
import sixteenweather from './sixteenweather';
import sevendayweather from './sevendayweather';
import fourtyeighthours from './fourtyeighthours';

function App() {
const [weatherdata, setWeatherData] = useState(null);
const[weatherthirtydata,setWeatherThirtyData]=useState(null);
const[weathersixteendata,setWeatherSixteenData]=useState(null);
const[weathersevendata,setWeatherSevenData]=useState(null);
const[weatherfourtyeightdata,setWeatherFourtyEightData]=useState(null);

  const [city, setCity] = useState('');
  const [loading, setLoading] = useState(false);

  //Get Data for Current Live Weather
  const getCurrentData = async () => {
    try{
        setLoading(true);
        const data = await currentweather(city);
        setWeatherData(data);
        setLoading(false);
    }catch(error) {
      console.log(error.message);
      setLoading(false);
    }
  }
  

  // Get Data for 30-40 days Weather
  const getthirtyData=async()=>{
    try{
      setLoading(true);
      const data_thirty=await thirtyweather(city);
      setWeatherThirtyData(data_thirty)
      setLoading(false);
    }catch(error)
    {
      console.log(error.message);
      setLoading(false);
    }
  }
 

 // Get Data for 16 days Weather
 const getsixteenData=async()=>{
  try{
    setLoading(true);
    const data_sixteen=await sixteenweather(city);
    setWeatherSixteenData(data_sixteen)
    setLoading(false);
  }catch(error)
  {
    console.log(error.message);
    setLoading(false);
  }
}


// Get Data for 7 days Weather
const getsevenData=async()=>{
  try{
    setLoading(true);
    const data_seven=await sevendayweather(city);
    setWeatherSevenData(data_seven)
    setLoading(false);
  }catch(error)
  {
    console.log(error.message);
    setLoading(false);
  }
}
// Get Data for 48 hours Weather
const getfourtyeightData=async()=>{
  try{
    setLoading(true);
    const data_fourtyeight=await fourtyeighthours(city);
    setWeatherFourtyEightData(data_fourtyeight)
    setLoading(false);
  }catch(error)
  {
    console.log(error.message);
    setLoading(false);
  }
}

const escapebutton=()=>{
setLoading(false);
setWeatherData(null);
setWeatherFourtyEightData(null);
setWeatherSevenData(null);
setWeatherThirtyData(null);
setWeatherSixteenData(null);
}

useEffect(() => {
  getCurrentData();
  getthirtyData();
  getsixteenData();
  getsevenData();
  getfourtyeightData();
}, []);

  const weatherList = weatherthirtydata?.list?.map((el)=>(
    <div>
      <div className="main-thirty">
            <div className="weather-icon">
              <img src={`http://openweathermap.org/img/w/${el.weather[0].icon}.png`} alt="imgicon"/>
            </div>
            <h3>{el.weather[0].main}</h3>
            <h2>{parseFloat(el.main.temp-273.15).toFixed(1)}&deg;C</h2>         
            <div className='description'>
            <h5>Pressure: {el.main.pressure}||Minimum:{parseFloat(el.main.temp_min - 273.15).toFixed(1)}&deg;C
            || Maximum: {parseFloat(el.main.temp_max - 273.15).toFixed(1)}&deg;C 
              || Humidity: {el.main.humidity}%</h5>

            </div>
            </div>
        {/* */}
    </div>
))
const weatherList_sixteen = weathersixteendata?.list?.map((el)=>(
  <div>
      <div className="main-thirty">
            <div className="weather-icon">
              <img src={`http://openweathermap.org/img/w/${el.weather[0].icon}.png`} alt="imgicon"/>
            </div>
            <h3>{el.weather[0].main}</h3>
            <h2>{parseFloat(el.main.temp-273.15).toFixed(1)}&deg;C</h2>            
            <div className='description'>
            <h5>Pressure: {el.main.pressure}||Minimum:{parseFloat(el.main.temp_min - 273.15).toFixed(1)}&deg;C
            || Maximum: {parseFloat(el.main.temp_max - 273.15).toFixed(1)}&deg;C 
              || Humidity: {el.main.humidity}%</h5>
            </div>
            </div>
  </div>
))
const weatherList_seven = weathersevendata?.list?.map((el)=>(
  <div>
       <div className="main-thirty">
            <div className="weather-icon">
              <img src={`http://openweathermap.org/img/w/${el.weather[0].icon}.png`} alt="imgicon"/>
            </div>
            <h3>{el.weather[0].main}</h3>
            <h2>{parseFloat(el.main.temp-273.15).toFixed(1)}&deg;C</h2>
            
            <div className='description'>
            <h5>Pressure: {el.main.pressure}||Minimum:{parseFloat(el.main.temp_min - 273.15).toFixed(1)}&deg;C
            || Maximum: {parseFloat(el.main.temp_max - 273.15).toFixed(1)}&deg;C 
              || Humidity: {el.main.humidity}%</h5>

            </div>
            </div>
  </div>
))
const weatherList_fourtyeight = weatherfourtyeightdata?.list?.map((el)=>(
  <div>
       <div className="main-thirty">
            <div className="weather-icon">
              <img src={`http://openweathermap.org/img/w/${el.weather[0].icon}.png`} alt="imgicon"/>
            </div>
            <h3>{el.weather[0].main}</h3>
            <h2>{parseFloat(el.main.temp-273.15).toFixed(1)}&deg;C</h2>
            
            <div className='description'>
            <h5>Pressure: {el.main.pressure}||Minimum:{parseFloat(el.main.temp_min - 273.15).toFixed(1)}&deg;C
            || Maximum: {parseFloat(el.main.temp_max - 273.15).toFixed(1)}&deg;C 
              || Humidity: {el.main.humidity}%</h5>
            </div>
            </div>
  </div>
))
  return (
    <div className="App">
      <header className="App-header">
        Weather-Finder App
        </header>
          <br/>
          <div className='container'>

        <div className="search">
          <input type="text" value={city} onChange={(e) => setCity(e.target.value)} placeholder="Enter your city name"/>
          <button type="button" onClick={() => getCurrentData()}>Current weather</button>
          <button type="button" onClick={() => escapebutton()}>Escape</button>
        </div>
          <br/><br/><br/><br/>
          <h2>Current Weather Condition</h2>
        <>
        <br/><br/>      
          {weatherdata !== null ? (
          <div className="main">
            <div className="weather-icon">
              <img src={`http://openweathermap.org/img/w/${weatherdata.weather[0].icon}.png`} alt="imgicon"/>
            </div>
            <h3>{weatherdata.weather[0].main}</h3>
            <div className="temperature">
              <h1>{parseFloat(weatherdata.main.temp - 273.15).toFixed(1)}&deg;C</h1>
            </div>
            <div className="location">
              <h3><i></i>{weatherdata.name} | {weatherdata.sys.country}</h3>
            </div>
            <div className="temperature-range">
              <h5>Minimum: {parseFloat(weatherdata.main.temp_min - 273.15).toFixed(1)}&deg;C 
              || Maximum: {parseFloat(weatherdata.main.temp_max - 273.15).toFixed(1)}&deg;C 
              || Humidity: {weatherdata.main.humidity}%</h5>
            </div>
        </div>
        ) : null}      
          </>
          <br/><br/>
          <h2>30 day ForeCasting</h2>
          <button type="button" onClick={() => getthirtyData()}>30 day Weather</button>
          <></>
          {weatherthirtydata!==null?(
<div>
{weatherList}
</div>
          ): null}
          </div>
          <br/><br/>
          <h2>16 day ForeCasting</h2>
          <button type="button" onClick={() => getsixteenData()}>16 day Weather</button>
          {weatherList_sixteen}
          <br/><br/>
          <h2>7 day ForeCasting</h2>
          <button type="button" onClick={() => getsevenData()}>7 day Weather</button>
          {weatherList_seven}

          <br/><br/>
          <h2>48 hours ForeCasting</h2>
          <button type="button" onClick={() => getfourtyeightData()}>48 hours Weather</button>
          {weatherList_fourtyeight}
          

    </div>
  );
}
export default App;
