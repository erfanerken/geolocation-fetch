const { getCoordinatesByCity } = require('./getlocationByCity');
const { getCoordinatesByZipCode } = require('./getlocationByZipCode');

(async () => {

  const args = process.argv.slice(2);

  for (const input of args) {
      try {
          let result;

          if (/^\d{5}$/.test(input)) {
              // Zip code case
              console.log(`Calling getCoordinatesByZipCode for: "${input}"...`);
              result = await getCoordinatesByZipCode(input);
          } else {
              // City and State case
              const [city, state] = input.split(",").map(str => str.trim());
              console.log(`Calling getCoordinatesByCity for: "${city}, ${state}"...`);
              result = await getCoordinatesByCity(city, state);
          }

          console.log("API Result:", result);
      } catch (error) {
          console.error("Error:", error.message);
      }
  }
})();