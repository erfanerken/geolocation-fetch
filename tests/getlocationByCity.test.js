const { getCoordinatesByCity } = require('../src/getlocationByCity');

describe("Integration Tests for getCoordinatesByCity", () => {

    test("Verify test should return valid coordinates for a valid city and state", async () => {
        const result = await getCoordinatesByCity("Philadelphia", "PA");
        expect(result).toHaveProperty("name", "Philadelphia");
        expect(result).toHaveProperty("lat");
        expect(result).toHaveProperty("lon");
        expect(result).toHaveProperty("state", "Pennsylvania");
        expect(result).toHaveProperty("country", "US");
    });

    test("Verify test should throw an error for an invalid city and state combination", async () => {
      await expect(getCoordinatesByCity("Tokyo", "Japan")).rejects.toThrow("There is no location found for city Tokyo in state Japan");
    });

    test("Verify test should throw an error for a correct city but an incorrect state", async () => {
      await expect(getCoordinatesByCity("New York", "CA")).rejects.toThrow("There is no location found for city New York in state CA");
    });

    test("Verify test should throw an error for a correct state but a non-existent city", async () => {
    await expect(getCoordinatesByCity("FakeCity", "PA")).rejects.toThrow("There is no location found for city FakeCity in state PA");
    });

    test("Verify test should throw an error for missing parameters", async () => {
        await expect(getCoordinatesByCity()).rejects.toThrow("Please enter City and State.");
    });

    test("Verify test should throw an error for Hawaii or Alaska", async () => {
        await expect(getCoordinatesByCity("Honolulu", "HI")).rejects.toThrow("Locations in Hawaii and Alaska are not in the scope");
        await expect(getCoordinatesByCity("Anchorage", "AK")).rejects.toThrow("Locations in Hawaii and Alaska are not in the scope");
    });

    test("Verify test should return different results for duplicated city names (Philadelphia, PA vs Philadelphia, OH)", async () => {
      const resultPA = await getCoordinatesByCity("Philadelphia", "PA");
      const resultOH = await getCoordinatesByCity("Philadelphia", "OH");

      expect(resultPA).toHaveProperty("name", "Philadelphia");
      expect(resultPA).toHaveProperty("state", "Pennsylvania");
      expect(resultPA).not.toEqual(resultOH); 
  });

  test("Verify test should return correct coordinates for a city with spaces", async () => {
    const result = await getCoordinatesByCity("San Francisco", "CA");
    expect(result).toHaveProperty("name", "San Francisco");
    expect(result).toHaveProperty("state", "California");
});

test("Verify api should be case-insensitive", async () => {
  const resultLowerCase = await getCoordinatesByCity("los angeles", "ca");
  const resultUpperCase = await getCoordinatesByCity("LOS ANGELES", "CA");
  expect(resultLowerCase).toEqual(resultUpperCase);
});

test("Verify test should throw an error for a non-US city", async () => {
  await expect(getCoordinatesByCity("Paris", "FR")).rejects.toThrow("There is no location found for city Paris in state FR");
});

test("Verify test should return correct coordinates for multiple city and state inputs", async () => {
  const results = await Promise.all([
      getCoordinatesByCity("New York", "NY"),
      getCoordinatesByCity("Philadelphia", "PA"),
      getCoordinatesByCity("Chicago", "IL")
  ]);

  expect(results).toHaveLength(3);

  expect(results[0]).toHaveProperty("name", "New York");
  expect(results[0]).toHaveProperty("state", "New York");

  expect(results[1]).toHaveProperty("name", "Philadelphia");
  expect(results[1]).toHaveProperty("state", "Pennsylvania");

  expect(results[2]).toHaveProperty("name", "Chicago");
  expect(results[2]).toHaveProperty("state", "Illinois");
});

test("Verify test should return partial results if some city/state inputs are invalid", async () => {
  const results = await Promise.allSettled([
      getCoordinatesByCity("New York", "NY"),  
      getCoordinatesByCity("random City", "XX"), 
      getCoordinatesByCity("Los Angeles", "CA") 
  ]);

  expect(results).toHaveLength(3);

  expect(results[0].status).toBe("fulfilled");
  expect(results[0].value).toHaveProperty("name", "New York");

  expect(results[1].status).toBe("rejected");
  expect(results[1].reason.message).toContain("There is no location found for city random City in state XX");

  expect(results[2].status).toBe("fulfilled");
  expect(results[2].value).toHaveProperty("name", "Los Angeles");
});

test("Verify Test should fail for Hawaii/Alaska but succeed for other valid inputs", async () => {
  const results = await Promise.allSettled([
      getCoordinatesByCity("New York", "NY"), 
      getCoordinatesByCity("Honolulu", "HI"), 
      getCoordinatesByCity("Los Angeles", "CA") 
  ]);

  expect(results).toHaveLength(3);

  expect(results[0].status).toBe("fulfilled");

  expect(results[1].status).toBe("rejected");
  expect(results[1].reason.message).toContain("Locations in Hawaii and Alaska are not in the scope");

  expect(results[2].status).toBe("fulfilled");
});

});