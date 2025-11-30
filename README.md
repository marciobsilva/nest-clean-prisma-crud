# 🧩 Task CRUD API

Um projeto **CRUD de tarefas** desenvolvido com **NestJS**, seguindo os princípios da **Clean Architecture**, utilizando **Prisma ORM** para acesso ao banco de dados e **Zod** para validação de dados.

---

## 🚀 Tecnologias utilizadas

- **[NestJS](https://nestjs.com/)** — Framework Node.js para construção de aplicações escaláveis e modulares.  
- **[Prisma](https://www.prisma.io/)** — ORM moderno e tipado para comunicação com o banco de dados.  
- **[Zod](https://zod.dev/)** — Biblioteca para validação e tipagem de dados.  
- **[TypeScript](https://www.typescriptlang.org/)** — Tipagem estática para JavaScript.
- **[Vitest](https://vitest.dev/)** — Um framework de testes nativo do Vite. 
- **[csv-parser](https://csv.js.org/parse/)** — Conversor de textos CSV para objeto. 

---

## 🧠 Arquitetura

O projeto segue os princípios da **Clean Architecture**, separando as camadas de responsabilidade:

```
src/
├── core/          # Entidades e tipos base
├── domain/
│   ├── enterprise/    # Entidades do domínio
│   └── application/   # Casos de uso (use cases)
├── infra/
│   ├── database/      # Prisma e repositórios concretos
│   │   └── prisma/        # Configuração do Prisma Client
│   └── http/          # Controllers, DTOs e validações
└── main.ts            # Ponto de entrada da aplicação
```

Essa estrutura facilita testes, manutenção e escalabilidade, mantendo o domínio desacoplado de frameworks.

---

## ⚙️ Funcionalidades

✅ Criar uma tarefa  
✅ Listar todas as tarefas  
✅ Atualizar uma tarefa  
✅ Excluir uma tarefa  
✅ Buscar tarefa por ID  
✅ Criar tarefas por arquivo csv  

---

## 📦 Instalação

Clone o repositório:

```bash
git clone https://github.com/marciobsilva/nest-clean-prisma-crud.git
cd nest-clean-prisma-crud
```

Instale as dependências:

```bash
npm install
```

Crie o arquivo `.env` e configure sua conexão com o banco:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/tasks_db?schema=public"
```

Execute as migrações do Prisma:

```bash
npx prisma migrate dev
```

---

## ▶️ Executando o projeto

Modo desenvolvimento:

```bash
npm run start:dev
```

O servidor será iniciado em:  
👉 **http://localhost:3000**

---

## 🧪 Testes

Para rodar os testes automatizados:

```bash
npm run test
```

---

## 🧰 Exemplos de requisições

Utilizar o arquivo client.http

---

## 🧾 Licença

Este projeto é distribuído sob a licença **MIT**.  
Sinta-se à vontade para usar e modificar.

---

## ✨ Autor

Desenvolvido por **Márcio Silva**  
💼 [LinkedIn](https://www.linkedin.com/in/marciobsilva) • 💻 [GitHub](https://github.com/marciobsilva)
