# Padrões de Documentação

## JSDoc

### Funções e Métodos
```typescript
/**
 * Breve descrição da função em uma linha.
 * 
 * Descrição mais detalhada se necessário, explicando o propósito
 * e comportamento da função.
 *
 * @param {Type} paramName - Descrição do parâmetro
 * @param {Type} [optionalParam] - Descrição do parâmetro opcional
 * @returns {ReturnType} Descrição do valor retornado
 * @throws {ErrorType} Descrição da condição que causa o erro
 * 
 * @example
 * // Exemplo básico de uso
 * const result = myFunction('valor');
 * 
 * @example
 * // Exemplo mais complexo se necessário
 * const options = { key: 'value' };
 * const result = myFunction('valor', options);
 */
```

### Classes
```typescript
/**
 * Breve descrição da classe.
 * 
 * Descrição mais detalhada explicando o propósito e comportamento da classe.
 * 
 * @class
 */
```

### Interfaces e Types
```typescript
/**
 * Interface que define a estrutura de um objeto.
 * 
 * @interface
 */

/**
 * Type que define um tipo personalizado.
 * 
 * @typedef {(string|number)} CustomType
 */
```

## Comentários Internos

### Blocos de Código Complexos
```typescript
// --------------------------------------
// Seção: Processamento de Dados
// --------------------------------------

/*
 * Este bloco de código implementa o algoritmo X para resolver Y.
 * Ele funciona da seguinte forma:
 * 1. Primeiro, fazemos A
 * 2. Depois, calculamos B
 * 3. Finalmente, retornamos C
 */
```

### Comentários em Linha
```typescript
const value = complexCalculation(); // Explicação do cálculo ou por que é necessário

// Explicação de por que esta abordagem específica foi escolhida
if (condition) {
  // ...
}
```

## Manutenção da Documentação

- Atualizar a documentação sempre que o código for modificado
- Verificar se os exemplos ainda são válidos após alterações
- Garantir que os tipos nos comentários JSDoc correspondam aos tipos reais no código
- Manter a consistência no estilo de documentação em todo o projeto