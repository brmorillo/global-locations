# Countries

The `Countries` class provides static methods to query the bundled location dataset — countries, their states/provinces, and cities. It is never instantiated; call every method statically. The `GlobalLocations` facade re-exports it (`GlobalLocations.Countries === Countries`).

## Basic Usage

```javascript
import { GlobalLocations, Countries } from '@brmorillo/global-locations';

// via the facade
const countries = GlobalLocations.Countries.getAllCountries();

// or the class directly
const brazil = Countries.getCountryBy({
  property: 'id',
  value: 'BR',
  selectStates: true,
});

const spStates = Countries.getStatesByCountryId('BR');
const spCities = Countries.getCitiesByStateId({ countryId: 'BR', stateId: '35' });
```

> **Conventions:** lookups return `undefined` when nothing matches (they never throw); list methods return `[]` for an empty or unknown scope. The dataset is never mutated — `getCountryBy({ selectStates: true })` returns a deep clone.

## Data shapes

```ts
interface City    { id: number; stateId: number; name: string; extra?: object }
interface State   { id: number; name: string; acronym: string; cities: City[] }
interface Country {
  id: string; name: string; acronym: string; capital: string;
  coin: string; coinCode: string; regionGroup: string;
  economicGroups: string[]; continent: string; ddi: string;
  states: State[] | undefined;
}
```

---

## Country methods

### findCountryByProperty(property, value)

Finds the first country whose `property` strictly equals `value`. Returns `undefined` if `property` or `value` is missing, or no country matches. The returned country includes its `states`.

```javascript
Countries.findCountryByProperty('id', 'BR');     // -> Country (Brasil)
Countries.findCountryByProperty('name', 'Brasil'); // -> Country (Brasil)
Countries.findCountryByProperty('id', 'XX');     // -> undefined
```

### getAllCountriesAndData()

Returns **all** countries with their complete data, including `states` (and each state's `cities`).

```javascript
const all = Countries.getAllCountriesAndData();
all[0].states; // State[]
```

### getAllCountries()

Returns all countries **without** state data — each country has `states: undefined`. Useful for lightweight country lists.

```javascript
const list = Countries.getAllCountries();
list[0].states; // undefined
```

### getCountryBy({ property, value, selectStates })

Finds a single country by `property`/`value`, choosing whether to include its states.

- `selectStates: true` → returns a **deep clone** of the country, including `states`.
- `selectStates: false` (default) → returns the country with `states: undefined`.

Returns `undefined` when `value` is `undefined`/`null` or no country matches.

```javascript
Countries.getCountryBy({ property: 'id', value: 'BR', selectStates: true });
// -> Country with states

Countries.getCountryBy({ property: 'id', value: 'BR', selectStates: false });
// -> Country with states === undefined

Countries.getCountryBy({ property: 'id', value: 'XX', selectStates: true });
// -> undefined
```

### getCountriesByContinent(continent, includeStates?)

Returns all countries on the given continent. The match is **case-insensitive**. `includeStates` (default `false`) controls whether each result keeps its `states`.

```javascript
Countries.getCountriesByContinent('South America');        // states stripped
Countries.getCountriesByContinent('south america', true);  // states included
Countries.getCountriesByContinent('Atlantis');             // []
```

### getCountriesByEconomicGroup(economicGroup, includeStates?)

Returns all countries that belong to the given economic group (matched against each country's `economicGroups`, **case-insensitive**). `includeStates` (default `false`) controls whether results keep their `states`.

```javascript
Countries.getCountriesByEconomicGroup('Mercosul');       // -> [Brasil, Argentina, ...]
Countries.getCountriesByEconomicGroup('G7', true);       // with states
Countries.getCountriesByEconomicGroup('Nonexistent');    // []
```

---

## State methods

### getAllStates()

Returns every state from every country as a single flat array.

```javascript
const states = Countries.getAllStates(); // State[]
```

### getStatesByCountryId(countryId)

Returns the states of one country. Returns `undefined` if the country does not exist, and `[]` for a country with no states.

```javascript
Countries.getStatesByCountryId('BR'); // State[]
Countries.getStatesByCountryId('XX'); // undefined
```

### getStateByParams({ countryId, params })

Finds a single state inside a country by an arbitrary state property. `params` is `{ property, value }` where `property` is a key of `State`. Returns `undefined` if the country or state is not found.

```javascript
Countries.getStateByParams({
  countryId: 'BR',
  params: { property: 'acronym', value: 'SP' },
}); // -> State (São Paulo)

Countries.getStateByParams({
  countryId: 'BR',
  params: { property: 'name', value: 'Nowhere' },
}); // -> undefined
```

### isStateInCountry({ countryId, stateId })

Returns `true` when the country contains a state whose `id` matches `stateId` (compared numerically), otherwise `false`. Returns `false` for an unknown country or a country without states.

```javascript
Countries.isStateInCountry({ countryId: 'BR', stateId: '35' }); // true
Countries.isStateInCountry({ countryId: 'BR', stateId: '999' }); // false
Countries.isStateInCountry({ countryId: 'XX', stateId: '35' }); // false
```

---

## City methods

### getAllCities({ countryId })

Returns the **names** of all cities in a country (flattened across its states). Returns `[]` for an unknown country or a country without states.

```javascript
Countries.getAllCities({ countryId: 'BR' }); // -> ['São Paulo', 'Campinas', ...]
Countries.getAllCities({ countryId: 'XX' }); // -> []
```

### getCitiesByStateId({ countryId, stateId })

Returns the **names** of all cities in a specific state. Returns `[]` for an unknown country/state.

```javascript
Countries.getCitiesByStateId({ countryId: 'BR', stateId: '35' });
// -> ['São Paulo', 'Campinas', ...]
```

### getCitiesByParams({ countryId, stateId, params })

Finds a single city name inside a state by an arbitrary city property. `params` is `{ property, value }` where `property` is a key of `City`. Returns the city **name** (`string`) or `undefined` if the country, state, or city is not found.

```javascript
Countries.getCitiesByParams({
  countryId: 'BR',
  stateId: '35',
  params: { property: 'name', value: 'Campinas' },
}); // -> 'Campinas'

Countries.getCitiesByParams({
  countryId: 'BR',
  stateId: '35',
  params: { property: 'id', value: 3550308 },
}); // -> 'São Paulo'
```

### getCityById(cityId)

Finds a city by its numeric `id` across **all** countries and states. Returns the full `City` object, or `undefined` if not found.

```javascript
Countries.getCityById(3550308); // -> City { id: 3550308, name: 'São Paulo', stateId: 35 }
Countries.getCityById(0);       // -> undefined
```

### searchCitiesByName(name, caseSensitive?)

Searches all cities whose name **contains** `name` (partial match). Case-insensitive by default; pass `caseSensitive: true` for an exact-case match. Returns an array of matches, each carrying the full `city`, `state`, and `country`.

```javascript
Countries.searchCitiesByName('paulo');
// -> [{ city, state, country }, ...]  (case-insensitive)

Countries.searchCitiesByName('Paulo', true);
// -> only exact-case matches

Countries.searchCitiesByName('Nowhere');
// -> []
```

---

## Notes

- All methods are read-only; the bundled dataset is never mutated.
- `Country.states` is typed `State[] | undefined`. The shipped data always provides an array, but the service defends against `null`/`undefined` internally.
- Types are exported from the package root: `import type { Country, State, City, LocationData } from '@brmorillo/global-locations'`.
