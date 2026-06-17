# Documentation

Per-module documentation for **[@brmorillo/global-locations](../README.md)**. Each module has its own folder with a complete `README.md` (overview, every public method, parameters, return values, examples, and the data shapes involved).

For architecture, design conventions and contributor guidance, see [CLAUDE.md](../CLAUDE.md).

> Conventions used throughout the library:
> - **One static service.** `Countries` is a static utility class — never instantiated. The `GlobalLocations` facade simply re-exports it (`GlobalLocations.Countries === Countries`).
> - **Single object argument** for multi-param methods, e.g. `Countries.getCountryBy({ property, value, selectStates })`; single-value lookups take a positional argument, e.g. `Countries.getStatesByCountryId(countryId)`.
> - **Non-mutating / read-only.** The service never mutates the bundled dataset; `getCountryBy({ selectStates: true })` returns a deep clone.
> - **`undefined` means "not found"** for lookups; list methods return `[]` for an empty or unknown scope. No method throws for a missing record.
> - **Case-insensitive by default** for name/group searches (`searchCitiesByName`, `getCountriesByContinent`, `getCountriesByEconomicGroup`).

## Modules

| Module | Class | Description |
| --- | --- | --- |
| [countries](./countries/README.md) | `Countries` | Look up countries, states and cities; search by name, continent or economic group |

## Data shapes

The dataset is a tree of `Country → State → City`:

| Interface | Fields |
| --- | --- |
| `Country` | `id` (ISO code), `name`, `acronym`, `capital`, `coin`, `coinCode`, `regionGroup`, `economicGroups: string[]`, `continent`, `ddi`, `states: State[] \| undefined` |
| `State` | `id` (number), `name`, `acronym`, `cities: City[]` |
| `City` | `id` (number), `stateId` (number), `name`, `extra?` |
| `LocationData` | `{ countries: Country[] }` |

All four interfaces are exported from the package root:

```ts
import type { Country, State, City, LocationData } from '@brmorillo/global-locations';
```
