# Guia de Contribuição

Obrigado por considerar contribuir para o projeto ad-insights! Este documento fornece diretrizes para contribuir com o projeto.

## Como Contribuir

### Reportando Bugs

1. Verifique se o bug já foi reportado nas [Issues](https://github.com/arkbsb/ad-insights/issues).
2. Se não foi reportado, crie uma nova issue com:
   - Descrição clara do problema
   - Passos para reproduzir o bug
   - Comportamento esperado vs. comportamento atual
   - Screenshots (se aplicável)
   - Informações do ambiente (OS, versão do Node/Bun, etc.)

### Sugerindo Melhorias

1. Verifique se a sugestão já foi feita nas [Issues](https://github.com/arkbsb/ad-insights/issues).
2. Crie uma nova issue com:
   - Descrição clara da melhoria
   - Justificativa para a mudança
   - Exemplos de como seria implementada (se possível)

### Contribuindo com Código

1. **Fork** o repositório
2. **Clone** seu fork localmente:
   ```bash
   git clone https://github.com/seu-usuario/ad-insights.git
   cd ad-insights
   ```

3. **Crie uma branch** para sua feature/correção:
   ```bash
   git checkout -b feature/nome-da-feature
   # ou
   git checkout -b fix/nome-do-bug
   ```

4. **Configure o ambiente de desenvolvimento**:
   ```bash
   bun install
   cp .env.example .env
   # Configure as variáveis de ambiente necessárias
   ```

5. **Faça suas alterações** seguindo as diretrizes de código

6. **Teste suas alterações**:
   ```bash
   bun run dev
   bun run build
   bun run lint
   ```

7. **Commit suas alterações**:
   ```bash
   git add .
   git commit -m "feat: adiciona nova funcionalidade X"
   ```

8. **Push para sua branch**:
   ```bash
   git push origin feature/nome-da-feature
   ```

9. **Abra um Pull Request** no repositório original

## Diretrizes de Código

### Estilo de Código

- Use TypeScript para todo o código
- Siga as configurações do ESLint e Prettier
- Use nomes descritivos para variáveis e funções
- Adicione comentários para lógica complexa
- Mantenha funções pequenas e focadas

### Estrutura de Commits

Use o padrão [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` para novas funcionalidades
- `fix:` para correções de bugs
- `docs:` para mudanças na documentação
- `style:` para mudanças de formatação
- `refactor:` para refatoração de código
- `test:` para adição ou modificação de testes
- `chore:` para tarefas de manutenção

Exemplos:
```
feat: adiciona componente de gráfico de barras
fix: corrige erro de validação no formulário
docs: atualiza README com instruções de instalação
```

### Testes

- Adicione testes para novas funcionalidades
- Mantenha a cobertura de testes alta
- Execute os testes antes de fazer commit

### Componentes React

- Use componentes funcionais com hooks
- Implemente TypeScript interfaces para props
- Use Shadcn UI components quando possível
- Mantenha componentes reutilizáveis

### Estilização

- Use Tailwind CSS para estilização
- Evite CSS inline quando possível
- Mantenha consistência visual
- Teste responsividade em diferentes tamanhos de tela

## Configuração do Ambiente de Desenvolvimento

### Pré-requisitos

- [Bun](https://bun.sh/) (recomendado) ou Node.js 18+
- Git
- Editor de código (VS Code recomendado)

### Extensões Recomendadas para VS Code

- TypeScript and JavaScript Language Features
- Tailwind CSS IntelliSense
- ESLint
- Prettier
- Auto Rename Tag
- Bracket Pair Colorizer

### Configuração Inicial

1. Clone o repositório
2. Instale as dependências: `bun install`
3. Copie o arquivo de ambiente: `cp .env.example .env`
4. Configure as variáveis de ambiente necessárias
5. Inicie o servidor de desenvolvimento: `bun run dev`

## Processo de Review

1. Todos os Pull Requests passam por review
2. Pelo menos um maintainer deve aprovar
3. Todos os testes devem passar
4. O código deve seguir as diretrizes estabelecidas
5. A documentação deve ser atualizada se necessário

## Dúvidas?

Se você tiver dúvidas sobre como contribuir, sinta-se à vontade para:

- Abrir uma issue com a tag "question"
- Entrar em contato com os maintainers
- Consultar a documentação existente

Obrigado por contribuir! 🚀

