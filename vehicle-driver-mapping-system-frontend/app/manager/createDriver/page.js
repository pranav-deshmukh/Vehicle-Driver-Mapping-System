"use client";
import { useState } from "react";
import axios from "axios";
import Navigation from "./../components/Navigation";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

export default function DriverForm() {
  const [formData, setFormData] = useState({
    driverId: "",
    driverName: "",
    driverEmail: "",
    phone: "",
    location: { lat: 51.505, lng: -0.09 },
    vehicle: "",
  });

  const [responseMessage, setResponseMessage] = useState(null);

  const handleMapClick = (e) => {
    const { lat, lng } = e.latlng;
    setFormData((prevData) => ({
      ...prevData,
      location: { lat, lng },
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setResponseMessage(null); // Clear previous response message

    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/manager/createDriver",
        formData
      );
      setResponseMessage(response.data.message); // Store the success message from the API
    } catch (error) {
      setResponseMessage(
        error.response?.data?.message || "An error occurred. Please try again."
      ); // Store the error message from the API
    }
  };

  return (
    <div className="flex">
      <Navigation />
      <div className="max-w-4xl mx-auto p-2 bg-white rounded-lg shadow-md w-[80%] h-screen overflow-y-auto">
        <h1 className="text-3xl font-semibold mb-6 text-gray-800">
          Driver Information Form
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="driverId"
                className="block text-sm font-medium text-gray-600 mb-1"
              >
                Driver ID
              </label>
              <input
                type="text"
                id="driverId"
                name="driverId"
                value={formData.driverId}
                onChange={handleChange}
                className="block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
              />
            </div>
            <div>
              <label
                htmlFor="driverName"
                className="block text-sm font-medium text-gray-600 mb-1"
              >
                Driver Name
              </label>
              <input
                type="text"
                id="driverName"
                name="driverName"
                value={formData.driverName}
                onChange={handleChange}
                className="block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
              />
            </div>
            <div>
              <label
                htmlFor="driverEmail"
                className="block text-sm font-medium text-gray-600 mb-1"
              >
                Driver Email
              </label>
              <input
                type="email"
                id="driverEmail"
                name="driverEmail"
                value={formData.driverEmail}
                onChange={handleChange}
                className="block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
              />
            </div>
            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-600 mb-1"
              >
                Phone
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Location
              </label>
              <div className="border p-2 rounded-lg text-gray-700 bg-gray-100">
                {`Latitude: ${formData.location.lat}, Longitude: ${formData.location.lng}`}
              </div>
            </div>
          </div>

          <div className="">
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Map
            </label>
            <MapContainer
              center={[formData.location.lat, formData.location.lng]}
              zoom={13}
              style={{ height: "300px", width: "100%" }}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              <Marker
                position={[formData.location.lat, formData.location.lng]}
                icon={L.icon({
                  iconUrl: "/locationPointer.png",
                  iconSize: [25, 41],
                  iconAnchor: [12, 41],
                  popupAnchor: [1, -34],
                })}
              />
              <LocationMarker onClick={handleMapClick} />
            </MapContainer>
          </div>

          <button
            type="submit"
            className="inline-flex justify-center py-2 px-6 border border-transparent text-base font-medium rounded-lg shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Submit
          </button>
        </form>

        {/* Display the response message */}
        {responseMessage && (
          <div className="mt-4 p-4 border rounded-lg bg-gray-100">
            <p className="text-sm text-gray-700">{responseMessage}</p>
          </div>
        )}
      </div>
    </div>
  );
}

function LocationMarker({ onClick }) {
  const map = useMapEvents({
    click(e) {
      onClick(e);
      map.flyTo(e.latlng, map.getZoom());
    },
  });

  return null;
}
