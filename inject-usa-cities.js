const fs = require('fs');
const path = require('path');

// Ler o countries.json
const countriesPath = path.join(__dirname, 'src', 'data', 'countries.json');
const countriesData = JSON.parse(fs.readFileSync(countriesPath, 'utf8'));

// Ler as cidades processadas
const citiesPath = path.join(__dirname, 'eua-cities-processed.json');
const citiesData = JSON.parse(fs.readFileSync(citiesPath, 'utf8'));

// Encontrar os EUA
const usa = countriesData.countries.find(c => c.id === 'US');

if (!usa) {
  console.error('EUA não encontrado!');
  process.exit(1);
}

console.log(`EUA encontrado! Estados: ${usa.states.length}`);

// Mapear siglas para IDs dos estados
const stateMapping = {};
usa.states.forEach(state => {
  stateMapping[state.acronym] = state.id;
});

console.log('\n=== Injetando cidades nos estados ===\n');

let totalCitiesAdded = 0;
let statesUpdated = 0;

// Para cada estado dos EUA
usa.states.forEach(state => {
  const acronym = state.acronym;
  const cities = citiesData[acronym] || [];
  
  if (cities.length > 0) {
    // Atualizar o stateId de cada cidade
    cities.forEach(city => {
      city.stateId = state.id;
    });
    
    // Substituir o array de cidades
    state.cities = cities;
    
    console.log(`${acronym.padEnd(2, ' ')} - ${state.name.padEnd(20, ' ')}: ${cities.length.toString().padStart(4, ' ')} cidades`);
    
    totalCitiesAdded += cities.length;
    statesUpdated++;
  } else {
    console.log(`${acronym.padEnd(2, ' ')} - ${state.name.padEnd(20, ' ')}: sem dados`);
  }
});

console.log('\n' + '='.repeat(60));
console.log(`✅ Total: ${totalCitiesAdded} cidades adicionadas em ${statesUpdated} estados`);

// Salvar o arquivo atualizado
console.log('\nSalvando countries.json...');
fs.writeFileSync(countriesPath, JSON.stringify(countriesData, null, 2), 'utf8');
console.log('✅ Arquivo salvo com sucesso!');
