# The Med Portal

**Med Portal** is a web application designed to streamline the medicine supply process by connecting doctors, medical stores, patients, and caretakers. It optimizes medicine availability checks, streamlines prescription processes, and features a geolocation-based sorting of medical stores to enhance user convenience.

## Features

- **Doctor Login**: Secure login for doctors to create and manage digital prescriptions.
- **Medicine Availability**: Real-time checking of medicine availability across registered medical stores.
- **Caretaker Notifications**: Notifications are sent to caretakers when medicines are available, allowing for quick confirmation and ordering.
- **Stock Updates**: Automatic updates of medicine stock in medical stores upon order placement.
- **Medical Store Login**: Medical store owners can log in to update stock information.
- **Sorting by Distance**: Medicines are sorted based on the distance from the clinic using the OpenCage Geocoding API.

## Installation

### Prerequisites

- Node.js
- MongoDB
- A valid API key for OpenCage Geocoding API

### Setup

1. **Clone the repository:**

   ```bash
   git clone https://github.com/Gunankkatre/Med-portal.git
   cd Med-portal
   ```
2. **Navigate to the Backend folder and install dependencies:**

```bash
cd Backend
npm install
```
3. **Configure the environment:**

- Create a .env file in the Backend directory.

- Add your MongoDB connection string and OpenCage API key to the .env file:

```bash
MONGODB_URI=your_mongodb_connection_string
OPENCAGE_API_KEY=your_opencage_api_key
```
4. **Start the backend server:**

```bash
nodemon
```
5. **Navigate to the Frontend folder and install dependencies:**
   
```bash
cd ../Frontend
npm install
```
6. **Start the frontend application:**

```bash
npm run start
```

## Contributing

We welcome contributions to the Med Portal project. If you would like to contribute, please follow these steps:

- Fork the repository.
- Create a new branch (git checkout -b feature-branch).
- Make your changes and commit them (git commit -am 'Add new feature').
- Push the branch to your fork (git push origin feature-branch).
- Create a pull request.

##  Acknowledgements
- OpenCage Geocoding API: For geocoding and distance calculations.
- Node.js: For the backend development.
- React: For the frontend development.
- MongoDB: For the database.
