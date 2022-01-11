import React,{useState} from 'react';
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
const [selectedapi,setSelectedApi]=useState('')
const[commonResponseData,setCommonResponseData]=useState('')
const cityArray=[];
const navigate = useNavigate();
const headers={"Access-Control-Allow-Headers": "*"}

  //Get Data for Current Live Weather
const getCurrentData = async () => {
    try{
      if(city===''||city===null)
      {
        setErrorMessage('Please Enter City Name........');
        setSelectedApi(null)
      }
      else{
        const data = await currentweather(city);
        setLat(data.coord.lat)
        setLon(data.coord.lon)
        setTemp(data.main.temp)
        setCommonResponseData(data)
        setSelectedApi("weatherdata")
        cityArray.push(city)
      Axios.post('https://weather-backend-app.herokuapp.com/app/city', {headers:headers},{
        cityname:cityArray,
        email:localStorage.getItem("email")
      }).then((res)=>{
        console.log("City Added to Array",res)
      })
    }
    }catch(error) {
      console.log(error.message);
    }
    console.log("My city",city)
    Axios.post('https://weather-backend-app.herokuapp.com/app/most',
    {headers:headers,
      cityname:city,
      email:localStorage.getItem("email"),
      count:1}).then((res)=>{
      console.log("Hello",res)
    })
  }

  //Get Data for 5 days in 3hours time frame
const getfiveData=async()=>{
  try{
    if(city===''||city===null)
      {
      setErrorMessage('Please Enter City Name........');
     setSelectedApi(null)
      }
      else{
        setSelectedApi(null)
        console.log("I am inside fiveDay Weather",city)
    const data_five=await fivedayweather(city);
    setCommonResponseData(data_five);
    setSelectedApi("weatherfivedata")
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
      setSelectedApi(null)
    }
      else{
        setSelectedApi(null)
    const data_seven=await sevendayweather(lat,lon);
    setCommonResponseData(data_seven)
    setSelectedApi("weathersevendata")
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
      setSelectedApi(null)
    }
      else{
        setSelectedApi(null)
    const data_fourtyeight=await fourtyeighthours(lat,lon);
    setCommonResponseData(data_fourtyeight)
    setSelectedApi("weatherfourtyeightdata")
      }
  }catch(error)
  {
    console.log(error.message);
  }
}
const escape=()=>{
setSelectedApi(null)
}
const mostSearchedCityData=async()=>{
Axios.get('http://localhost:4000/app/data').then(async(res)=>{
  console.log("My Data",res.data)
  const data = await currentweather(res.data);
  setCommonResponseData(data)
  setSelectedApi("weatherdata")
})
}

const currentweather_List=selectedapi==='weatherdata' && commonResponseData?
<div>
  {/* <h2 className='heading'>Current Weather Condition</h2><br/> */}
<div className='card-container'>
<div className="main"
onClick={escape}>
<b>Date:<i> {new Date(commonResponseData.dt*1000).toDateString() } </i></b>
<div className="weather-icon">
<img src={`http://openweathermap.org/img/w/${commonResponseData.weather[0].icon}.png`} alt="imgicon"/>
</div>
<h3>{commonResponseData.weather[0].main}</h3>
<div className="temperature">
<h1>{parseFloat(commonResponseData.main.temp - 273.15).toFixed(1)}&deg;C</h1>
</div>
<div className="location">
<h3><i></i>{commonResponseData.name} | {commonResponseData.sys.country}</h3>
</div>
<div className="temperature-range">
<h5>Minimum: {parseFloat(commonResponseData.main.temp_min - 273.15).toFixed(1)}&deg;C 
|| Maximum: {parseFloat(commonResponseData.main.temp_max - 273.15).toFixed(1)}&deg;C 
|| Humidity: {commonResponseData.main.humidity}%</h5>
</div>
</div>
</div>
</div>
:null

const weatherList_five = selectedapi==='weatherfivedata' && commonResponseData?.list?.map((el)=>(
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
const weatherList_seven = selectedapi==='weathersevendata' && commonResponseData?.daily?.map((el)=>(
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
const weatherList_fourtyeight = selectedapi==='weatherfourtyeightdata' && commonResponseData?.hourly?.map((el)=>(
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
  setSelectedApi(null)
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
        <>
        <br/><br/>  
        <div><h2 className='Error-message'>{errorMessage}</h2></div>    
          </>
          </div>
                <div className='card-container'>{selectedapi==='weatherdata' && currentweather_List}</div>
            <div className='card-container'>{selectedapi==='weatherfivedata' && weatherList_five}</div>
          <div className='card-container'> {selectedapi==='weathersevendata' && weatherList_seven}</div>
          <div className='card-container'>{selectedapi==='weatherfourtyeightdata' && weatherList_fourtyeight}</div>
          <div> 
           </div>
    </div>
  );
}
export default DashBoard;
