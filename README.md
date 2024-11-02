<p>&nbsp;</p>
<h1 align="center">📝 Blog API</h1>
<p>&nbsp;</p>

## 📖 Description

A RESTful API designed for managing a blogging platform, developed with Node.js and Sequelize ORM. This API enables users to create, read, update, and delete blog posts and comments while supporting user authentication and session management.

## 💡 Features

- **User Authentication**: Register, log in, and manage user sessions securely.
- **Blog Post Management**: Create, update, delete, and view blog posts.
- **Comment System**: Add and delete comments on blog posts.
- **Database Integration**: Utilizes Sequelize ORM for efficient database management and interactions.

## 🔨 Tools

- **Node.js**: JavaScript runtime for server-side logic.
- **Express**: Framework for building the API.
- **PostgreSQL**: Relational database for data persistence.
- **Prisma**: ORM for database schema and queries.

## ⚙️ Setup

### Prerequisites

- Node.js
- PostgreSQL

### Installation

- **Clone the repository:**

   ```bash
   git clone https://github.com/Jaoovit/blog-api.git

   cd blog-api
1. Update the name of the .env_template to .env

2. Define .env variables:

    - Database URL to config Prisma after DATABASE_URL=

    - Port to run the application after PORT=

    - Secret to config session after SECRET=

    - Secret to config JWT after JWT_SECRET=

## 🏃‍➡️ Start

- **Run commands:**

    ```bash
    npm install

    npx prisma migrate dev --name init

    npm run start