import React from "react";
import axios from "axios";
import "./App.css"

const Sixteenday=(props)=>{

    let [sixteenday,setSixteenday]=React.useState('')
    let[check, setCheck] = React.useState(false)
    
    function onhandle(){

        setCheck((prev)=>{
           return prev ? false : true
        })
    }

    React.useEffect(()=>{
        console.log("my Props"+props.state);
        axios.get("https://community-open-weather-map.p.rapidapi.com/forecast/daily",{
            params:{
                q: props.state || 'noida'
            },
            headers:{
                "x-rapidapi-host":"community-open-weather-map.p.rapidapi.com",
                "x-rapidapi-key":"c00073ed8bmsh2ba1281175adbb9p159828jsn0115148d4c9a"
            }
        },{
        }).then(response=>{
            setSixteenday(response.data)
        }).catch(error => {
            console.log(error.message)
        })
    },[props.state])

    const sixteendayWeather = sixteenday?.list?.map((el)=>(
        <div>
            <table>
                <tr>
            <th> Day Temperature</th>
            <th> Night Temperature</th>
            <th> Morning Temperature</th>
            <th>Pressure</th>
            <th>Weather</th>
            <th>Humidity</th>
            </tr>
            <tr><td>{el.temp.day}</td>
            <td>{el.temp.night}</td>
            <td>{el.temp.morn}</td>
            <td>{el.pressure}</td>
            <td>{el.weather[0].description}</td>
            <td>{el.humidity}</td></tr>

            </table>
        </div>
    ))


    return (
        <>
        <br/>
        <br/>
        <h2>Sixteen Day Weather Condition</h2>
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
                     onClick = {onhandle}>Sixteen Day ForeCasting </button>
            <div
            style={{backgroundColor:"lightblue",
            borderRadius: '50px',
            border: 'green',
        }}
            >
                <br/>
                    {check && sixteendayWeather}
            </div>
        </>
    )
}
export default Sixteenday;