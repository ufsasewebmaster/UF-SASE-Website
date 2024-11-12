# UF SASE Website

This repository hosts the official website for the UF chapter of the Society of Asian Scientists and Engineers (SASE), built by our wonderful Web Team! It uses the T3+ stack, which includes TypeScript, React, Tanstack Router/Query, Hono, Drizzle, and more.
[Staging](https://uf-sase-website.vercel.app)
[Production](https://ufsase.com)

## Getting Started

### Prerequisites

- **IDE Recommendation:** We recommend using Visual Studio Code (VSCode) as it offers great extensions for TypeScript and Tailwind CSS, which are automatically suggested when the project is opened.
- **Package Manager:** Ensure you have [bun](https://bun.sh/) installed.

### Cloning the Repository

To get started, clone the repository to your local machine:

```bash
git clone https://github.com/ufsasewebmaster/UF-SASE-Website
cd UF-SASE-Website
```

### Installing Dependencies

After cloning the repository, install the required dependencies:

```bash
pnpm install
```

### Setting Up the Environment Variables

Create a `.env` file in the root directory of the project. Use the `.env.example` file as a reference.

```
DATABASE_URL="file:local.db"
```

### Initializing the Local Development Database

To set up the local SQLite database and apply the schema, run the following commands:

```bash
pnpm db:local:init
pnpm db:push
```

Start the development server:

```bash
pnpm dev
```

The application should now be running at `http://localhost:3000`.

## Deploying to Vercel

### Setting Up an External Database

We use [Turso](https://turso.tech/), a hosted SQLite service with a generous free tier, for our production database.

1. **Create a Database:** Sign up for Turso, create a new database group, and then create a new database.
2. **Generate an Auth Token:** Click on the three dots in the top right corner of the database, select "Create new token", and copy the credentials to your `.env` file as shown below:

   ```
   DATABASE_URL="libsql://your-url"
   DATABASE_AUTH_TOKEN="your-auth-token"
   ```

3. **Update the Database Schema:** Push the database schema to the new database:

   ```bash
   pnpm db:push
   ```

**Note:** Running `pnpm dev` now connects to your production database. Be cautious when making changes in this mode. To switch back to local development, set `DATABASE_URL="file:local.db"` in the `.env` file.

### Deploying to Vercel

1. Deploy the project to Vercel by pushing changes to the main branch. Vercel will automatically build and deploy the project.

## Project Structure

### Shared

The `shared` directory contains code that is used by both the frontend and backend, including environment variable validation using Zod.

### Server

The backend entry point is `./server/index.ts`. It initializes the Hono app and sets up the database client. The database schema is defined in `./server/db/schema.ts`.

### Frontend

The frontend entry point is `./client/index.tsx`, which serves as the main React entry point. Routes are defined in the `./client/routes` folder, following the structure recommended by Tanstack Router. All static assets are located in the `./public` folder.
