import "./App.css";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import { Icon, divIcon, point } from "leaflet";
import { useState, useEffect } from "react";
import L from 'leaflet';
import Topdiv from "./topdiv";

const customIconStart = new Icon({
  iconUrl: require("./icons/placeholder2.png"),
  iconSize: [38, 38]
});

const customIconEnd = new Icon({
  iconUrl: require("./icons/placeholder3.png"),
  iconSize: [38, 38]
});

const createClusterCustomIcon = function (cluster) {
  return new divIcon({
    html: `<span class="cluster-icon">${cluster.getChildCount()}</span>`,
    className: "custom-marker-cluster",
    iconSize: point(33, 33, true)
  });
};

const markers = [
  {
    geocode: [22.1696, 91.4996],
  },
  {
    geocode: [22.2636, 91.7159],
  }
];

const App = () => {
  const [position, setPosition] = useState({ lat: 22.1696, lng: 91.4996 });

  useEffect(() => {
    const targetPosition = { lat: 22.2636, lng: 91.7159 };
    const distance = Math.sqrt(
      Math.pow(targetPosition.lat - position.lat, 2) +
      Math.pow(targetPosition.lng - position.lng, 2)
    );

    const speed = 100; // km/h
    const refreshRate = 2; // fps
    const time = (distance / speed) * 3600; // in seconds
    const steps = time * refreshRate; // total steps

    let currentStep = 0;
    const interval = setInterval(() => {
      currentStep++;
      const fraction = currentStep / steps;
      setPosition({
        lat: position.lat + fraction * (targetPosition.lat - position.lat),
        lng: position.lng + fraction * (targetPosition.lng - position.lng)
      });

      if (currentStep >= steps) {
        clearInterval(interval);
        setPosition(targetPosition);
      }
    }, 1000 / refreshRate);

    return () => clearInterval(interval);
  }, []);

  const customIcon = L.icon({
    iconUrl: require("./icons/pointer.png"),
    iconSize: [59, 32.33],
    rotationAngle: 70
  });

  return (

    <div className="main">


      <Topdiv />



      <MapContainer center={[22.2166, 91.60775]} zoom={11}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker key={1} position={markers[0].geocode} icon={customIconStart}>

        </Marker>
        <Marker key={2} position={markers[1].geocode} icon={customIconEnd} >

        </Marker>


        <Marker position={position} icon={customIcon} />

      </MapContainer>
    </div>


  );
};

export default App;
