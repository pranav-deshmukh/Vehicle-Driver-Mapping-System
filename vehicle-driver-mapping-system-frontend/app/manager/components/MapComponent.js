// components/MapComponent.js
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

export default function MapComponent({ drivers }) {
  const defaultPosition = [51.505, -0.09];
  console.log(drivers);

  return (
    <MapContainer
      center={defaultPosition}
      zoom={13}
      style={{ height: "300px", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {drivers.map((driver) => (
        <Marker
          key={driver.driverId}
          position={[driver.location.lat, driver.location.lng]}
          icon={L.icon({
            iconUrl: "/locationPointer.png",
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
          })}
        >
          <Popup>
            <strong>{driver.driverName}</strong>
            <br />
            {driver.phone}
            <br />
            ID: {driver.driverId}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
