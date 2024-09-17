# Ethan's SASE Stack Template

This is a little template I put together that I think would make a great stack to use for the team.

I will go into detail about each technical deicison below, but I think you should clone and deploy it yourself to see what its like!

# Running and Deploying

1. Clone the repo

In the top right corner of your screen, there will be a big green button that says "Use this template".
Click that button and create a new repository.

Then clone the repository to your local machine.

_I reccomend using VSCode, as it has some nice extensions for typescript and tailwind. They should be automatically recommended when you open the project._

2. Install the dependencies

```
# if you dont have pnpm
npm i -g pnpm

pnpm install
```

3. Setup .env

Create a .env file in the root of the project and add the following (as shown in the .env.example file):

```
DATABASE_URL="file:local.db"
```

4. Init the local dev db

```
pnpm db:local:init
pnpm db:push
```

5. Start the server

```
pnpm dev
```

## Thats it!

You should now have the app running on localhost:3000, go check it out!

That was cool but now lets deploy it!

## Deploying to Vercel

1. Setting up a 'real' database

Right now our data is stored in a local sqlite database, this is super convenient for development but in production, because we are using serverless functions, we need to use a database that is hosted separately from our application.

We will use [Turso](https://turso.tech/) to host our database. It is basically hosted sqlite, and has a very generous free tier.
Switching to it is as easy as swapping our environment variables.

To get started, sign up, create a new database group, then a new database.
You can call either whatever you want.
When you are done, click the 3 dots in the top right, then "create new token". Now copy these to your .env file (again, as shown in the .env.example file).

```
DATABASE_URL="libsql://your-url"
DATABASE_AUTH_TOKEN="your-auth-token"
```

This will also mean that when you run `pnpm dev` it is now talking to your production database, so be careful!
You can always change it back to the local db by changing the DATABASE_URL to "file:local.db".

2. Push the database schema

```
pnpm db:push
```

3. Deploy to Vercel

We will deploy to [Vercel](https://vercel.com/), a serverless hosting platform that is super easy to use.

First, sign up with github. Next, create a new project and select the github repository you created earlier.
The only setting you need to update is the environment variables, add the same ones you added to your .env file (pro tip: you can copy the .env file and paste it into the environment variables section).

Now click deploy, and your app will be live!

# Technical Decisions

I will now go into detail about the technical decisions I made when creating this stack.

### Typescript

Typescript is a non-negotiable for me. If you are writing anything bigger than a 10 line script, you should be using typescript, period.

## Frontend

### React

React is the most popular frontend library for a reason. Composition, declarative syntax, and a huge ecosystem make it a no-brainer.

### Vite

Vite is the standard for frontend tooling.

### Tailwind

Tailwind is **the** way to write css. Atomic classes make it easy to write css that is performant and maintainable. It goes very well with React's component model as well.

[Not convinced?](https://youtu.be/5MKw-wOpJR8?si=S0YwYCK7SPbmsBHe)

### Tanstack Router

Every app needs a router, and [Tanstack Router](https://tanstack.com/router/latest) is the most modern and inovative router out there. It pushes typesafety to the max and is super easy to use. It also has first class support for file based routing, which is pretty nice. Read more about it [here](https://tanstack.com/router/latest/docs/framework/react/overview).

## Backend

### Hono

[Hono](https://hono.dev/) is the modern express and designed for serverless. It is fast, easy to use, and has a bunch of built in helpers.

### Drizzle

[Drizzle](https://drizzle.dev/) is a modern ORM for typescript. It has a fully type safe api which is a joy to use. It's schema management solution, `drizzle-kit`, means that schema changes happen in code then are simply 'pushed' to the database.

### Sqlite/Libsql/Turso

SQL/relational data modeling is really good and an important skill to have. The best part about using sqlite/libsql/[turso](https://turso.tech/) is that how easy it is to switch between a local database (that is literally just a file) and a hosted database.

Turso also has a generous free tier, so you can host 500 databases for free!

## Other

### Vercel

Hosting on Vercel is really a fantastic experience. Generous free tier, dead simple to setup, and after that just push to deploy. PRs create "preview" deployments, which get their own unqiue domain so you can test changes before merging. It also keeps a history of all deployments, so you can easily rollback with a single click.

### Vinxi / Nitro

Vinxi is what enables the project to have both a frontend project, and a backend server all in one application. This is a huge win as it means that deployments happen all at once. It also means sharing code between the frontend and backend is super easy.

### Auth

`todo!()` (there are a couple options here- honestly wouldnt be opposed to rolling it ourselves with [Lucia](https://lucia-auth.com/))

# Project Structure

## Shared

This is where code that is shared between the frontend and backend lives. The most interesting thing here is the `env` part which uses a package to zod validate the environment variables.

## Server

The server entry point is `./server/index.ts`. From there the request is passed to the Hono app, which has all of the handlers.

The database client is created in `./server/db/index.ts`, and the database schema is defined in `./server/db/schema.ts`.

## Frontend

The frontend entry is `./index.html`, which loads the `./client/index.tsx` file. This is the main react entry point.

The router root is in `./client/routes/__root.tsx`, and the routes are defined in the `./client/routes` folder.
For more info see the [Tanstack Router Docs](https://tanstack.com/router/latest/docs/framework/react/guide/file-based-routing)

All public assets are in the `./public` folder. These are served statically by the server.

In the `./client/components/ui` are the [shadcn](https://ui.shadcn.com/) ui components used in the demo app.
