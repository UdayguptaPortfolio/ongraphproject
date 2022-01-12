import React,{useEffect, useState} from 'react';
import './App.css';
import {currentweather,sevendayweather,fourtyeighthours,fivedayweather} from './openweather';
import GoogleMapIntegration from './GoogleMapIntegration';
import {useNavigate} from "react-router-dom";
import Axios  from 'axios';


function DashBoard() {
const[lat,setLat]=useState(20.5937)
const[lon,setLon]=useState(78.9629)
const[temp,setTemp]=useState('')
const [city, setCity] = useState('');
const[errorMessage,setErrorMessage]=useState('')
const cityArray=[];
const navigate = useNavigate();
const headers={"Access-Control-Allow-Headers": "*"}
const [switchData,setSwitchData]=useState([])
  //Get Data for Current Live Weather
const getCurrentData = async () => {
    try{
      if(city===''||city===null)
      {
        setErrorMessage('Please Enter City Name........');
        setSwitchData([null,null])
      }
      else{
        setErrorMessage(null);
        const data = await currentweather(city);
        console.log("Data Consoling:",data)
        setLat(data.coord.lat)
        setLon(data.coord.lon)
        setTemp(data.main.temp)
        setSwitchData(["weatherdata",data])
        cityArray.push(city)
      Axios.post('http://localhost:4000/app/city',{
        cityname:cityArray,
        email:localStorage.getItem("email")
      }).then((res)=>{
        console.log("City Added to Array",res)
      })
      console.log("My city",city)
      Axios.post('http://localhost:4000/app/most',
      {
        cityname:city,
        email:localStorage.getItem("email"),
        count:1,
      min_temp:parseFloat(data.main.temp_min - 273.15).toFixed(1),
    max_temp:parseFloat(data.main.temp_max - 273.15).toFixed(1)
  }).then((res)=>{
        console.log("Frontend Email:",localStorage.getItem("email"))
      })
    }
    }catch(error) {
      console.log(error.message);
    }
   
  }

  //Get Data for 5 days in 3hours time frame
const getfiveData=async()=>{
  try{
    if(city===''||city===null)
      {
      setErrorMessage('Please Enter City Name........');
     setSwitchData([null,null])
      }
      else{
        setErrorMessage(null);
        console.log("I am inside fiveDay Weather",city)
    const data_five=await fivedayweather(city);
    setSwitchData(["weatherfivedata",data_five])
      }
  }catch(error)
  {
    console.log(error.message);
  }
}
// Get Data for 7 days Weather
const getsevenData=async()=>{
  try{
    if(city===''||city===null)
    {
      setErrorMessage('Please Enter City Name........');
      setSwitchData([null,null])
    }
      else{
        setErrorMessage(null);
    const data_seven=await sevendayweather(lat,lon);
    setSwitchData(["weathersevendata",data_seven])
      }
  }catch(error)
  {
    console.log(error.message);
  }
}
// Get Data for 48 hours Weather
const getfourtyeightData=async()=>{
  try{
    if(city===''||city===null){
      setErrorMessage('Please Enter City Name........');
      setSwitchData([null,null])
    }
      else{
        setErrorMessage(null);
    const data_fourtyeight=await fourtyeighthours(lat,lon);
    setSwitchData(["weatherfourtyeightdata",data_fourtyeight])
      }
  }catch(error)
  {
    console.log(error.message);
  }
}
const escape=()=>{
  setSwitchData([null,null])
}

const mostSearchedCityData=async()=>{
Axios.get('http://localhost:4000/app/data').then(async(res)=>{
  console.log("My Data",res.data)
  setSwitchData(["mostSearchedCity",res.data])
})
}

const searchedCityMinTempData=()=>{
  Axios.get('http://localhost:4000/app/min_temp').then(async(res)=>{
    console.log("My Minimum Temp Data",res.data)
    setSwitchData(["minTempCity",res.data])
  })
}

const searchedCityMaxTempData=()=>{
  Axios.get('http://localhost:4000/app/max_temp').then(async(res)=>{
    console.log("My Maximum Temp Data",res.data)
    setSwitchData(["maxTempCity",res.data])
  })
}
const mostSearched_City=switchData[0]==='mostSearchedCity' && switchData[1]?
<div className='card-container'>
<div className="main">
<p>Most Searched City is:<b>{switchData[1]}</b></p>
</div>
</div>:null

const minTemp_City=switchData[0]==='minTempCity' && switchData[1]?
<div className='card-container'>
<div className="main">
<p>The Searched City with Minimum Temperature:<b>{switchData[1]}</b></p>
</div>
</div>:null

const maxTemp_City=switchData[0]==='maxTempCity' && switchData[1]?
<div className='card-container'>
<div className="main">
<p>The Searched City with Maximum Temperature:<b>{switchData[1]}</b></p>
</div>
</div>:null

const currentweather_List=switchData[0]==='weatherdata' && switchData[1]?
<div>
  {/* <h2 className='heading'>Current Weather Condition</h2><br/> */}
<div className='card-container'>
<div className="main"
onClick={escape}>
<b>Date:<i> {new Date(switchData[1].dt*1000).toDateString() } </i></b>
<div className="weather-icon">
<img src={`http://openweathermap.org/img/w/${switchData[1].weather[0].icon}.png`} alt="imgicon"/>
</div>
<h3>{switchData[1].weather[0].main}</h3>
<div className="temperature">
<h1>{parseFloat(switchData[1].main.temp - 273.15).toFixed(1)}&deg;C</h1>
</div>
<div className="location">
<h3><i></i>{switchData[1].name} | {switchData[1].sys.country}</h3>
</div>
<div className="temperature-range">
<h5>Minimum: {parseFloat(switchData[1].main.temp_min - 273.15).toFixed(1)}&deg;C 
|| Maximum: {parseFloat(switchData[1].main.temp_max - 273.15).toFixed(1)}&deg;C 
|| Humidity: {switchData[1].main.humidity}%</h5>
</div>
</div>
</div>
</div>
:null

const weatherList_five = switchData[0]==='weatherfivedata' && switchData[1]?.list?.map((el)=>(
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
const weatherList_seven = switchData[0]==='weathersevendata' && switchData[1]?.daily?.map((el)=>(
  <div>

       <div className="main-thirty">
       <i> {new Date(el.dt*1000).toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true }) } </i><br/>
       <b>{new Date(el.dt*1000).toDateString('en-US',{weekday: 'long'} ) }</b>
            <div className="weather-icon">
              <img src={`http://openweathermap.org/img/w/${el.weather[0].icon}.png`} alt="imgicon"/>
            </div>
            <h3>{el.weather[0].description}</h3>
            <h2>{parseFloat(el.temp.day-273.15).toFixed(1)}&deg;C</h2>
            <div className='description'>
            <h3>Sunrise: {new Date(el.sunrise*1000).toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}<br/>
            Sunset:{new Date(el.sunset*1000).toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}<br/></h3><h5>
            Minimum Temperature:{parseFloat(el.temp.min - 273.15).toFixed(1)}&deg;C
            Maximum Temperature: {parseFloat(el.temp.max - 273.15).toFixed(1)}&deg;C 
            Humidity: {el.humidity}%</h5>
            </div>
            </div>
  </div>
))
const weatherList_fourtyeight = switchData[0]==='weatherfourtyeightdata' && switchData[1]?.hourly?.map((el)=>(
  <div>
       <div className="main-thirty">
       <i> {new Date(el.dt*1000).toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true }) } </i><br/>
       <b>{new Date(el.dt*1000).toLocaleDateString('en-US',{weekday: 'long'} ) }</b>
            <div className="weather-icon">
              <img src={`http://openweathermap.org/img/w/${el.weather[0].icon}.png`} alt="imgicon"/>
            </div>
            <h3>{el.weather[0].description}</h3>
            <h2>{parseFloat(el.temp-273.15).toFixed(1)}&deg;C</h2>
            <div>
            <h5>Wind Speed: {el.wind_speed}NW Km/hr
            Wind Gusts: {el.wind_gust}NW Km/hr<br/>
            Dew Points: {parseFloat(el.dew_point- 273.15).toFixed(1)}&deg;C<br/>
            Clouds: {el.clouds}%
              || Humidity: {el.humidity}%</h5>
    
            </div>
            </div>
  </div>
))
const logout=()=>{
  setSwitchData([null,null])
  localStorage.setItem("email",null)
  navigate('/Home');
}
  return (
    <div className="App">
      <header className="App-header">
       <h2 className='header'> Weather-Finder App</h2> 
        <button className='button-header-D' onClick={()=>logout()}>LogOut</button>
        </header>
          <br/>
          <GoogleMapIntegration lat={lat} lng={lon} temp={(temp- 273.15).toFixed(1).toString()+'°C'} />
          <div className='container'>
        <div className="search">
          <input type="text" value={city} onChange={(e) => setCity(e.target.value)} placeholder="Enter your city name"/>
        </div>  
        <button type="button" onClick={() => getCurrentData()}>Current weather</button>
        <button type="button" onClick={() => getfiveData()}>5 day Weather</button> 
        <button type="button" onClick={() => getsevenData()}>7 day Weather</button>
        <button type="button" onClick={() => getfourtyeightData()}>48 hours Weather</button>
        <button type="button" onClick={()=>mostSearchedCityData()}>Get Most Searched Cities</button>
        <button type="button" onClick={()=>searchedCityMinTempData()}>Searched City With Min Temp</button>
        <button type="button" onClick={()=>searchedCityMaxTempData()}>Searched City With Max Temp</button>
        <>
        <br/><br/>  
        <div><h2 className='Error-message'>{errorMessage}</h2></div>    
          </>
          </div>
                <div className='card-container'>{switchData[0]==='weatherdata' && currentweather_List}</div>
            <div className='card-container'>{switchData[0]==='weatherfivedata' && weatherList_five}</div>
          <div className='card-container'> {switchData[0]==='weathersevendata' && weatherList_seven}</div>
          <div className='card-container'>{switchData[0]==='weatherfourtyeightdata' && weatherList_fourtyeight}</div>
          <div className='card-container'>{switchData[0]==='mostSearchedCity' && mostSearched_City}</div>
          <div className='card-container'>{switchData[0]==='minTempCity' && minTemp_City}</div>
          <div className='card-container'>{switchData[0]==='maxTempCity' && maxTemp_City}</div>
          <div> 
           </div>
    </div>
  );
}
export default DashBoard;
