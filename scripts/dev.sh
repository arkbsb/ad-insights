#!/bin/bash

# Script de desenvolvimento para o projeto ad-insights
# Este script facilita tarefas comuns de desenvolvimento

set -e

# Função para mostrar ajuda
show_help() {
    echo "🛠️  Script de desenvolvimento do ad-insights"
    echo ""
    echo "Uso: ./scripts/dev.sh [comando]"
    echo ""
    echo "Comandos disponíveis:"
    echo "  start     - Inicia o servidor de desenvolvimento"
    echo "  build     - Executa o build de produção"
    echo "  lint      - Executa o linting do código"
    echo "  format    - Formata o código com Prettier"
    echo "  clean     - Limpa arquivos de build e cache"
    echo "  deps      - Atualiza dependências"
    echo "  check     - Verifica a saúde do projeto"
    echo "  help      - Mostra esta ajuda"
    echo ""
}

# Função para verificar dependências
check_deps() {
    echo "🔍 Verificando dependências..."
    
    if [ ! -d "node_modules" ]; then
        echo "📦 Instalando dependências..."
        if command -v bun &> /dev/null; then
            bun install
        else
            npm install
        fi
    else
        echo "✅ Dependências já instaladas"
    fi
}

# Função para limpar arquivos
clean_project() {
    echo "🧹 Limpando projeto..."
    
    # Remover diretórios de build
    rm -rf dist/
    rm -rf build/
    rm -rf .vite/
    
    # Limpar cache do Bun/npm
    if command -v bun &> /dev/null; then
        bun pm cache rm
    else
        npm cache clean --force
    fi
    
    echo "✅ Projeto limpo!"
}

# Função para verificar saúde do projeto
check_health() {
    echo "🏥 Verificando saúde do projeto..."
    
    # Verificar se package.json existe
    if [ ! -f "package.json" ]; then
        echo "❌ package.json não encontrado!"
        exit 1
    fi
    
    # Verificar dependências
    check_deps
    
    # Executar linting
    echo "🔍 Executando linting..."
    if command -v bun &> /dev/null; then
        bun run lint
    else
        npm run lint
    fi
    
    # Verificar se o build funciona
    echo "🏗️  Testando build..."
    if command -v bun &> /dev/null; then
        bun run build
    else
        npm run build
    fi
    
    echo "✅ Projeto está saudável!"
}

# Processar argumentos
case "${1:-help}" in
    start)
        echo "🚀 Iniciando servidor de desenvolvimento..."
        check_deps
        if command -v bun &> /dev/null; then
            bun run dev
        else
            npm run dev
        fi
        ;;
    build)
        echo "🏗️  Executando build..."
        ./scripts/build.sh
        ;;
    lint)
        echo "🔍 Executando linting..."
        check_deps
        if command -v bun &> /dev/null; then
            bun run lint
        else
            npm run lint
        fi
        ;;
    format)
        echo "✨ Formatando código..."
        check_deps
        if command -v prettier &> /dev/null; then
            prettier --write "src/**/*.{ts,tsx,js,jsx,css,md}"
        else
            echo "❌ Prettier não está instalado globalmente."
            echo "Instale com: npm install -g prettier"
        fi
        ;;
    clean)
        clean_project
        ;;
    deps)
        echo "📦 Atualizando dependências..."
        if command -v bun &> /dev/null; then
            bun update
        else
            npm update
        fi
        ;;
    check)
        check_health
        ;;
    help|--help|-h)
        show_help
        ;;
    *)
        echo "❌ Comando desconhecido: $1"
        echo ""
        show_help
        exit 1
        ;;
esac

