import React,{useRef,useState} from 'react';
import './App.css';
import {GoogleMap,InfoBox,Marker} from '@react-google-maps/api';
import { Wrapper} from "@googlemaps/react-wrapper";


function GoogleMapIntegration(props)
{

  const mapRef = useRef(props);
  const [position, setPosition] = useState({
      lat: 20.5937, 
      lng: 78.9629
  });

  function handleLoad(map) {
    mapRef.current = map;
  }

  function handleCenter() {
    if (!mapRef.current) return;
    setPosition({lat:props.lat , lng:props.lng});
  }
  console.log(props.temp)
return (
  <>
  <Wrapper
  apiKey={"AIzaSyDA-Uc8D0Lt2BZz11q2RVHDHwqCv7LFpkg"}>
  <GoogleMap  mapContainerStyle={{width:"95%",height:'40vh',marginBottom:'5vh',marginLeft:'5vh'}}
  zoom={5}
  // center={props}
  onLoad={handleLoad}
  onDrag={handleCenter}
  center={position}
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