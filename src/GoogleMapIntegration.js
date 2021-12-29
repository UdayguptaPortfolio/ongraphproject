import React from 'react';
import './App.css';
import {GoogleMap,InfoBox,Marker} from '@react-google-maps/api';
import { Wrapper} from "@googlemaps/react-wrapper";


function GoogleMapIntegration(props)
{
  //console.log('Latitude value from Props:',props.lat)
return (
  <>
  <Wrapper
  apiKey={"AIzaSyDA-Uc8D0Lt2BZz11q2RVHDHwqCv7LFpkg"}>
  <GoogleMap  mapContainerStyle={{width:"95%",height:'40vh',marginBottom:'5vh',marginLeft:'5vh'}}
  zoom={6}
  center={props}
  >
    <InfoBox position={{lat:props.lat , lng:props.lng}} ><h1>{props.temp}</h1></InfoBox>
    <Marker position={{lat:props.lat , lng:props.lng} } 
    />
  </GoogleMap>
    </Wrapper>
  </>
);
}

export default GoogleMapIntegration;