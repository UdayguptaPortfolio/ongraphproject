import React from "react";
import axios from "axios";

const Thirtyday = (props)=>{

    let[thirtyweather,setThirtyWeather] = React.useState("");
    let[check, setCheck] = React.useState(false)
    function onhandle(){

        setCheck((prev)=>{
           return prev ? false : true
        })
    }
    React.useEffect(()=>{
        axios.get("https://community-open-weather-map.p.rapidapi.com/climate/month",{
            params:{
                q: props.answer || 'noida'
            },
            headers:{
                "x-rapidapi-host":"community-open-weather-map.p.rapidapi.com",
                "x-rapidapi-key":"475d40d798msh7baa4809ef319bdp180968jsnc9e7bba70280"
            }
        },{
        }).then(response=>{
            setThirtyWeather(response.data)
        }).catch(error => {
            console.log(error.message)
        })
    },[props.answer])


    const weatherList = thirtyweather?.list?.map((el)=>(
                        <div><p>{"Temperature will be :"+el.temp.average}</p><p>{"Pressure will be :" + el.pressure}</p> <p>{"WindSpeed will be :" + el.wind_speed}</p>
                            <p>{"Humidity will be :" + el.humidity}</p>
                        </div>
                    ))

    return(
        <>
        <br/>
        <br/>
        <h2>Thirty Day Weather Condition</h2>
        <div>
            </div>
            <button style={{
                    gridColumn: '1 / -1',
                    height:'40px',
                    borderRadius: '10px',
                    background: 'linear-gradient(90.41deg, #711F8D 1.14%, #A818DA 100%)',
                    color: 'white',
                    border: 'none',
                    cursor: 'pointer'}} 
                     onClick = {onhandle}>ForeCasting Here </button>
            <div
            style={{backgroundColor:"lightblue",
            borderRadius: '50px',
            border: 'green',
        }}
            >
                    {check && weatherList}
            </div>
        </>
    )
}


export default Thirtyday;