# Padrões para Comandos no Windows

## Uso de Aspas em Caminhos de Arquivo

### Regra Principal
- **SEMPRE** usar "aspas duplas" para caminhos de arquivo no Windows
- Evitar o uso de barra invertida simples `\` que pode causar problemas de escape
- Se necessário usar barra invertida, usar barra dupla `\\` para evitar problemas de escape

### Exemplos Corretos

```cmd
mkdir "c:\caminho\para\pasta"
copy "c:\origem\arquivo.txt" "c:\destino\arquivo.txt"
cd "c:\caminho com espaços\"
```

### Exemplos Alternativos (menos preferidos)

```cmd
mkdir c:\\caminho\\para\\pasta
copy c:\\origem\\arquivo.txt c:\\destino\\arquivo.txt
```

## Comandos PowerShell

### Regra Principal
- Usar aspas duplas para caminhos e strings
- Preferir o uso de `-Path` e outros parâmetros nomeados para maior clareza

### Exemplos Corretos

```powershell
New-Item -Path "C:\caminho\para\pasta" -ItemType Directory
Copy-Item -Path "C:\origem\arquivo.txt" -Destination "C:\destino\arquivo.txt"
Set-Location -Path "C:\caminho com espaços\"
```

## Comandos Node.js/npm/pnpm

### Regra Principal
- Usar aspas duplas para caminhos em scripts de package.json
- Escapar aspas dentro de strings com barra invertida

### Exemplos Corretos

```json
{
  "scripts": {
    "build": "tsc --outDir \"./dist\"",
    "test": "jest --config=\"jest.config.ts\""
  }
}
```

## Comandos Git Bash no Windows

### Regra Principal
- Mesmo no Git Bash no Windows, preferir aspas duplas para caminhos Windows
- Usar barras normais `/` é aceitável no Git Bash

### Exemplos Corretos

```bash
mkdir -p "c:/caminho/para/pasta"
cp "c:/origem/arquivo.txt" "c:/destino/arquivo.txt"
```

## Variáveis de Ambiente

### Regra Principal
- Usar aspas duplas ao definir variáveis de ambiente com caminhos

### Exemplos Corretos

```cmd
set PATH="C:\Program Files\App;%PATH%"
```