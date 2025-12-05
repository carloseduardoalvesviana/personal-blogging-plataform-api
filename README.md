# Personal Blogging Platform API

Uma API RESTful para uma plataforma de blog pessoal, desenvolvida com foco em **Clean Architecture**, **SOLID** e boas práticas de desenvolvimento moderno.

## 🚀 Tecnologias

O projeto utiliza uma stack moderna e eficiente:

-   **[Node.js](https://nodejs.org/)**: Ambiente de execução JavaScript.
-   **[Fastify](https://www.fastify.io/)**: Framework web extremamente rápido e com baixo overhead.
-   **[TypeScript](https://www.typescriptlang.org/)**: Superset do JavaScript que adiciona tipagem estática.
-   **[TSX](https://github.com/privatenumber/tsx)**: Executor de TypeScript (sucessor do ts-node) para rodar o projeto em desenvolvimento.
-   **[Tsup](https://tsup.egoist.dev/)**: Ferramenta moderna de bundling para projetos Node.js e TypeScript.
-   **[Biome](https://biomejs.dev/)**: Ferramenta de alta performance para formatação e linting do código.

## 🏗 Arquitetura

A aplicação segue uma arquitetura em camadas, inspirada em **Clean Architecture** e **DDD (Domain-Driven Design)**, separando claramente as responsabilidades:

-   **Entities** (`src/entities`): Representam o domínio da aplicação (ex: `Article`). São independentes de frameworks externos.
-   **Repositories** (`src/repositories`): Abstração para acesso a dados. O projeto utiliza o **Repository Pattern** para desacoplar a lógica de negócio da persistência de dados.
    -   `ArticleRepositoryInterface`: Contrato que define as operações possíveis.
    -   `ImMemoryArticleRepository`: Implementação em memória para testes e desenvolvimento ágil.
-   **Use Cases** (`src/use-cases`): Contém a regras de negócio da aplicação. Cada Use Case possui uma responsabilidade única (ex: `CreateArticleUseCase`, `FindAllArticlesUseCase`).
-   **Controllers** (`src/controllers`): Responsáveis por receber as requisições HTTP, chamar os Use Cases apropriados e retornar as respostas.
-   **DTOs** (`src/dto`): Data Transfer Objects, usados para tipar e transportar dados entre as camadas (ex: `CreateArticleRequestDTO`).
-   **Errors** (`src/errors`): Classes de erro personalizadas (`NotFoundError`, `ValidationError`) para um tratamento de exceções mais semântico.

## 🧩 Princípios SOLID Aplicados

O código foi cuidadosamente estruturado seguindo os princípios SOLID:

1.  **S - Single Responsibility Principle (Princípio da Responsabilidade Única):**
    -   Cada **Use Case** (ex: `CreateArticleUseCase`) tem apenas uma razão para mudar: a alteração daquela regra de negócio específica.
    -   As **Entidades** focam apenas nas regras de domínio.
    -   Os **Controllers** lidam apenas com a entrada/saída HTTP.

2.  **O - Open/Closed Principle (Princípio Aberto/Fechado):**
    -   As classes dependem de abstrações. Por exemplo, os Use Cases dependem de `ArticleRepositoryInterface`. Isso permite criar novas implementações de repositório (ex: Postgres, Mongo) sem modificar o código dos Use Cases existente.

3.  **L - Liskov Substitution Principle (Princípio da Substituição de Liskov):**
    -   A implementação `ImMemoryArticleRepository` pode ser substituída por qualquer outra implementação de `ArticleRepositoryInterface` sem quebrar a aplicação, pois ambas respeitam fielmente o contrato da interface.

4.  **I - Interface Segregation Principle (Princípio da Segregação de Interface):**
    -   A interface `ArticleRepositoryInterface` define métodos claros e necessários para o contexto de artigos, evitando forçar implementações desnecessárias.

5.  **D - Dependency Inversion Principle (Princípio da Inversão de Dependência):**
    -   Os módulos de alto nível (Use Cases) não dependem de módulos de baixo nível (Implementação do Banco de Dados). Ambos dependem de abstrações (`ArticleRepositoryInterface`).
    -   A injeção de dependência é feita manualmente no `routes.ts` (ou `server.ts`), onde as instâncias dos repositórios são passadas para os Use Cases.

## 🛠 Como Executar

### Pré-requisitos

-   Node.js instalado (versão recomendada: LTS >= 18)

### Passo a passo

1.  **Instale as dependências:**

    ```bash
    npm install
    ```

2.  **Execute o servidor de desenvolvimento:**

    ```bash
    npm run dev
    ```

    O servidor iniciará (padrão do Fastify geralmente em `http://localhost:3000`).

3.  **Lint e Formatação:**

    Para verificar e corrigir estilo de código com Biome:

    ```bash
    npm run lint
    ```

    Para correções inseguras (se necessário):
    ```bash
    npm run lint-unsafe
    ```
