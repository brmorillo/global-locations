const fs = require('fs');
const path = require('path');

// Ler os arquivos
const duplicatesFile = fs.readFileSync(
  path.join(__dirname, 'global-locations-duplicate-cities.json'),
  'utf-8'
);
const countriesFile = fs.readFileSync(
  path.join(__dirname, 'src/data/countries.json'),
  'utf-8'
);

const duplicatesData = JSON.parse(duplicatesFile);
const countriesData = JSON.parse(countriesFile);

// Criar um Set com todos os IDs duplicados que devem ser removidos
// Mantemos o primeiro ID e removemos os demais
const idsToRemove = new Set();

duplicatesData.duplicates.forEach(duplicate => {
  // Remove todos os IDs exceto o primeiro
  const [keepId, ...removeIds] = duplicate.duplicateIds;
  removeIds.forEach(id => idsToRemove.add(id));
});

console.log(`Total de IDs duplicados a remover: ${idsToRemove.size}`);

// Percorrer os países e estados para remover as cidades duplicadas
let removedCount = 0;

countriesData.countries.forEach(country => {
  if (country.states) {
    country.states.forEach(state => {
      if (state.cities) {
        const originalLength = state.cities.length;
        state.cities = state.cities.filter(city => {
          if (idsToRemove.has(city.id)) {
            console.log(`Removendo: ${city.name} (${city.id}) de ${state.name}, ${country.name}`);
            removedCount++;
            return false;
          }
          return true;
        });
        
        if (state.cities.length !== originalLength) {
          console.log(`  Estado ${state.name}: ${originalLength} -> ${state.cities.length} cidades`);
        }
      }
    });
  }
});

console.log(`\nTotal de cidades removidas: ${removedCount}`);
console.log(`IDs esperados para remoção: ${idsToRemove.size}`);

// Criar backup do arquivo original
const backupPath = path.join(__dirname, 'src/data/countries.backup.json');
fs.copyFileSync(
  path.join(__dirname, 'src/data/countries.json'),
  backupPath
);
console.log(`\nBackup criado em: ${backupPath}`);

// Salvar o arquivo atualizado
fs.writeFileSync(
  path.join(__dirname, 'src/data/countries.json'),
  JSON.stringify(countriesData, null, 2),
  'utf-8'
);

console.log('Arquivo countries.json atualizado com sucesso!');
console.log('\nResumo:');
console.log(`- Duplicatas processadas: ${duplicatesData.duplicates.length}`);
console.log(`- Cidades removidas: ${removedCount}`);
console.log(`- Backup salvo: countries.backup.json`);
