# Padrões de Projeto e Boas Práticas

## Verificação de Sistema Operacional
- Sempre verificar o sistema operacional do usuário antes de recomendar comandos específicos
- Para Windows, **OBRIGATÓRIO** usar comandos CMD/PowerShell com "aspas duplas" para caminhos ou usar barra dupla \\ para evitar problemas de escape
- Para Linux/macOS, usar comandos Bash com 'aspas simples' ou "aspas duplas" conforme apropriado
- **IMPORTANTE**: No Windows, preferir sempre o uso de "aspas duplas" em vez de barra dupla \\ para evitar a maioria dos problemas de escape

## Padrões de Código
- Seguir rigorosamente as configurações do ESLint e Prettier existentes no projeto
- Manter a consistência com o estilo de código atual (indentação, nomenclatura, etc.)
- **OBRIGATÓRIO**: Usar TypeScript com tipagem estrita em todo o código
- Seguir o padrão de exportação/importação já estabelecido no projeto
- Usar interfaces para definir contratos claros entre componentes
- Preferir tipos explícitos mesmo quando a inferência de tipos é possível

## Documentação de Código
- **OBRIGATÓRIO**: Documentar todas as funções, classes, interfaces e tipos com JSDoc completo
- Incluir descrição, parâmetros, retorno e exemplos de uso em cada função pública
- Adicionar comentários explicativos para lógica complexa ou não óbvia
- Manter a documentação atualizada quando o código for modificado
- Seguir o formato de documentação existente no projeto para consistência

## Modificações de Código
- Ao modificar qualquer funcionalidade, garantir que os testes existentes continuem passando
- Criar novos testes para novas funcionalidades ou modificações significativas
- Documentar novas funções/métodos com JSDoc seguindo o padrão existente
- Manter a compatibilidade com versões anteriores quando possível

## Testes
- Manter os testes atualizados com qualquer alteração de código
- Seguir o padrão de testes Jest já estabelecido
- Garantir cobertura adequada para novas funcionalidades
- Usar mocks apropriados para isolar unidades de teste
- Testar casos de borda e condições de erro

## Estrutura do Projeto
- Manter a organização de diretórios atual
- Colocar novos serviços em `/src/services`
- Colocar novos dados em `/src/data`
- Colocar novos testes em `/src/__tests__`

## Commits e Versionamento
- Seguir o padrão de commits convencional (já configurado com husky)
- Atualizar o CHANGELOG.md para alterações significativas
- Respeitar o versionamento semântico (major.minor.patch)