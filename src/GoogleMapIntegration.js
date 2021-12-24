import React,{useState} from 'react';
import './App.css';
import {GoogleMap,InfoWindow,Marker} from '@react-google-maps/api';
import { Wrapper} from "@googlemaps/react-wrapper";



function GoogleMapIntegration(props)
{
return (
  <>
  <Wrapper
  apiKey={"AIzaSyDA-Uc8D0Lt2BZz11q2RVHDHwqCv7LFpkg"}>
  <GoogleMap  mapContainerStyle={{width:"95%",height:'40vh',marginBottom:'5vh',marginLeft:'5vh'}}
  zoom={10}
  center={props}>
    <Marker position={props} />
  
  </GoogleMap>
    </Wrapper>
  </>
);
}

export default GoogleMapIntegration;