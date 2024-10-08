# Vehicle-Driver Mapping System

## Overview

The Vehicle-Driver Mapping System is a comprehensive application designed to manage and assign drivers to vehicles based on their availability and scheduling needs. The system allows managers to request driver assignments, view available drivers, and handle driver responses. It also features a map-based interface for visualizing driver locations and vehicle assignments.

## Features

- **Driver Management**: Search and view available drivers based on name and phone number.
- **Assignment Requests**: Send assignment requests to drivers and handle their responses.
- **Scheduling**: Manage and visualize driver schedules and vehicle assignments.
- **Location Mapping**: View drivers on a map based on their locations.

## Technologies Used

- **Frontend**: Next.js, React, Tailwind CSS
- **Backend**: Node.js, Express, MongoDB (Mongoose)
- **Maps Integration**: Google Maps API

## Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (v14.x or later)
- MongoDB (Local or a cloud-based instance)
- API keys for Google Maps

## Setup and Installation

### Frontend

1. **Clone the Repository**

   ```bash
   git clone https://github.com/your-username/vehicle-driver-mapping-system.git
   cd vehicle-driver-mapping-system
   cd frontend
    npm install
    npm run dev
   cd backend
   npm install

   ```

   Create a .env file in the backend directory with the following variables:
   MONGODB_URI=your-mongodb-uri
   PORT=5000
   npm start
