#!/bin/bash

# Script de deploy para o projeto ad-insights
# Este script automatiza o processo de deploy

set -e

echo "🚀 Iniciando deploy do projeto ad-insights..."

# Verificar se estamos na branch main
CURRENT_BRANCH=$(git branch --show-current)
if [ "$CURRENT_BRANCH" != "main" ]; then
    echo "⚠️  Você não está na branch main. Branch atual: $CURRENT_BRANCH"
    read -p "Deseja continuar mesmo assim? (y/N): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        echo "❌ Deploy cancelado."
        exit 1
    fi
fi

# Verificar se há mudanças não commitadas
if [ -n "$(git status --porcelain)" ]; then
    echo "⚠️  Há mudanças não commitadas no repositório."
    read -p "Deseja continuar mesmo assim? (y/N): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        echo "❌ Deploy cancelado. Commit suas mudanças primeiro."
        exit 1
    fi
fi

# Executar testes (se existirem)
if grep -q '"test"' package.json; then
    echo "🧪 Executando testes..."
    if command -v bun &> /dev/null; then
        bun run test
    else
        npm run test
    fi
fi

# Executar build
echo "🏗️  Executando build..."
./scripts/build.sh

# Opções de deploy
echo ""
echo "Escolha o método de deploy:"
echo "1) Docker (local)"
echo "2) Docker Hub"
echo "3) Vercel"
echo "4) Netlify"
echo "5) GitHub Pages"
echo "6) Apenas build (sem deploy)"

read -p "Digite sua escolha (1-6): " DEPLOY_CHOICE

case $DEPLOY_CHOICE in
    1)
        echo "🐳 Fazendo deploy com Docker (local)..."
        docker build -t ad-insights .
        echo "✅ Imagem Docker criada: ad-insights"
        echo "Para executar: docker run -p 80:80 ad-insights"
        ;;
    2)
        echo "🐳 Fazendo deploy para Docker Hub..."
        read -p "Digite seu username do Docker Hub: " DOCKER_USERNAME
        docker build -t $DOCKER_USERNAME/ad-insights .
        docker push $DOCKER_USERNAME/ad-insights
        echo "✅ Deploy para Docker Hub concluído!"
        ;;
    3)
        echo "▲ Fazendo deploy para Vercel..."
        if command -v vercel &> /dev/null; then
            vercel --prod
        else
            echo "❌ Vercel CLI não está instalado. Instale com: npm i -g vercel"
            exit 1
        fi
        ;;
    4)
        echo "🌐 Fazendo deploy para Netlify..."
        if command -v netlify &> /dev/null; then
            netlify deploy --prod --dir=dist
        else
            echo "❌ Netlify CLI não está instalado. Instale com: npm i -g netlify-cli"
            exit 1
        fi
        ;;
    5)
        echo "📄 Fazendo deploy para GitHub Pages..."
        if command -v gh &> /dev/null; then
            gh workflow run deploy-gh-pages
        else
            echo "❌ GitHub CLI não está instalado ou workflow não configurado."
            echo "Configure GitHub Actions para deploy automático."
        fi
        ;;
    6)
        echo "✅ Build concluído. Arquivos disponíveis em ./dist"
        ;;
    *)
        echo "❌ Opção inválida."
        exit 1
        ;;
esac

echo ""
echo "🎉 Deploy concluído com sucesso!"

