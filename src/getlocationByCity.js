const axios = require('axios');
const { API_KEY, BASE_URL } = require('./config');

async function getCoordinatesByCity(city, state) {
    // verify if user input state and city are empty return error message
    if (!city || !state) {
        throw new Error("Please enter City and State.")
    }
    //define dynamic url
    const url = `${BASE_URL}/direct?q=${city},${state},US&limit=1&appid=${API_KEY}`;

    try {
        //send request and store the response
        const response = await axios.get(url);
        const locations = response.data;
         
        //if response is empty
        if (!locations.length) {
            // verify return error if the city and state cant be found
            throw new Error(`There is no location found for city ${city} in state ${state}`);
        }

        const { name, lat, lon, state: stateName, country } = locations[0];

        // verify if user input is Alaska or Hawaii return error message
        if (stateName === "Hawaii" || stateName === "Alaska") {
            
            throw new Error("Locations in Hawaii and Alaska are not in the scope");
        }
        //Succesful API return 
        return { name, lat, lon, state: stateName, country };
    } catch (error) {
        throw new Error(`Error while getting the location: ${error.message}`);
    }
}

module.exports = { getCoordinatesByCity };
