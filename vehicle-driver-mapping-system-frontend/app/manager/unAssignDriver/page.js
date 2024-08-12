"use client";

import Navbar from "../components/Navigation";
import { useState } from "react";
import axios from "axios";

export default function UnassignVehicle() {
  const [driverId, setDriverId] = useState(""); // State to store driverId input
  const [vehicleId, setVehicleId] = useState(""); // State to store vehicleId input
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/manager/unassign",
        {
          driverId: driverId,
          vehicleId: vehicleId,
        }
      );

      if (response.status === 200) {
        setSuccess(true);
        setDriverId(""); // Clear driverId input after successful submission
        setVehicleId(""); // Clear vehicleId input after successful submission
      }

      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <div className="flex">
      <Navbar />
      <div className="w-[80%] p-4">
        <h1 className="text-2xl font-semibold mb-4">Unassign Vehicle</h1>

        {/* Form to input driverId and vehicleId */}
        <form onSubmit={handleSubmit} className="mb-6">
          <div className="mb-4">
            <label
              htmlFor="driverId"
              className="block text-sm font-medium text-gray-700"
            >
              Driver ID
            </label>
            <input
              type="text"
              id="driverId"
              value={driverId}
              onChange={(e) => setDriverId(e.target.value)}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Enter Driver ID"
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="vehicleId"
              className="block text-sm font-medium text-gray-700"
            >
              Vehicle ID
            </label>
            <input
              type="text"
              id="vehicleId"
              value={vehicleId}
              onChange={(e) => setVehicleId(e.target.value)}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Enter Vehicle ID"
              required
            />
          </div>

          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Unassign Vehicle
          </button>
        </form>

        {/* Display loading, error, or success messages */}
        {loading && <p>Processing request...</p>}
        {error && <p className="text-red-500">Error: {error}</p>}
        {success && (
          <p className="text-green-500">Vehicle unassigned successfully!</p>
        )}
      </div>
    </div>
  );
}
