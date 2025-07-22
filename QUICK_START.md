# 🚀 Guia de Início Rápido - ad-insights

Este guia te ajudará a colocar o projeto funcionando em poucos minutos.

## ⚡ Início Super Rápido

```bash
# 1. Clone o repositório
git clone https://github.com/arkbsb/ad-insights.git
cd ad-insights

# 2. Execute o script de setup (recomendado)
./scripts/setup.sh

# 3. Configure as variáveis de ambiente
cp .env.example .env
# Edite o arquivo .env com suas configurações

# 4. Inicie o projeto
bun run dev
# ou npm run dev
```

## 📋 Pré-requisitos

- **Bun** (recomendado) ou **Node.js 18+**
- **Git**

### Instalação do Bun (se não tiver)
```bash
curl -fsSL https://bun.sh/install | bash
```

## 🛠️ Scripts Úteis

O projeto inclui vários scripts para facilitar o desenvolvimento:

```bash
# Desenvolvimento
./scripts/dev.sh start    # Inicia servidor de desenvolvimento
./scripts/dev.sh build    # Faz build de produção
./scripts/dev.sh lint     # Executa linting
./scripts/dev.sh clean    # Limpa arquivos temporários
./scripts/dev.sh check    # Verifica saúde do projeto

# Deploy
./scripts/deploy.sh       # Deploy interativo
./scripts/build.sh        # Build otimizado
```

## 🐳 Docker (Opcional)

```bash
# Build da imagem
docker build -t ad-insights .

# Executar container
docker run -p 3000:80 ad-insights

# Ou usar Docker Compose
docker-compose up
```

## 🌐 Variáveis de Ambiente

Copie `.env.example` para `.env` e configure:

```env
# Supabase (se usar)
VITE_SUPABASE_URL=sua_url_aqui
VITE_SUPABASE_ANON_KEY=sua_chave_aqui

# Outras configurações
VITE_APP_NAME=Ad Insights
VITE_DEV_MODE=true
```

## 📁 Estrutura do Projeto

```
ad-insights/
├── src/                 # Código fonte
├── public/              # Arquivos estáticos
├── scripts/             # Scripts de automação
├── .github/workflows/   # CI/CD
├── supabase/           # Configurações Supabase
├── package.json        # Dependências
├── Dockerfile          # Container Docker
├── docker-compose.yml  # Orquestração Docker
└── README.md           # Documentação completa
```

## 🚨 Problemas Comuns

### Erro de dependências
```bash
rm -rf node_modules bun.lockb
bun install
```

### Erro de build
```bash
./scripts/dev.sh clean
./scripts/dev.sh build
```

### Porta já em uso
```bash
# Matar processo na porta 5173
lsof -ti:5173 | xargs kill -9
```

## 📚 Próximos Passos

1. **Configure o ambiente**: Edite o arquivo `.env`
2. **Explore o código**: Veja a estrutura em `src/`
3. **Leia a documentação**: Consulte `README.md` para detalhes
4. **Contribua**: Veja `CONTRIBUTING.md` para diretrizes

## 🆘 Precisa de Ajuda?

- 📖 Leia o `README.md` completo
- 🤝 Veja `CONTRIBUTING.md` para contribuir
- 🐛 Abra uma issue no GitHub
- 💬 Entre em contato com os maintainers

---

**Dica**: Use `./scripts/dev.sh help` para ver todos os comandos disponíveis!

