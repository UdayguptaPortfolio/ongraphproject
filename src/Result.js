import React from "react";


 const Result=(props)=>
{
    return(
        <div>
           {props.responseObj.cod === 200 ?
               <div>
                   <p><strong>{props.responseObj.name}</strong></p>
                   <p style={{
                       height:'10px'
                   }}>Currently {Math.round(props.responseObj.main.temp)} degrees <br/>{props.responseObj.weather[0].description}.</p>
               </div>
           : null
           }
       </div>
    )
}
export default Result;