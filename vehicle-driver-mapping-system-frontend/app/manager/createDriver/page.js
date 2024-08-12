"use client";
import { useState } from "react";
import axios from "axios";
import Navigation from "./../components/Navigation";

export default function DriverForm() {
  const [formData, setFormData] = useState({
    driverId: "",
    driverName: "",
    driverEmail: "",
    phone: "",
    location: "",
    vehicle: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleWorkHoursChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      workHours: {
        ...prevData.workHours,
        [name]: value,
      },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/manager/createDriver",
        formData
      );
      console.log("Response from server:", response.data);
      // Optionally, you can reset the form or provide feedback to the user
      // setFormData({ ...initialFormData });
    } catch (error) {
      console.error("Error submitting form:", error);
      // Optionally, handle errors and provide feedback to the user
    }
  };

  return (
    <div className="flex">
      <Navigation />
      <div className="max-w-4xl mx-auto p-8 bg-white rounded-lg shadow-md mt-6 w-[80%]">
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
              <label
                htmlFor="location"
                className="block text-sm font-medium text-gray-600 mb-1"
              >
                Location
              </label>
              <input
                type="text"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="inline-flex justify-center py-2 px-6 border border-transparent text-base font-medium rounded-lg shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
