import React from "react";
import axios from "axios";
import Result from "./Result";

const Forecast=()=>{


    let [state,setState]=React.useState('')
    let [responseObj, setResponseObj] = React.useState('');
    
    function onhandle(event)
    {
        
        //setResponseObj({});
        if(event.key==="Enter")
        {
            setState(event.target.value)}
        }
       
        
    React.useEffect(()=>{
        axios.get("https://community-open-weather-map.p.rapidapi.com/weather",{
            params:{
                q: state ||'London',
            },
            headers:{
                'x-rapidapi-host': 'community-open-weather-map.p.rapidapi.com',
                'x-rapidapi-key':'475d40d798msh7baa4809ef319bdp180968jsnc9e7bba70280'
            }
        }).then((response)=>{
        
            setResponseObj(response.data);
        })
        .catch((err) => {
            console.log(err)    
        });

    },[state]);
return(
            <>
            <h2>Current Weather Condition</h2>
            <div className="search">
              <input
                type="text"
                placeholder="Enter your city"
                onKeyDown={onhandle}
              />
            </div>
            <br/>
            <button style={{
                    gridColumn: '1 / -1',
                    height:'40px',
                    borderRadius: '10px',
                    background: 'linear-gradient(90.41deg, #711F8D 1.14%, #A818DA 100%)',
                    color: 'white',
                    border: 'none',
                    cursor: 'pointer'}} 
                    type="submit">Forecasting Here </button>
      
            <div className="container">
              {responseObj?.weather?.map((el) => (
                <div>
                  <h1> {el.description} </h1>
                  <img src = {"http://api.openweathermap.org/img/w/"+el.icon+".png"} alt = "please check internet"  />
                  <p><strong>{responseObj.name}</strong></p>
                   <p style={{
                       height:'10px'
                   }}>Currently {Math.round(responseObj.main.temp)} degrees <br/>{responseObj.weather[0].description}.</p>
                  
                </div>
              ))}
            </div>
          </>
    
        )
    }

export default Forecast;