"use client";

import Navbar from "../components/Navigation";
import { useState, useEffect } from "react";
import axios from "axios";

export default function SendAssignmentRequest() {
  const [vehicleId, setVehicleId] = useState("");
  const [driverIdInput, setDriverIdInput] = useState("");
  const [driverIds, setDriverIds] = useState([]);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  // State for storing all drivers and search results
  const [drivers, setDrivers] = useState([]);
  const [searchName, setSearchName] = useState("");
  const [searchPhone, setSearchPhone] = useState("");
  const [filteredDrivers, setFilteredDrivers] = useState([]);

  useEffect(() => {
    // Fetch all drivers when component mounts
    const fetchDrivers = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/v1/manager/getDrivers"
        );
        setDrivers(response.data.data.drivers);
        setFilteredDrivers(response.data.data.drivers);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchDrivers();
  }, []);

  useEffect(() => {
    // Filter drivers based on search criteria
    const filterDrivers = () => {
      const nameLower = searchName.toLowerCase();
      const phoneLower = searchPhone.toLowerCase();

      const results = drivers.filter(
        (driver) =>
          (nameLower
            ? driver.driverName.toLowerCase().includes(nameLower)
            : true) &&
          (phoneLower ? driver.phone.toLowerCase().includes(phoneLower) : true)
      );
      setFilteredDrivers(results);
    };

    filterDrivers();
  }, [searchName, searchPhone, drivers]);

  const handleAddDriverId = () => {
    if (driverIdInput && !driverIds.includes(driverIdInput)) {
      setDriverIds([...driverIds, driverIdInput]);
      setDriverIdInput("");
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
          driverId: driverIds,
          startTime: startTime,
          endTime: endTime,
        }
      );

      if (response.status === 200) {
        setSuccess(true);
        setDriverIds([]);
        setVehicleId("");
        setStartTime("");
        setEndTime("");
      }

      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
      console.log(err);
    }
  };

  return (
    <div className="flex h-screen ">
      <Navbar />
      <div className="w-[80%] p-4 bg-slate-100">
        <h1 className="text-2xl font-semibold mb-4">Send Assignment Request</h1>
        <div className="flex justify-around items-center gap-7 bg-slate-300 rounded-2xl p-2">
          <div className="mb-6 w-[400px]">
            <h2 className="text-xl font-semibold mb-4">Search Drivers</h2>
            <div className="mb-4">
              <label
                htmlFor="searchName"
                className="block text-sm font-medium text-gray-700"
              >
                Search by Name
              </label>
              <input
                type="text"
                id="searchName"
                value={searchName}
                onChange={(e) => setSearchName(e.target.value)}
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Enter driver name"
              />
            </div>
            <div className="">
              <label
                htmlFor="searchPhone"
                className="block text-sm font-medium text-gray-700"
              >
                Search by Phone
              </label>
              <input
                type="text"
                id="searchPhone"
                value={searchPhone}
                onChange={(e) => setSearchPhone(e.target.value)}
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Enter driver phone number"
              />
            </div>
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-4">Available Drivers</h2>
            {filteredDrivers.length === 0 ? (
              <p>No drivers found.</p>
            ) : (
              <ul className="h-[60px] overflow-y-auto w-[400px]">
                {filteredDrivers.map((driver) => (
                  <li key={driver.driverId} className="mb-2">
                    <span className="font-semibold">{driver.driverName}</span> -{" "}
                    {driver.phone} - {driver.driverId}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
        <form
          onSubmit={handleSubmit}
          className="mb-6 w-[400px] ml-10 mt-4 h-[360px] overflow-y-auto"
        >
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

          <div className="mb-4">
            <label
              htmlFor="startTime"
              className="block text-sm font-medium text-gray-700"
            >
              Start Time
            </label>
            <input
              type="datetime-local"
              id="startTime"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="endTime"
              className="block text-sm font-medium text-gray-700"
            >
              End Time
            </label>
            <input
              type="datetime-local"
              id="endTime"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>

          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Send Assignment Request
          </button>

          {loading && <p>Sending request...</p>}
          {error && <p className="text-red-500">Error: {error}</p>}
          {success && (
            <p className="text-green-500">
              Assignment request sent successfully!
            </p>
          )}
        </form>
      </div>
    </div>
  );
}
