import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "./mapa.css";
import { useEffect, useState } from "react";

const center = [38, -10];
const position = [41, -9];
const getIcon = () => {
  const icon = new L.icon({
    iconUrl: "../ALLOSAURUS.png",
  });
  return icon;
};
const southWest = L.latLng(-75, -180);
const northEast = L.latLng(78, 190);
const bounds = L.latLngBounds(southWest, northEast);
const Mapa = () => {
  localStorage.setItem("pageDino", "mapa");
  const [dinos, setDinos] = useState(null);
  const [filterDinos, setFilterDinos] = useState(null);
  const getDinos= async () => {
    const data = await fetch("https://63ee3a9bd466e0c18babfb1c.mockapi.io/dinosaurs")
    const dinos = await data.json()
    setDinos(dinos)
    setFilterDinos(dinos)}
  useEffect(() => {
    getDinos()
  }, []);
  return (
    <main className="mainMapa">
      <MapContainer
        center={center}
        zoom={4}
        style={{ width: "100vw", height: "calc(100vh - 80px)" }}
        maxZoom={6}
        minZoom={4}
        maxBounds={bounds}
      >
        <TileLayer
          url="https://api.maptiler.com/tiles/satellite-v2/{z}/{x}/{y}.jpg?key=lrkSSWlrlq0GXEsRnGOY"
          attribution='<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
        ></TileLayer>
        <Marker position={position} icon={getIcon()}>
          <Popup className="leaflet-popup">
            <div className="hola">hola</div>
          </Popup>
        </Marker>
      </MapContainer>
    </main>
  );
};
export default Mapa;
