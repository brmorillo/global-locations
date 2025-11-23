const fs = require('fs');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();

// Caminhos
const jsonPath = path.join(__dirname, 'src', 'data', 'countries.json');
const dbPath = path.join(__dirname, 'src', 'data', 'countries.db');

console.log('🔄 Iniciando conversão JSON para SQLite...\n');

// Remover banco existente se houver
if (fs.existsSync(dbPath)) {
  fs.unlinkSync(dbPath);
  console.log('🗑️  Banco de dados existente removido');
}

// Ler o JSON
console.log('📖 Lendo countries.json...');
const data = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

// Criar conexão com o banco
const db = new sqlite3.Database(dbPath);

console.log('🏗️  Criando estrutura do banco de dados...\n');

db.serialize(() => {
  // Criar tabela de países
  db.run(`
    CREATE TABLE countries (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      acronym TEXT NOT NULL,
      capital TEXT,
      coin TEXT,
      coinCode TEXT,
      regionGroup TEXT,
      economicGroups TEXT,
      continent TEXT,
      ddi TEXT
    )
  `);

  // Criar tabela de estados
  db.run(`
    CREATE TABLE states (
      id INTEGER PRIMARY KEY,
      countryId TEXT NOT NULL,
      name TEXT NOT NULL,
      acronym TEXT NOT NULL,
      FOREIGN KEY (countryId) REFERENCES countries(id)
    )
  `);

  // Criar tabela de cidades
  db.run(`
    CREATE TABLE cities (
      id TEXT PRIMARY KEY,
      stateId INTEGER NOT NULL,
      name TEXT NOT NULL,
      extra TEXT,
      FOREIGN KEY (stateId) REFERENCES states(id)
    )
  `);

  // Criar índices para performance
  db.run('CREATE INDEX idx_states_country ON states(countryId)');
  db.run('CREATE INDEX idx_cities_state ON cities(stateId)');
  db.run('CREATE INDEX idx_cities_name ON cities(name)');

  console.log('✅ Estrutura criada com sucesso\n');

  // Preparar statements
  const insertCountry = db.prepare(`
    INSERT INTO countries (id, name, acronym, capital, coin, coinCode, regionGroup, economicGroups, continent, ddi)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  const insertState = db.prepare(`
    INSERT INTO states (id, countryId, name, acronym)
    VALUES (?, ?, ?, ?)
  `);

  const insertCity = db.prepare(`
    INSERT INTO cities (id, stateId, name, extra)
    VALUES (?, ?, ?, ?)
  `);

  let countriesCount = 0;
  let statesCount = 0;
  let citiesCount = 0;

  console.log('📝 Inserindo dados...\n');

  // Inserir países
  data.countries.forEach(country => {
    insertCountry.run(
      country.id,
      country.name,
      country.acronym,
      country.capital,
      country.coin,
      country.coinCode,
      country.regionGroup,
      JSON.stringify(country.economicGroups),
      country.continent,
      country.ddi
    );
    countriesCount++;

    console.log(`🌍 ${country.name} (${country.acronym})`);

    // Inserir estados
    if (country.states && Array.isArray(country.states)) {
      country.states.forEach(state => {
        insertState.run(
          state.id,
          country.id,
          state.name,
          state.acronym
        );
        statesCount++;

        // Inserir cidades
        if (state.cities && Array.isArray(state.cities)) {
          state.cities.forEach(city => {
            insertCity.run(
              city.id,
              state.id,
              city.name,
              city.extra ? JSON.stringify(city.extra) : null
            );
            citiesCount++;
          });
        }
      });
    }
  });

  insertCountry.finalize();
  insertState.finalize();
  insertCity.finalize();

  console.log('\n' + '='.repeat(60));
  console.log('📊 Estatísticas:');
  console.log(`   Países: ${countriesCount}`);
  console.log(`   Estados: ${statesCount}`);
  console.log(`   Cidades: ${citiesCount}`);
  console.log('='.repeat(60));
});

db.close((err) => {
  if (err) {
    console.error('❌ Erro ao fechar banco:', err);
    process.exit(1);
  }
  console.log('\n✅ Conversão concluída com sucesso!');
  console.log(`📁 Banco criado em: ${dbPath}`);
  
  // Mostrar tamanho do arquivo
  const stats = fs.statSync(dbPath);
  const fileSizeInMB = (stats.size / (1024 * 1024)).toFixed(2);
  console.log(`📦 Tamanho do banco: ${fileSizeInMB} MB`);
});
