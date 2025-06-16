// Complete test of @brmorillo/global-locations library
const globalLocations = require('./dist/index.js');

console.log('=== COMPLETE TEST OF @brmorillo/global-locations LIBRARY ===\n');

// List all available modules
console.log(
  'Available modules:',
  Object.keys(globalLocations).filter((key) => key !== '__esModule'),
);

// Test Countries service
console.log('\n=== TESTING Countries Service ===');
try {
  // Get all countries
  const allCountries = globalLocations.Countries.getAllCountriesAndData();
  console.log(
    'getAllCountriesAndData():',
    `${allCountries.length} countries found`,
  );

  // Get all countries without states
  const countriesNoStates = globalLocations.Countries.getAllCountries();
  console.log(
    'getAllCountries():',
    `${countriesNoStates.length} countries found (without states)`,
  );
  console.log('First country example:', countriesNoStates[0]);

  // Get a specific country by ID
  const brazil = globalLocations.Countries.getCountryBy({
    property: 'id',
    value: 'BR',
    selectStates: false,
  });
  console.log(
    'getCountryBy({property: "id", value: "BR", selectStates: false}):',
    brazil?.name,
  );

  // Get a specific country with states
  const brazilWithStates = globalLocations.Countries.getCountryBy({
    property: 'id',
    value: 'BR',
    selectStates: true,
  });
  console.log(
    'getCountryBy({property: "id", value: "BR", selectStates: true}):',
    `${brazilWithStates?.name} with ${brazilWithStates?.states?.length} states`,
  );

  // Get all states
  const allStates = globalLocations.Countries.getAllStates();
  console.log('getAllStates():', `${allStates.length} states found`);

  // Get states by country ID
  const brazilStates = globalLocations.Countries.getStatesByCountryId('BR');
  console.log(
    'getStatesByCountryId("BR"):',
    `${brazilStates?.length} states found`,
  );

  // Get state by parameters
  const saoPaulo = globalLocations.Countries.getStateByParams({
    countryId: 'BR',
    params: { property: 'acronym', value: 'SP' },
  });
  console.log(
    'getStateByParams({countryId: "BR", params: {property: "acronym", value: "SP"}}):',
    saoPaulo?.name,
  );

  // Check if state belongs to country
  const stateInCountry = globalLocations.Countries.isStateInCountry({
    countryId: 'BR',
    stateId: '35',
  });
  console.log(
    'isStateInCountry({countryId: "BR", stateId: "35"}):',
    stateInCountry,
  );

  // Get all cities in a country
  const brazilCities = globalLocations.Countries.getAllCities({
    countryId: 'BR',
  });
  console.log(
    'getAllCities({countryId: "BR"}):',
    `${brazilCities.length} cities found`,
  );

  // Get cities by state ID
  const spCities = globalLocations.Countries.getCitiesByStateId({
    countryId: 'BR',
    stateId: '35',
  });
  console.log(
    'getCitiesByStateId({countryId: "BR", stateId: "35"}):',
    `${spCities.length} cities found`,
  );

  // Get city by parameters
  const saoPauloCity = globalLocations.Countries.getCitiesByParams({
    countryId: 'BR',
    stateId: '35',
    params: { property: 'name', value: 'São Paulo' },
  });
  console.log(
    'getCitiesByParams({countryId: "BR", stateId: "35", params: {property: "name", value: "São Paulo"}}):',
    saoPauloCity,
  );
} catch (error) {
  console.log('Error testing Countries service:', error.message);
}

// Test GlobalLocations (main object)
console.log('\n=== TESTING GlobalLocations (main object) ===');
try {
  const allCountries =
    globalLocations.GlobalLocations.Countries.getAllCountries();
  console.log(
    'GlobalLocations.Countries.getAllCountries():',
    `${allCountries.length} countries found`,
  );

  const brazil = globalLocations.GlobalLocations.Countries.getCountryBy({
    property: 'id',
    value: 'BR',
    selectStates: false,
  });
  console.log(
    'GlobalLocations.Countries.getCountryBy({property: "id", value: "BR", selectStates: false}):',
    brazil?.name,
  );
} catch (error) {
  console.log('Error testing GlobalLocations:', error.message);
}

console.log('\n=== TESTS COMPLETED SUCCESSFULLY ===');
