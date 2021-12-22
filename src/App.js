import React,{useState,useEffect} from 'react';
import './App.css';
import currentweather from './currentweather';
import sevendayweather from './sevendayweather';
import fourtyeighthours from './fourtyeighthours';
import fivedayweather from './fivedayweather';

function App() {
const [weatherdata, setWeatherData] = useState(null);
const[weathersevendata,setWeatherSevenData]=useState(null);
const[weatherfourtyeightdata,setWeatherFourtyEightData]=useState(null);
const[weatherfivedata,setWeatherFiveData]=useState(null);
const[lat,setLat]=useState('')
const[lon,setLon]=useState('')
const [city, setCity] = useState('');
const myHeading=["5 day ForeCasting with Different Time frames","7 day ForeCasting","48 hours ForeCasting"];
  //Get Data for Current Live Weather
const getCurrentData = async () => {
    try{
        const data = await currentweather(city);
        setLat(data.coord.lat)
        setLon(data.coord.lon)
        setWeatherData(data);
        setWeatherFiveData(null)
    setWeatherSevenData(null)
    setWeatherFourtyEightData(null)
    }catch(error) {
      console.log(error.message);
    }
  }
  //Get Data for 5 days in 3hours time frame
const getfiveData=async()=>{
  try{
    const data_five=await fivedayweather(city);
    setWeatherFiveData(data_five)
    setWeatherData(null)
    setWeatherSevenData(null)
    setWeatherFourtyEightData(null)
  }catch(error)
  {
    console.log(error.message);
  }
}
// Get Data for 7 days Weather
const getsevenData=async()=>{
  try{
    const data_seven=await sevendayweather(lat,lon);
    console.log(data_seven)
    setWeatherSevenData(data_seven)
    setWeatherData(null)
    setWeatherFiveData(null)
    setWeatherFourtyEightData(null)
  }catch(error)
  {
    console.log(error.message);
  }
}
// Get Data for 48 hours Weather
const getfourtyeightData=async()=>{
  try{
    const data_fourtyeight=await fourtyeighthours(lat,lon);
    setWeatherFourtyEightData(data_fourtyeight)
    setWeatherData(null)
    setWeatherFiveData(null)
    setWeatherSevenData(null)
  }catch(error)
  {
    console.log(error.message);
  }
}
const escape=()=>{
setWeatherData(null);
setWeatherFiveData(null)
setWeatherFourtyEightData(null);
setWeatherSevenData(null);
}
const weatherList_five = weatherfivedata?.list?.map((el)=>(
  <div>
       <div className="main-thirty">
       <i> {new Date(el.dt*1000).toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true }) } </i><br/>
       <b>{new Date(el.dt*1000).toDateString('en-US',{weekday: 'long'} ) }</b>
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
const weatherList_seven = weathersevendata?.daily?.map((el)=>(
  <div>
       <div className="main-thirty">
       <i> {new Date(el.dt*1000).toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true }) } </i><br/>
       <b>{new Date(el.dt*1000).toDateString('en-US',{weekday: 'long'} ) }</b>
            <div className="weather-icon">
              {el.timezone}
              <img src={`http://openweathermap.org/img/w/${el.weather[0].icon}.png`} alt="imgicon"/>
            </div>
            <h3>{el.weather[0].main}</h3>
            <h2>{parseFloat(el.temp.day-273.15).toFixed(1)}&deg;C</h2>
            
            <div className='description'>
            <h5>Pressure: {el.pressure}||Minimum:{parseFloat(el.temp.min - 273.15).toFixed(1)}&deg;C
            || Maximum: {parseFloat(el.temp.max - 273.15).toFixed(1)}&deg;C 
              || Humidity: {el.humidity}%</h5>

            </div>
            </div>
  </div>
))
const weatherList_fourtyeight = weatherfourtyeightdata?.hourly?.map((el)=>(
  function abc()
  {
    <div>
    <div className="main-thirty">
    <i> {new Date(el.dt*1000).toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true }) } </i><br/>
    <b>{new Date(el.dt*1000).toLocaleDateString('en-US',{weekday: 'long'} ) }</b>
         <div className="weather-icon">
           <img src={`http://openweathermap.org/img/w/${el.weather[0].icon}.png`} alt="imgicon"/>
         </div>
         <h3>{el.weather[0].main}</h3>
         <h2>{parseFloat(el.temp-273.15).toFixed(1)}&deg;C</h2>
         
         <div className='description'>
         <h5>Pressure: {el.pressure}||Minimum:{parseFloat(el.temp.min - 273.15).toFixed(1)}&deg;C
         || Maximum: {parseFloat(el.temp.max - 273.15).toFixed(1)}&deg;C 
           || Humidity: {el.humidity}%</h5>
         </div>
         </div>
</div>
  }
 
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
        </div>
        <button type="button" onClick={() => getCurrentData()}>Current weather</button>
        <button type="button" onClick={() => getfiveData()}>5 day Weather</button> 
        <button type="button" onClick={() => getsevenData()}>7 day Weather</button>
        <button type="button" onClick={() => getfourtyeightData()}>48 hours Weather</button>
        <>
        <br/><br/>      
          {weatherdata !== null ? (
            <div>
              <h2 className='heading'>Current Weather Condition</h2><br/>
          <div className="main"
          onClick={escape}>
            <b>Date:<i> {new Date(weatherdata.dt*1000).toDateString() } </i></b>
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
        </div>
        ) : null}      
          </>
          </div>
          {/* <h2>5 day ForeCasting with Different Time frames</h2> */}
          {/* <button type="button" onClick={() => getfiveData()}>5 day Weather</button> */}
          <div className='card-container'>{weatherList_five}</div>
          {/* <h2>7 day ForeCasting</h2> */}
          <div className='card-container'> {weatherList_seven}</div>
          {/* <h2>48 hours ForeCasting</h2> */}
          <div className='card-container'>{weatherList_fourtyeight}</div>
    </div>
  );
}
export default App;
