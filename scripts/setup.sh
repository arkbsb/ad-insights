#!/bin/bash

# Script de setup inicial para o projeto ad-insights
# Este script configura o ambiente de desenvolvimento

set -e

echo "🚀 Configurando o projeto ad-insights..."

# Verificar se o Bun está instalado
if ! command -v bun &> /dev/null; then
    echo "❌ Bun não está instalado. Instalando..."
    curl -fsSL https://bun.sh/install | bash
    export PATH="$HOME/.bun/bin:$PATH"
    echo "✅ Bun instalado com sucesso!"
else
    echo "✅ Bun já está instalado"
fi

# Verificar se o Node.js está instalado (fallback)
if ! command -v node &> /dev/null && ! command -v bun &> /dev/null; then
    echo "❌ Nem Bun nem Node.js estão instalados. Por favor, instale um deles."
    exit 1
fi

# Instalar dependências
echo "📦 Instalando dependências..."
if command -v bun &> /dev/null; then
    bun install
else
    npm install
fi

# Copiar arquivo de ambiente se não existir
if [ ! -f .env ]; then
    echo "📝 Criando arquivo .env..."
    cp .env.example .env
    echo "⚠️  Por favor, configure as variáveis de ambiente no arquivo .env"
else
    echo "✅ Arquivo .env já existe"
fi

# Verificar se o Git está inicializado
if [ ! -d .git ]; then
    echo "🔧 Inicializando repositório Git..."
    git init
    git add .
    git commit -m "Initial commit"
else
    echo "✅ Repositório Git já inicializado"
fi

echo ""
echo "🎉 Setup concluído com sucesso!"
echo ""
echo "Próximos passos:"
echo "1. Configure as variáveis de ambiente no arquivo .env"
echo "2. Execute 'bun run dev' (ou 'npm run dev') para iniciar o servidor de desenvolvimento"
echo "3. Acesse http://localhost:5173 no seu navegador"
echo ""
echo "Para mais informações, consulte o README.md"

