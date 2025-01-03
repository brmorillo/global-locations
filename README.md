# Global States and Municipalities List

This repository provides a unified and structured JSON file containing global country, state, and municipality data. It serves as a public and open-source reference for developers, researchers, and anyone interested in geographical data.

---

## Installation

To use this package in your project, install it via npm:

```bash
npm install global-states-and-municipes
```

---

## JSON Structure

The JSON file is structured to support multiple countries, with the following format:

```json
{
  "countries": [
    {
      "id": "BR",
      "name": "Brasil",
      "acronym": "BR",
      "capital": "Brasília",
      "coin": "Real",
      "coinCode": "BRL",
      "regionGroup": "Americas",
      "economicGroups": ["Mercosul", "UNASUL"],
      "continent": "South America",
      "ddi": "55",
      "coi": "BRA",
      "fifa": "BRA",
      "iso-3": "BRA",
      "iso-2": "BR",
      "states": [
        {
          "id": 12,
          "name": "Acre",
          "acronym": "AC",
          "cities": [
            {
              "stateId": 12,
              "name": "Acrelândia",
              "code": 1200013
            },
            ...
          ]
        },
        ...
      ]
    },
    ...
  ]
}
```

### Main Fields:

- **countries**: An array of countries.
- **id**: The country code.
- **name**: Full name of the country.
- **acronym**: Abbreviation or acronym of the country.
- **capital**: Capital city.
- **coin**: Official currency.
- **coinCode**: ISO currency code.
- **regionGroup**: The larger geographical or economic region the country belongs to.
- **economicGroups**: Economic groups the country is a member of.
- **continent**: Continent.
- **ddi**: International dialing code.
- **states**: An object where each key is a state ID, containing details about states and their cities.

---

## Usage

After installing the package, you can import it into your project as follows:

### Example

```typescript
import countriesStatesCities, { countries } from 'global-states-and-municipes';

// Full dataset
console.log('Full JSON:', countriesStatesCities);

// List of countries
console.log('Countries:', countries);

// Access specific data
const brazil = countries.find((country) => country.id === 'BR');
console.log('Brazil:', brazil);
```

### Applications:

- Geographical data visualization.
- Address validation or autocomplete.
- Integration in services and APIs.
- Educational and research purposes.

---

## Sources

The data for Brazil in this repository has been compiled from trusted public sources, including:

1. [IBGE Data](https://www.ibge.gov.br/explica/codigos-dos-municipios.php)
2. [Leogermani - estados-e-municipios-ibge](https://github.com/leogermani/estados-e-municipios-ibge)
3. [Letanure - Gist](https://gist.github.com/letanure/3012978)
4. [Wikipedia - Listas de municípios do Brasil por população](https://pt.wikipedia.org/wiki/Lista_de_munic%C3%ADpios_do_Brasil_por_popula%C3%A7%C3%A3o)
5. [Wikipedia - Comparação entre códigos de países COI, FIFA, e ISO 3166](https://pt.wikipedia.org/wiki/Compara%C3%A7%C3%A3o_entre_c%C3%B3digos_de_pa%C3%ADses_COI,_FIFA,_e_ISO_3166)

We have cross-referenced and merged these sources to ensure accuracy and completeness.

---

## Contribution

Contributions to expand the dataset or improve its structure are welcome! Here's how you can contribute:

1. **Report Issues:** If you find any errors or missing data, please [open an issue](https://github.com/seu-usuario/global-states-and-municipes/issues).
2. **Submit Pull Requests:** Add new data or propose enhancements by submitting a pull request.
3. **Add Data for Other Countries:** Help us expand the dataset by contributing data for countries not yet included.

### Steps to Contribute:

1. Fork the repository.
2. Create a new branch for your changes:
   ```bash
   git checkout -b feature/new-data
   ```
3. Make your changes and commit:
   ```bash
   git commit -m "Add new country/state/city data"
   ```
4. Push your branch and submit a pull request:
   ```bash
   git push origin feature/new-data
   ```

---

## License

This project is licensed under the MIT License. Feel free to use and adapt the data, but kindly credit this repository and the original sources when applicable.

---

### Disclaimer

This dataset is for informational purposes only. While we strive for accuracy, we cannot guarantee the correctness of all details. Always cross-reference with official sources for critical applications.

---
