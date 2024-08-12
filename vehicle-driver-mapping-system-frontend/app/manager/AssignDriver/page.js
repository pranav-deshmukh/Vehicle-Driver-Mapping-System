"use client";

import Navbar from "../components/Navigation";
import { useState } from "react";
import axios from "axios";

export default function SendAssignmentRequest() {
  const [vehicleId, setVehicleId] = useState(""); // State to store vehicleId input
  const [driverIdInput, setDriverIdInput] = useState(""); // State to store current driverId input
  const [driverIds, setDriverIds] = useState([]); // State to store the list of driverIds
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleAddDriverId = () => {
    if (driverIdInput && !driverIds.includes(driverIdInput)) {
      setDriverIds([...driverIds, driverIdInput]);
      setDriverIdInput(""); // Clear the input field after adding
    }
  };

  const handleRemoveDriverId = (id) => {
    setDriverIds(driverIds.filter((driverId) => driverId !== id));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/manager/sendAssignmentRequest",
        {
          vehicleId: vehicleId,
          driverIds: driverIds, // Sending driverIds as an array
        }
      );

      if (response.status === 200) {
        setSuccess(true);
        setDriverIds([]); // Clear driverIds after successful submission
        setVehicleId("");
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
        <h1 className="text-2xl font-semibold mb-4">Send Assignment Request</h1>

        {/* Form to input vehicleId and driverIds */}
        <form onSubmit={handleSubmit} className="mb-6">
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

          <div className="mb-4">
            <label
              htmlFor="driverIds"
              className="block text-sm font-medium text-gray-700"
            >
              Driver ID
            </label>
            <div className="flex items-center">
              <input
                type="text"
                id="driverIds"
                value={driverIdInput}
                onChange={(e) => setDriverIdInput(e.target.value)}
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Enter Driver ID"
              />
              <button
                type="button"
                onClick={handleAddDriverId}
                className="ml-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
              >
                Add
              </button>
            </div>
          </div>

          {/* Display selected driverIds */}
          <div className="mb-4">
            {driverIds.map((id) => (
              <span
                key={id}
                className="inline-flex items-center px-3 py-1 mr-2 mb-2 bg-green-600 text-white rounded-full cursor-pointer"
              >
                {id}
                <button
                  onClick={() => handleRemoveDriverId(id)}
                  className="ml-2 text-sm text-red-600 hover:text-red-800"
                >
                  &times;
                </button>
              </span>
            ))}
          </div>

          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Send Assignment Request
          </button>
        </form>

        {/* Display loading, error, or success messages */}
        {loading && <p>Sending request...</p>}
        {error && <p className="text-red-500">Error: {error}</p>}
        {success && (
          <p className="text-green-500">
            Assignment request sent successfully!
          </p>
        )}
      </div>
    </div>
  );
}
