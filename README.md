# @brmorillo/global-locations

## Project Description

**@brmorillo/global-locations** is a TypeScript library designed to simplify access and manipulation of hierarchical location data, including countries, states, and cities. It offers powerful methods for retrieving, filtering, and managing location-based information.

---

## Installation and Usage

### Install

To add the library to your project, use:

```bash
npm install @brmorillo/global-locations
```

or if you use Yarn:

```bash
yarn add @brmorillo/global-locations
```

or with pnpm:

```bash
pnpm add @brmorillo/global-locations
```

### Usage

#### Import the `Countries` class to access location utilities:

```typescript
import { Countries } from '@brmorillo/global-locations';

// Example usage
const countries = Countries.getAllCountriesAndData();
console.log(countries);

const states = Countries.getStatesByCountryId('BR');
console.log(states);

const cities = Countries.getCitiesByStateId({ countryId: 'BR', stateId: '35' });
console.log(cities);
```

---

## Project Features

### Country Utility Functions

1. **`getAllCountriesAndData`**: Retrieves all countries with their associated states and cities.

   ```typescript
   const countries = Countries.getAllCountriesAndData();
   console.log(countries);
   ```

2. **`getAllCountries`**: Retrieves all countries without the `states` property.

   ```typescript
   const countries = Countries.getAllCountries();
   console.log(countries);
   ```

3. **`getCountryBy`**: Finds a country by a specific property (e.g., `id`, `name`, etc.).
   ```typescript
   const country = Countries.getCountryBy({
     property: 'id',
     value: 'BR',
     selectStates: true,
   });
   console.log(country);
   ```

### State Utility Functions

1. **`getAllStates`**: Retrieves all states from all countries.

   ```typescript
   const states = Countries.getAllStates();
   console.log(states);
   ```

2. **`getStatesByCountryId`**: Retrieves all states for a specific country.

   ```typescript
   const states = Countries.getStatesByCountryId('BR');
   console.log(states);
   ```

3. **`getStateByParams`**: Finds a state by specific parameters (e.g., `id`, `name`, etc.).

   ```typescript
   const state = Countries.getStateByParams({
     countryId: 'BR',
     params: { property: 'name', value: 'São Paulo' },
   });
   console.log(state);
   ```

4. **`isStateInCountry`**: Checks if a state belongs to a specific country.
   ```typescript
   const isInCountry = Countries.isStateInCountry({
     countryId: 'BR',
     stateId: '35',
   });
   console.log(isInCountry);
   ```

### City Utility Functions

1. **`getAllCities`**: Retrieves all cities for a specific country.

   ```typescript
   const cities = Countries.getAllCities({ countryId: 'BR' });
   console.log(cities);
   ```

2. **`getCitiesByStateId`**: Retrieves all cities for a specific state within a country.

   ```typescript
   const cities = Countries.getCitiesByStateId({
     countryId: 'BR',
     stateId: '35',
   });
   console.log(cities);
   ```

3. **`getCitiesByParams`**: Finds a city by specific parameters (e.g., `id`, `name`).
   ```typescript
   const city = Countries.getCitiesByParams({
     countryId: 'BR',
     stateId: '35',
     params: { property: 'name', value: 'São Paulo' },
   });
   console.log(city);
   ```

---

## Contribution Guidelines

### How to Contribute

1. **No direct commits to the `main` branch:**
   All development must be done in separate branches.

2. **Branch naming:**
   Use descriptive names for your branches. Examples:

   - `feat/new-feature`
   - `fix/location-error`

3. **Pull Requests:**

   - Every pull request (PR) must be reviewed and approved before merging into `main`.
   - Ensure you follow the commit message standards.

4. **Commit Messages:**
   Follow the project's commit message conventions (based on Angular):
   - `feat: description of the new feature`
   - `fix: description of the bug fix`
   - `docs: documentation updates`

### How to Publish

If you want to contribute and publish updates to this library:

1. **Bump the version:**
   Use the following command to update the version according to [SemVer](https://semver.org/):

   ```bash
   npm version patch   # For small fixes
   npm version minor   # For new features
   npm version major   # For breaking changes
   ```

2. **Publish the package:**
   ```bash
   npm publish
   ```

Feel free to fork, contribute, and submit pull requests! Any contributions are welcome.

---

## 🫶 Support the Project

If you find **@brmorillo/global-locations** helpful and want to support its development, consider contributing! Your support is essential for the project to grow.

### 📌 How to Contribute

- **Pix**:
  Use the Pix key: **bruno@rmorillo.com**

- **Cryptocurrencies**:

  - **Dogecoin (DOGE):** `DLwW5LFfXV7wN7a7dVV6TX7kiomVnYABXM`
  - **Tether (USDT):** `0x2b1f5169e3719E0A25850a178db54d8D1C0c12E0`
  - **Bitcoin (BTC):** `bc1qk5cakfryrx8dw3w6uqudwkpm9apvd6h5mgl8kg`
  - **Ethereum (ETH):** `0x2b1f5169e3719E0A25850a178db54d8D1C0c12E0`

- **Other ways:**
  Feedback, code contributions, or simply sharing the project with others are extremely appreciated!

---

## License

This project is licensed under the MIT License. See the LICENSE file for details.
