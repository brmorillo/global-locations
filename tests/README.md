# Testes da Biblioteca Global Locations

Este diretório contém os testes para a biblioteca Global Locations, organizados por tipo de teste.

## Estrutura de Testes

Os testes estão organizados em três categorias principais:

```
tests/
├── unit/                  # Testes unitários
│   └── countries.service.spec.ts
├── integration/           # Testes de integração
│   └── countries.service.int-spec.ts
└── benchmark/             # Testes de performance/benchmark
    └── countries.service.bench.ts
```

### Convenções de Nomenclatura

- Testes unitários: `*.spec.ts`
- Testes de integração: `*.int-spec.ts`
- Testes de benchmark/performance: `*.bench.ts`

## Tipos de Testes

### Testes Unitários

Os testes unitários verificam o comportamento de cada método isoladamente, usando mocks para simular dependências. Eles são rápidos e focados em testar a lógica de negócio.

```bash
npm run test:unit
```

### Testes de Integração

Os testes de integração verificam a interação entre componentes reais, sem mocks. Eles usam os dados reais do JSON para garantir que a biblioteca funciona corretamente com dados reais.

```bash
npm run test:integration
```

### Testes de Benchmark/Performance

Os testes de benchmark medem o desempenho dos métodos principais da biblioteca, garantindo que eles tenham performance aceitável mesmo com grandes volumes de dados.

```bash
npm run test:benchmark
```

## Como Executar os Testes

Para executar todos os testes:

```bash
npm test
```

Para executar apenas um tipo específico de teste:

```bash
# Testes unitários
npm run test:unit

# Testes de integração
npm run test:integration

# Testes de benchmark
npm run test:benchmark
```

Para executar os testes em modo de observação (útil durante o desenvolvimento):

```bash
npm run test:watch
```

Para executar com cobertura de código:

```bash
npm run test:coverage
```

## Boas Práticas

- Mantenha os testes independentes uns dos outros
- Use descrições claras para os testes
- Teste um único comportamento por teste
- Evite dependências externas nos testes unitários
- Use mocks para isolar o código sendo testado
- Organize os testes em blocos lógicos usando `describe`
- Adicione testes para novos métodos em todas as categorias apropriadas