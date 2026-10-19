# UF SASE Website

This repository hosts the official website for the UF chapter of the Society of Asian Scientists and Engineers (SASE), built by our wonderful Web Team! It uses a modern stack including Bun, TypeScript, React, Tanstack Router, Hono, and Drizzle.
[Staging](https://uf-sase-website.vercel.app)
[Production](https://ufsase.com)

## Additional Docs

- [Alumni Bank Update Pipeline (Local Development)](./README.alumni-bank-update.md)

## Getting Started

### Prerequisites

- **IDE Recommendation:** We recommend using Visual Studio Code (VSCode) as it offers great extensions for TypeScript and Tailwind CSS, which are automatically suggested when the project is opened.
- **Package Manager:** Ensure you have [bun 1.3.1](https://bun.sh/) installed.

### Cloning the Repository

To get started, clone the repository to your local machine:

```bash
git clone https://github.com/ufsasewebmaster/UF-SASE-Website
cd UF-SASE-Website
```

### Installing Dependencies

After cloning the repository, install the required dependencies:

```bash
bun install
```

### Setting Up the Environment Variables

Create a `.env` file in the root directory of the project with this format. For production values, refer to our env document, or otherwise refer to the corresponding documentation for generation. 
```
DATABASE_URL="file:local.db"      # Turso (or a local SQLite file)
DATABASE_AUTH_TOKEN=""
RESEND_API_KEY=""                 # Resend
GOOGLE_CREDENTIALS=''             # Google IAM service-account JSON, as a single-line string
GOOGLE_OAUTH_CLIENT_ID=""         # Google OAuth (login)
GOOGLE_OAUTH_CLIENT_SECRET=""
GOOGLE_OAUTH_REDIRECT_URI=""
ADMIN_USERNAME=""                 # Seed/admin accounts (local scripts only)
ADMIN_PASSWORD=""
ADMIN_EMAIL=""
TEST_USERNAME=""
TEST_PASSWORD=""
TEST_EMAIL=""
LINKEDIN_MCP_URL=""               # Alumni bank refresh (optional)
```
See `src/server/env.ts` and `scripts/env.ts` for the authoritative list.

### Initializing the Local Database/Environment

To set up the local SQLite database (the `file:local.db` outlined above) and apply the schema, run:

```bash
bun db:local:init
```
Note in the package.json that this sets up everything related to the database.

To start the development server:

```bash
bun dev
```

The application should now be running at `http://localhost:3000`.

**Note:** Ensure that you are generally not on the production database unless necessary for development.

### Deploying to Vercel

1. We automatically deploy the project to Vercel by pushing changes to the main branch. 

## Project Structure

### Shared

The `shared` directory contains code that is used by both the frontend and backend, including environment variable validation using Zod.

### Server

The backend entry point is `./src/server/index.ts`. It initializes the Hono app and sets up the database client. The database schema is defined in `./src/server/db/tables.ts`.

### Frontend

The frontend entry point is `./src/client/client.tsx`, which serves as the main React entry point. Routes are defined in the `./src/client/routes` folder, following the structure recommended by Tanstack Router. All static assets are located in the `./public` folder.
