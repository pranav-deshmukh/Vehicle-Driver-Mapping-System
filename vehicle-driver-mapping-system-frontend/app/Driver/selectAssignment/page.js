"use client";

import Navbar from "../components/Navigation";
import { useState } from "react";
import axios from "axios";

export default function SelectAssignment() {
  const [driverId, setDriverId] = useState("");
  const [pendingRequests, setPendingRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/manager/getPendingRequests",
        {
          driverId: driverId,
        }
      );
      setPendingRequests(response.data.data.pendingRequests);
      setLoading(false);
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  };

  const handleResponse = async (requestId, vehicleId, response) => {
    try {
      // Send a POST request to respond to the assignment
      await axios.post(
        `http://localhost:3000/api/v1/manager/respondToRequest`,
        {
          vehicleId: vehicleId,
          response: response,
          driverId: driverId,
        }
      );

      // Update the UI to remove the responded request
      setPendingRequests((prevRequests) =>
        prevRequests.filter((request) => request._id !== requestId)
      );
    } catch (err) {
      console.error(`Error ${response} request:`, err);
    }
  };

  return (
    <div className="flex">
      <Navbar />
      <div className="w-[80%] p-4">
        <h1 className="text-2xl font-semibold mb-4">Pending Requests</h1>

        {/* Form to input driverId */}
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
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Fetch Pending Requests
          </button>
        </form>

        {/* Display pending requests */}
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error.message}</p>}
        {!loading && !error && pendingRequests.length === 0 && (
          <p>No pending requests found.</p>
        )}
        {!loading && !error && pendingRequests.length > 0 && (
          <ul className="space-y-4 w-[600px]">
            {pendingRequests.map((request) => (
              <li
                key={request._id}
                className="p-4 bg-gray-100 rounded-lg shadow-md flex justify-between items-center"
              >
                <div>
                  <p>
                    <strong>Vehicle ID:</strong> {request.vehicleId}
                  </p>
                  <p>
                    <strong>Status:</strong> {request.status}
                  </p>
                  <p>
                    <strong>Request ID:</strong> {request._id}
                  </p>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() =>
                      handleResponse(request._id, request.vehicleId, "accepted")
                    }
                    className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                  >
                    Accept
                  </button>
                  <button
                    onClick={() =>
                      handleResponse(request._id, request.vehicleId, "rejected")
                    }
                    className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                  >
                    Reject
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
