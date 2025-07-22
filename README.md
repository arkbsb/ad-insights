# ad-insights

Este projeto é um painel de insights de anúncios desenvolvido com React, TypeScript, Vite e Shadcn UI. Ele utiliza Bun para gerenciamento de pacotes e execução de scripts, e pode ser conteinerizado com Docker.

## Tecnologias Utilizadas

*   **Framework Frontend:** React
*   **Linguagem:** TypeScript
*   **Build Tool:** Vite
*   **Componentes UI:** Shadcn UI
*   **Estilização:** Tailwind CSS
*   **Gerenciador de Pacotes/Runtime:** Bun
*   **Containerização:** Docker
*   **Autenticação/Banco de Dados (sugerido pela estrutura):** Supabase

## Estrutura do Projeto

O projeto segue uma estrutura padrão de aplicações React com Vite, com algumas adições:

*   `public/`: Arquivos estáticos.
*   `src/`: Código fonte da aplicação.
*   `supabase/`: Diretório sugerido para configurações e scripts relacionados ao Supabase.
*   `Dockerfile`: Contém as instruções para construir a imagem Docker da aplicação.
*   `package.json`: Define as dependências do projeto e scripts de execução.
*   `bun.lockb`: Arquivo de lock do Bun, garantindo instalações reprodutíveis.
*   `components.json`: Configurações para Shadcn UI.
*   `index.html`: Ponto de entrada da aplicação.
*   `postcss.config.js`, `tailwind.config.ts`: Configurações para PostCSS e Tailwind CSS.
*   `tsconfig.json`, `tsconfig.app.json`, `tsconfig.node.json`: Arquivos de configuração do TypeScript.
*   `vite.config.ts`: Configuração do Vite.

## Como Rodar o Projeto

Para rodar este projeto, você precisará ter o Node.js (com npm ou yarn) ou o Bun instalados em sua máquina. Recomenda-se o uso do Bun, conforme indicado no `Dockerfile` e `package.json`.

### Pré-requisitos

*   [Bun](https://bun.sh/docs/installation) (recomendado) ou [Node.js](https://nodejs.org/en/download/) (com npm ou yarn)
*   [Docker](https://docs.docker.com/get-docker/) (opcional, para conteinerização)

### Usando Bun (Recomendado)

1.  **Clone o repositório:**

    ```bash
    git clone https://github.com/arkbsb/ad-insights.git
    cd ad-insights
    ```

2.  **Instale as dependências:**

    ```bash
    bun install
    ```

3.  **Inicie o servidor de desenvolvimento:**

    ```bash
    bun run dev
    ```

    A aplicação estará disponível em `http://localhost:5173` (ou outra porta, se configurado).

### Usando npm/Yarn (Alternativo)

1.  **Clone o repositório:**

    ```bash
    git clone https://github.com/arkbsb/ad-insights.git
    cd ad-insights
    ```

2.  **Instale as dependências:**

    ```bash
    npm install # ou yarn install
    ```

3.  **Inicie o servidor de desenvolvimento:**

    ```bash
    npm run dev # ou yarn dev
    ```

    A aplicação estará disponível em `http://localhost:5173` (ou outra porta, se configurado).

### Usando Docker

1.  **Clone o repositório:**

    ```bash
    git clone https://github.com/arkbsb/ad-insights.git
    cd ad-insights
    ```

2.  **Construa a imagem Docker:**

    ```bash
    docker build -t ad-insights .
    ```

3.  **Execute o container Docker:**

    ```bash
    docker run -p 80:80 ad-insights
    ```

    A aplicação estará disponível em `http://localhost`.

## Variáveis de Ambiente

Se o projeto utilizar variáveis de ambiente (por exemplo, para chaves de API do Supabase), crie um arquivo `.env` na raiz do projeto com o seguinte formato:

```
# Exemplo de variáveis de ambiente para Supabase
VITE_SUPABASE_URL=sua_url_supabase
VITE_SUPABASE_ANON_KEY=sua_chave_anon_supabase
```

Consulte o código fonte (especialmente em `src/`) para identificar as variáveis de ambiente específicas que o projeto pode exigir.

## Contribuição

Sinta-se à vontade para contribuir com este projeto. Por favor, siga as diretrizes de contribuição (a serem definidas).

## Licença

Este projeto está licenciado sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes. (Se aplicável, crie o arquivo LICENSE)



## Deploy no EasyPanel

O EasyPanel utiliza Heroku Buildpacks para construir e implantar aplicações. Para garantir que o projeto `ad-insights` seja implantado corretamente, siga estas etapas:

### 1. Configurar Buildpacks no EasyPanel

No painel do EasyPanel, para o seu projeto `teste6` (ou o nome que você deu), vá para as configurações de Buildpacks e adicione os seguintes buildpacks na ordem:

1.  **Heroku Buildpack para Bun (Customizado):** `https://github.com/jakeg/heroku-buildpack-bun.git`
    *   Este buildpack instala o Bun, que é o runtime e gerenciador de pacotes principal do projeto.
2.  **Heroku Buildpack para Node.js:** `heroku/nodejs`
    *   Este buildpack é necessário para executar os scripts `build` e `start` definidos no `package.json` e `Procfile`.

**Importante:** A ordem dos buildpacks é crucial. O buildpack do Bun deve vir antes do Node.js para que o Bun esteja disponível no ambiente de build.

### 2. Verificar o `Procfile`

Certifique-se de que o arquivo `Procfile` na raiz do seu projeto tenha o seguinte conteúdo:

```
web: bun run start
```

Este comando instrui o Heroku (e, por extensão, o EasyPanel) a executar `bun run start` para iniciar sua aplicação web. O script `start` no `package.json` deve ser:

```json
"start": "bun run build && bun run preview"
```

### 3. Variáveis de Ambiente

Se o seu projeto utiliza variáveis de ambiente (como as do Supabase), configure-as diretamente no EasyPanel, na seção de variáveis de ambiente do seu projeto. Elas serão injetadas no ambiente de build e de execução.

### 4. Deploy

Após configurar os buildpacks e o `Procfile`, tente fazer o deploy novamente no EasyPanel. O processo de build deve agora reconhecer o Bun, instalar as dependências e construir a aplicação corretamente.

Se o erro persistir, verifique os logs de build detalhadamente no EasyPanel para identificar a etapa exata da falha. Pode ser necessário ajustar o `package.json` ou os scripts de build para serem mais compatíveis com o ambiente do buildpack.

