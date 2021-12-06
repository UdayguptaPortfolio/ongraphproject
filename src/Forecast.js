import React from "react";
import axios from "axios";
import Result from "./Result";

const Forecast=()=>{


    let [state,setState]=React.useState('')
    let [responseObj, setResponseObj] = React.useState({});
    
    function onhandle(event)
    {
        
        setResponseObj({});

        setState(event.target.value)

    }
    const uridata=encodeURIComponent(state);
    React.useEffect(()=>{
        axios.get("https://community-open-weather-map.p.rapidapi.com/weather",{
            params:{
                q: 'Shahjahanpur'
            },
            headers:{
                'x-rapidapi-host': 'community-open-weather-map.p.rapidapi.com',
                'x-rapidapi-key': '475d40d798msh7baa4809ef319bdp180968jsnc9e7bba70280'
            }
        }).then((response)=>{
        
            setResponseObj(response.data);
        })
        .catch((err) => {
            console.log(err)    
        })

    },[])
    //console.log(state)
return(
<div>
<h2>Current Weather Condition</h2>
            <form onSubmit={onhandle}>
                <input
                    type="text"
                    placeholder="Enter Your City Name"
                    maxLength="100"
                    value={state}
                    onChange={onhandle}
                    />
                    <br/>
<br/>
                <button style={{
                    gridColumn: '1 / -1',
                    height:'40px',
                    borderRadius: '10px',
                    background: 'linear-gradient(90.41deg, #711F8D 1.14%, #A818DA 100%)',
                    color: 'white',
                    border: 'none',
                    cursor: 'pointer'}} type="submit">Forecasting Here </button>
            </form>
            <br/>
            <Result responseObj={responseObj}/>
    </div>
        )
    }

export default Forecast;