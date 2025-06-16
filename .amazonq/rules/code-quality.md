# Regras de Qualidade de Código

## Princípios Gerais
- Escrever código limpo, legível e bem documentado
- Seguir os princípios SOLID
- Evitar duplicação de código (DRY - Don't Repeat Yourself)
- Preferir imutabilidade quando possível

## TypeScript
- Usar tipos explícitos em vez de `any`
- Aproveitar interfaces e tipos para melhorar a documentação do código
- Utilizar modificadores de acesso apropriados (public, private, protected)
- Preferir métodos estáticos para funções utilitárias sem estado
- **OBRIGATÓRIO**: Usar tipagem estrita em todos os parâmetros, retornos e variáveis
- Evitar o uso de `as` para conversões de tipo; preferir verificações de tipo em tempo de execução

## Documentação
- **OBRIGATÓRIO**: Documentar todas as funções, métodos, classes e interfaces com JSDoc
- Incluir descrições claras de parâmetros, valores de retorno e exceções lançadas
- Adicionar exemplos de uso em funções complexas ou APIs públicas
- Usar comentários internos para explicar lógica complexa ou decisões de implementação
- Manter a documentação sincronizada com o código ao fazer alterações

## Tratamento de Erros
- Usar tratamento de erros apropriado com try/catch quando necessário
- Evitar retornar valores nulos; preferir undefined para valores ausentes
- Documentar claramente os possíveis valores de retorno, incluindo undefined

## Performance
- Considerar a performance em operações com grandes conjuntos de dados
- Evitar loops aninhados desnecessários
- Usar métodos de array funcionais (map, filter, reduce) para melhor legibilidade

## Segurança
- Validar entradas de usuário
- Não expor dados sensíveis em logs ou mensagens de erro
- Seguir as melhores práticas de segurança para manipulação de dados

## Compatibilidade
- Garantir que o código funcione em diferentes ambientes (Node.js, navegadores)
- Considerar a compatibilidade com versões anteriores ao fazer alterações