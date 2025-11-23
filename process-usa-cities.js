const fs = require('fs');
const path = require('path');

// Ler o arquivo de cidades dos EUA
const citiesFilePath = path.join(__dirname, 'eua-cities.md');
const citiesData = fs.readFileSync(citiesFilePath, 'utf8');

// Separar por linhas
const lines = citiesData.trim().split('\n');
const headers = lines[0].split('|');

console.log('Cabeçalhos encontrados:', headers);
console.log(`Total de linhas: ${lines.length - 1}`);

// Processar as cidades
const citiesByState = {};
let cityIdCounter = 1;

for (let i = 1; i < lines.length; i++) {
  const values = lines[i].split('|');
  
  const stateAcronym = values[0];
  const geoid = values[1];
  const name = values[4];
  const lsad = values[5]; // Legal/Statistical Area Description
  const funcstat = values[6]; // Functional Status
  const aland = values[7]; // Area Land
  const awater = values[8]; // Area Water
  const alandSqmi = values[9]; // Area Land Square Miles
  const awaterSqmi = values[10]; // Area Water Square Miles
  const latitude = values[11];
  const longitude = values[12];
  
  // Inicializar array do estado se não existir
  if (!citiesByState[stateAcronym]) {
    citiesByState[stateAcronym] = [];
  }
  
  // Criar objeto da cidade
  const city = {
    id: `+001${cityIdCounter}`,
    stateId: null, // Será preenchido depois
    name: name.replace(/ (city|town|CDP|village)$/, ''), // Remove sufixos
    extra: {
      fullName: name,
      geoid: geoid,
      type: name.match(/(city|town|CDP|village)$/)?.[1] || 'city',
      latitude: parseFloat(latitude),
      longitude: parseFloat(longitude),
      areaLandSqMi: parseFloat(alandSqmi),
      areaWaterSqMi: parseFloat(awaterSqmi)
    }
  };
  
  citiesByState[stateAcronym].push(city);
  cityIdCounter++;
}

// Estatísticas
console.log('\n=== Estatísticas por Estado ===');
const sortedStates = Object.keys(citiesByState).sort();
let totalCities = 0;

sortedStates.forEach(state => {
  const count = citiesByState[state].length;
  totalCities += count;
  console.log(`${state}: ${count} cidades`);
});

console.log(`\nTotal de cidades: ${totalCities}`);

// Salvar o resultado em JSON
const outputPath = path.join(__dirname, 'eua-cities-processed.json');
fs.writeFileSync(outputPath, JSON.stringify(citiesByState, null, 2), 'utf8');

console.log(`\n✅ Arquivo processado salvo em: ${outputPath}`);
