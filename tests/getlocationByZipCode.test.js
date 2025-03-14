const { getCoordinatesByZipCode } = require('../src/getlocationByZipCode');

describe("Integration Tests for getCoordinatesByZipCode", () => {
    jest.setTimeout(10000); // Ensure we allow enough time for API calls

    test("Verify test should return valid coordinates for a valid US zip code", async () => {
        const result = await getCoordinatesByZipCode("19104");
        expect(result).toHaveProperty("name", "Philadelphia");
        expect(result).toHaveProperty("lat");
        expect(result).toHaveProperty("lon");
        expect(result).toHaveProperty("country", "US");
    });

    test("Verify test should throw an error for an invalid zip code", async () => {
        await expect(getCoordinatesByZipCode("0991")).rejects.toThrow("Error while getting the location");
    });

    test("Verify Test should throw an error for missing parameters", async () => {
        await expect(getCoordinatesByZipCode()).rejects.toThrow("Please enter Zipcode");
    });

    test("Verify test should return different results for zip codes in different states", async () => {
      const resultPA = await getCoordinatesByZipCode("19102"); 
      const resultOH = await getCoordinatesByZipCode("43081"); 

      expect(resultPA).toHaveProperty("country", "US");
      expect(resultOH).toHaveProperty("country", "US");
      expect(resultPA).not.toEqual(resultOH); 
  });

  test("Verify test should not be be able to handle 5-digit and 9-digit zip codes", async () => {
    await expect(getCoordinatesByZipCode("10001-2345")).rejects.toThrow("Error while getting the location");
    
});

test("verify test should throw an error for a zip code with letters", async () => {
  await expect(getCoordinatesByZipCode("asdasd")).rejects.toThrow("Error while getting the location");
});

test("verify Test should throw an error for a zip code with special characters", async () => {
  await expect(getCoordinatesByZipCode("1910$")).rejects.toThrow("Error while getting the location");
});

test("verify test should throw an error for a zip code with too many numbers", async () => {
  await expect(getCoordinatesByZipCode("111222333444")).rejects.toThrow("Error while getting the location");
});

test("Verify test Should correctly process multiple zip codes sequentially", async () => {
  const zipCodes = ["10001", "90001", "60601"];
  const results = await Promise.all(zipCodes.map(zip => getCoordinatesByZipCode(zip)));

  expect(results).toHaveLength(3); 
  expect(results[0]).toHaveProperty("name", "New York");
  expect(results[1]).toHaveProperty("name", "Los Angeles County");
  expect(results[2]).toHaveProperty("name", "Chicago");
});

test("Verify test should fail when all zip code inputs are invalid", async () => {
  const results = await Promise.allSettled([
      getCoordinatesByZipCode("00000"), 
      getCoordinatesByZipCode("99999"), 
      getCoordinatesByZipCode("ABCDE")  
  ]);

  expect(results).toHaveLength(3);

  results.forEach(result => {
      expect(result.status).toBe("rejected");
      expect(result.reason.message).toContain("Error while getting the location");
  });
});

test("Verify test should return results for ZIP codes from different locations in the US", async () => {
  const results = await Promise.all([
      getCoordinatesByZipCode("00901"), 
      getCoordinatesByZipCode("96701") 
  ]);

  expect(results).toHaveLength(2);

  expect(results[0]).toHaveProperty("name", "Río Piedras");
  expect(results[0]).toHaveProperty("country", "US");
s
  expect(results[1]).toHaveProperty("name", "Waipahu");
  expect(results[1]).toHaveProperty("country", "US");
});

test("Verify test Should correctly process ZIP codes from different US locations sequentially", async () => {
  const zipCodes = ["00901", "96701"]; 
  const results = await Promise.all(zipCodes.map(zip => getCoordinatesByZipCode(zip)));

  expect(results).toHaveLength(2); 
  expect(results[0]).toHaveProperty("name", "Río Piedras");
  expect(results[0]).toHaveProperty("country", "US");
  expect(results[1]).toHaveProperty("name", "Waipahu");
  expect(results[1]).toHaveProperty("country", "US");
});

});