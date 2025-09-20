# Catálogo de Aplicações - TemperareLabs

![Logo](https://github.com/CarlosDev0410/catalog-temperare/assets/102400661/4211132b-13f3-441a-8849-9999b825a03c)

Bem-vindo ao Catálogo de Aplicações da TemperareLabs. Este projeto é uma vitrine para exibir as aplicações inovadoras desenvolvidas pela empresa. É construído com Next.js e Tailwind CSS, apresentando uma interface moderna e responsiva.

## ✨ Features

- **Visualização de Aplicações:** Exibe uma lista de aplicações em formato de grade com cards interativos.
- **Busca Dinâmica:** Permite aos usuários pesquisar aplicações em tempo real por título, descrição ou tags.
- **Design Responsivo:** A interface se adapta a diferentes tamanhos de tela, de desktops a dispositivos móveis.
- **Arquitetura Híbrida (Server/Client):** Utiliza Server Components do Next.js para carregamento inicial rápido e Client Components para interatividade.
- **Carregamento Otimizado:** Inclui skeletons de carregamento e animações suaves para uma melhor experiência do usuário.
- **Base de Dados em JSON:** As aplicações são gerenciadas através de um simples arquivo `db.json`, facilitando a adição e atualização de dados.

## 🚀 Tech Stack

- **Framework:** [Next.js](https://nextjs.org/) (v14 com App Router)
- **Linguagem:** [TypeScript](https://www.typescriptlang.org/)
- **Estilização:** [Tailwind CSS](https://tailwindcss.com/) (v4)
- **UI Components:** [shadcn/ui](https://ui.shadcn.com/) (com Radix UI)
- **Animações:** [Framer Motion](https://www.framer.com/motion/)
- **Linting:** [ESLint](https://eslint.org/)

## 📂 Estrutura do Projeto

A estrutura de pastas segue as convenções do Next.js App Router, mantendo o código organizado e escalável.

```
/
├── public/                 # Arquivos estáticos (imagens, logos)
├── src/
│   ├── app/                # Páginas e rotas da aplicação
│   │   ├── api/            # Rotas de API (ex: busca)
│   │   ├── layout.tsx      # Layout principal
│   │   ├── page.tsx        # Página principal (Server Component)
│   │   └── page-client.tsx # Lógica de cliente para a página principal
│   ├── components/         # Componentes React reutilizáveis
│   │   ├── ui/             # Componentes de UI (shadcn)
│   │   ├── apps/           # Componentes específicos para aplicações
│   │   └── ...
│   ├── constants/          # Constantes da aplicação
│   ├── lib/                # Utilitários e o "banco de dados"
│   │   └── db.json         # Arquivo JSON com os dados das aplicações
│   ├── services/           # Lógica de acesso a dados (AppService)
│   └── types/              # Definições de tipos TypeScript
├── package.json            # Dependências e scripts
└── ...
```

## ⚙️ Como Funciona

### Fluxo de Dados

1.  **Carregamento Inicial (Server-Side):**
    - A página principal (`src/app/page.tsx`), um Server Component, é renderizada no servidor.
    - Ela utiliza o `AppService` para ler os dados do arquivo `src/lib/db.json`.
    - Os dados das aplicações são passados como props para o componente de cliente `PageClient`.

2.  **Interação do Usuário (Client-Side):**
    - O `PageClient` (`src/app/page-client.tsx`) gerencia o estado da interface, como o termo de busca e os resultados.
    - Quando um usuário digita na barra de busca, o estado `searchTerm` é atualizado.
    - Ao executar a busca, o componente faz uma requisição `fetch` para a API Route `/api/apps/search`.

3.  **Busca (API Route):**
    - A rota (`src/app/api/apps/search/route.ts`) recebe a query de busca.
    - Ela utiliza o mesmo `AppService` no lado do servidor para filtrar as aplicações do `db.json` com base na query.
    - Os resultados são retornados como JSON para o cliente.

4.  **Exibição dos Resultados:**
    - O `PageClient` recebe os resultados da busca e atualiza o estado `searchResults`, fazendo com que a lista de aplicações seja re-renderizada para mostrar apenas os itens filtrados.

### Componentes Principais

- **`Header`**: Contém o logo e o componente `SearchInput`.
- **`SearchInput`**: Campo de busca que dispara as ações de pesquisa.
- **`AppsList`**: Gerencia a exibição da lista de aplicações, mostrando o estado de carregamento, erro, resultados vazios ou a grade de aplicações.
- **`AppsGrid`**: Renderiza a grade de `CardApp`.
- **`CardApp`**: Card individual que exibe as informações de uma aplicação, com animações de entrada e hover.

## 🔧 Configuração e Modificação

Para adicionar, remover ou modificar as aplicações exibidas no catálogo, edite o arquivo `src/lib/db.json`.

Cada objeto no array `apps` deve seguir a interface `App` definida em `src/types/index.ts`:

```json
{
  "apps": [
    {
      "id": "app-1",
      "title": "Nome da Aplicação",
      "description": "Uma breve descrição da aplicação.",
      "imageUrl": "/caminho/para/imagem.png",
      "appUrl": "https://url-da-aplicacao.com/",
      "category": "Categoria",
      "tags": ["tag1", "tag2"]
    }
  ]
}
```

- **`imageUrl`**: O caminho deve ser relativo à pasta `public`. Por exemplo, se a imagem estiver em `public/images/app.png`, o valor deve ser `/images/app.png`.

## 🚀 Getting Started

Siga os passos abaixo para executar o projeto localmente.

### Pré-requisitos

- [Node.js](https://nodejs.org/) (v20 ou superior)
- [npm](https://www.npmjs.com/) ou [yarn](https://yarnpkg.com/)

### Instalação

1.  Clone o repositório:
    ```bash
    git clone https://github.com/CarlosDev0410/catalog-temperare.git
    ```

2.  Navegue até o diretório do projeto:
    ```bash
    cd catalog-temperare
    ```

3.  Instale as dependências:
    ```bash
    npm install
    ```

### Executando o Servidor de Desenvolvimento

Para iniciar o servidor de desenvolvimento, execute:

```bash
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000) no seu navegador para ver a aplicação em funcionamento.

## 部署 no Vercel

A maneira mais fácil de implantar seu aplicativo Next.js é usar a [Plataforma Vercel](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) dos criadores do Next.js.

Confira nossa [documentação de implantação do Next.js](https://nextjs.org/docs/app/building-your-application/deploying) para mais detalhes.

## 📄 Licença

Este projeto está licenciado sob a Licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.