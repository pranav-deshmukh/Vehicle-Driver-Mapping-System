"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "@/app/manager/components/Navigation";

export default function VehicleInfo() {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/v1/manager/getVehicles"
        );
        setVehicles(response.data.data.vehicles);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchVehicles();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="flex">
      <Navbar />
      <div className="w-[80%] flex flex-col items-center p-8">
        <h1 className="text-3xl font-bold mb-8">Vehicle Information</h1>
        {vehicles.length === 0 ? (
          <p>No vehicles found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-7xl">
            {vehicles.map((vehicle) => (
              <div
                key={vehicle._id}
                className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition-shadow"
              >
                <h2 className="text-xl font-semibold mb-2">
                  {vehicle.makeAndModel}
                </h2>
                <p>
                  <strong>Vehicle ID:</strong> {vehicle.vehicleId}
                </p>
                <p>
                  <strong>License Plate:</strong> {vehicle.licensePlate}
                </p>
                <p className="text-gray-500 text-sm">
                  <strong>Created At:</strong>{" "}
                  {new Date(vehicle.createdAt).toLocaleString()}
                </p>
                <p className="text-gray-500 text-sm">
                  <strong>Updated At:</strong>{" "}
                  {new Date(vehicle.updatedAt).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
