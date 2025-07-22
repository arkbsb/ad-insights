#!/bin/bash

# Script de build para o projeto ad-insights
# Este script executa o build de produção

set -e

echo "🏗️  Iniciando build do projeto ad-insights..."

# Verificar se as dependências estão instaladas
if [ ! -d "node_modules" ]; then
    echo "📦 Instalando dependências..."
    if command -v bun &> /dev/null; then
        bun install
    else
        npm install
    fi
fi

# Executar linting
echo "🔍 Executando linting..."
if command -v bun &> /dev/null; then
    bun run lint
else
    npm run lint
fi

# Executar build
echo "🔨 Executando build..."
if command -v bun &> /dev/null; then
    bun run build
else
    npm run build
fi

# Verificar se o build foi bem-sucedido
if [ -d "dist" ]; then
    echo "✅ Build concluído com sucesso!"
    echo "📁 Arquivos de build disponíveis em: ./dist"
    
    # Mostrar tamanho dos arquivos
    echo ""
    echo "📊 Tamanho dos arquivos de build:"
    du -sh dist/*
else
    echo "❌ Falha no build!"
    exit 1
fi

echo ""
echo "🚀 Projeto pronto para deploy!"

