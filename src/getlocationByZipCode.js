const axios = require('axios');
const { API_KEY, BASE_URL } = require('./config');

async function getCoordinatesByZipCode(zipCode) {
     // verify if user input zipcode are empty return error message
    if (!zipCode) {
        throw new Error("Please enter Zipcode");
    }
    //define dynamic url
    const url = `${BASE_URL}/zip?zip=${zipCode},US&appid=${API_KEY}`;

    try {
        //send request and store the response
        const response = await axios.get(url);
        const { name, lat, lon, country } = response.data;
        
        //Succesful API return 
        return { name, lat, lon, country };
    } catch (error) {
        throw new Error(`Error while getting the location: ${error.message}`);
    }
}

module.exports = { getCoordinatesByZipCode };