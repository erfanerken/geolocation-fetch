Geolocation Utility - SDET Take-Home Assignment

Overview

This is a command-line utility that get latitude, longitude, and other location details based on:

City & State (e.g., "Philadelphia, PA")
Zip Code (e.g., "10001")

The project uses the OpenWeather Geocoding API to retrieve location data and includes integration tests to ensure correctness.

Features

- Get coordinates using city and state
- Get coordinates using zip codes
- Handles multiple inputs at once
- Error handling for invalid inputs (e.g., non-existent city/state, invalid ZIP codes)
- Restrictions on Hawaii & Alaska, per assignment requirement
- Comprehensive integration tests using Jest

Project Structure

geolocation-utility/
src/
  getLocationByCity.js       # Gets coordinates using city and state
  getLocationByZipCode.js    # Gets coordinates using zip code
  config.js                  # API key & Base URL configuration
  index.js                   # CLI script 
tests/
  getLocationByCity.test.js    # Integration tests for city-based lookup
  getLocationByZipCode.test.js # Integration tests for ZIP code-based lookup
  .env                         # Environment variables (ignored in Git)
  .gitignore                   # Excludes unnecessary files
  package.json                 # Project dependencies & scripts
  README.md                    # Project documentation

Setup & Installation

1️. Clone the Repository

git clone <repository_url>
cd geolocation-utility

2️. Install Dependencies

npm install

3️. Configure Environment Variables

Create a .env file in the root directory and add:

API_KEY=f897a99d971b5eef57be6fafa0d83239
BASE_URL=http://api.openweathermap.org/geo/1.0

4. Usage

Get Coordinates via City and State

node src/index.js "New York, NY"

Example Output:

{
  "name": "New York",
  "lat": 40.7128,
  "lon": -74.0060,
  "state": "New York",
  "country": "US"
}

Get Coordinates via Zip Code

node src/index.js "10001"

Example Output:

{
  "name": "New York",
  "lat": 40.7128,
  "lon": -74.0060,
  "country": "US"
}

Get Multiple Locations at Once
node src/index.js "Los Angeles, CA" "10001" "Chicago, IL"

Running Tests

This project includes integration tests using Jest.

Run all tests
npm test

Expected Output:
PASS  tests/getLocationByCity.test.js
PASS  tests/getLocationByZipCode.test.js

Error Handling

Scenario
Expected Behavior

Invalid city/state
Throws "No location found"
Invalid ZIP code
Throws "Error while getting the location"
Hawaii or Alaska
Throws "Locations in Hawaii and Alaska are not in the scope"
Missing parameters
Throws "Please enter City and State" or "Please enter Zipcode"
Non-US location
Throws "No location found"

Dependencies

Node.js (v18+)
Axios (for API calls)
Dotenv (for environment variables)
Jest (for testing)

API Reference

OpenWeather Geocoding API Docs
https://openweathermap.org/api/geocoding-api


Author & Contact

Aierfan Aierken
