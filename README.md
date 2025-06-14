# @brmorillo/global-locations

Biblioteca para acesso a dados de localização global como países, estados e cidades.

## Instalação

```bash
npm install @brmorillo/global-locations
```

## Uso

```typescript
import { GlobalLocations } from '@brmorillo/global-locations';

// Obter todos os países
const countries = GlobalLocations.Countries.getAllCountries();

// Obter um país específico pelo ID
const brazil = GlobalLocations.Countries.getCountryBy({
  property: 'id',
  value: 'BR',
  selectStates: true
});

// Obter estados de um país
const brazilStates = GlobalLocations.Countries.getStatesByCountryId('BR');

// Obter cidades de um estado
const saoPauloCities = GlobalLocations.Countries.getCitiesByStateId({
  countryId: 'BR',
  stateId: '35'
});
```

## API

### Countries

- `getAllCountriesAndData()`: Retorna todos os países com dados completos
- `getAllCountries()`: Retorna todos os países sem os dados de estados
- `getCountryBy({ property, value, selectStates })`: Retorna um país específico
- `getAllStates()`: Retorna todos os estados de todos os países
- `getStatesByCountryId(countryId)`: Retorna estados de um país específico
- `getStateByParams({ countryId, params })`: Busca um estado específico
- `isStateInCountry({ countryId, stateId })`: Verifica se um estado pertence a um país
- `getAllCities({ countryId })`: Retorna todas as cidades de um país
- `getCitiesByStateId({ countryId, stateId })`: Retorna cidades de um estado específico
- `getCitiesByParams({ countryId, stateId, params })`: Busca uma cidade específica

## Licença

MIT