# UF SASE Stack RFC

In this document we will outline the tech stack for the UF SASE Website and the reasoning behind each technology.

The first proposal was created by Ethan found [here](https://gist.github.com/ethanniser/def2c9663840278591a7f10a9f9c78b2) (the GOAT🐐) and modified by our 2024-2025 Webmaster Ricky(GOAT 2🐐), which can be found in the same link. 

## Table of Contents

- [UF SASE Stack RFC](#uf-sase-stack-rfc)
  - [Table of Contents](#table-of-contents)
  - [Design Goals](#design-goals)
  - [Languages](#languages)
    - [Why Typescript?](#why-typescript)
    - [Why Typescript on the Server?](#why-typescript-on-the-server)
    - [Modern web apps are written in Typescript](#modern-web-apps-are-written-in-typescript)
  - [Fullstack Meta-Framework](#fullstack-meta-framework)
    - [Why we are not using an existing meta-framework](#why-we-are-not-using-an-existing-meta-framework)
    - [Vinxi](#vinxi)
    - [Backend Router](#backend-router)
    - [Frontend Framework](#frontend-framework)
    - [Frontend Router](#frontend-router)
  - [Runtime](#runtime)
  - [Styling](#styling)
  - [Persistence](#persistence)
    - ["ORM"](#orm)
    - [Sqlite in Production](#sqlite-in-production)
  - [Authentication](#authentication)
  - [Email](#email)
  - [Image Storage](#image-storage)
  - [Deployment](#deployment)
  - [Conclusion](#conclusion)

## Design Goals

When creating this stack I had a couple goals in mind:
1. Choose technologies that are either:
	- industry-applicable themself, or
	- teach industry-applicable skills/concepts
2. Avoid technologies (even good ones) which abstract so much as to inhibit learning to those unfamiliar with the underlying web concepts
	- The best example here is server functions / RPC (such as tRPC). While tRPC is excellent, I would be concerned that for someone who does not know what an http request is, tRPC is a bit too *magic*
	- The closest thing to *magic* in the stack is the TanStack Router codegen for the file-based routing. I think this is justified by the improved experience of file based routing, learning file based routing as a concept (very common is most modern frameworks), and the generated code is git tracked and human-readable so you can inspect what is going on if one chooses too.
3. 1 and 2 beside, choose the best and most modern technologies available

## Languages

The stack is fully written in **[Typescript](https://www.typescriptlang.org/docs/)**.

If you want to write client side web apps, you have to write Javascript. However, modern development overwhelmingly favors TypeScript, a statically typed superset of JavaScript that offers a robust type system and powerful development tools.

### Why Typescript?
JavaScript is hard. Why add more rules?

The experience TypeScript provides will help you be a better developer. Whether you're new to web development or a seasoned pro, the "strictness" of TypeScript will provide a less frustrating, more consistent experience than vanilla JS

**1. A whole class of basic bugs is entirely eliminated**
TypeScript's strong type system catches type errors at compile time, rather than at runtime. 

This doesn't mean you code is all of the sudden bug free, but it means that an entire category of very simple and obvious bugs can be entirely avoided.

- **Example**: When fetching data from an api, Typescript will force you to check that the json you get back matches the structure you are expecting, instead of blindly letting you read properties of the object (which often leads to errors such as `Uncaught TypeError: Cannot read properties of undefined (reading 'bar')`)

**2. Improved Developer Experience**

TypeScript significantly enhances the developer experience, making code more readable, maintainable, and easier to refactor.

- **Stronger Autocomplete and Intellisense**: Editors like VSCode can leverage TypeScript’s type system to provide intelligent autocompletion, suggesting only known methods and properties for a given type. This reduces guesswork and speeds up development.
    
- **Increased Readability**: With TypeScript, hovering over variables, functions, and objects shows their types, allowing you to understand how data flows through your application without constantly checking documentation or digging through code.
    
- **Refactoring Confidence**: Renaming variables, restructuring code, and changing data shapes is far less risky because TypeScript ensures that all instances are correctly updated. TypeScript's tooling will catch inconsistencies immediately, giving you confidence in refactoring.

Typescript also has very powerful type **inference**, meaning the vast majority of your code does not need to have any type annotations at all! ([see more](https://www.youtube.com/watch?v=RmGHnYUqQ4k&t=806s&pp=ygUgdGhlbyB5b3VyIHVzaW5nIHR5cGVzY3JpcHQgd3Jvbmc%3D))

### Why Typescript on the Server?

If you are forced to use Typescript on the frontend, there are many benefits to using the same language on the backend.

1. Code and types can be shared between the frontend and backend
2. Deployment and tooling can be shared between the frontend and backend
3. Contributors only have to learn 1 language

### Modern web apps are written in Typescript

Typescript [won](https://www.youtube.com/watch?v=EUlM3wx546o&t=302s&pp=ygUSd2h5IHR5cGVzY3JpcHQgd29u), and for good reason- it is an excellent language and one that will greatly benefit you to learn.

## Fullstack Meta-Framework

"Fullstack Meta-Frameworks" are all of the rage these days, with options including: Next.js and Remix for React, Nuxt for Vue, SvelteKit for Svelte, SolidStart for Solid and more.

Such frameworks, at their core, provide a couple key things:

- A frontend framework
- A frontend router
- A backend server (and router)
- A unified frontend/backend project structure (client and server in one project)
\
This enables additional code sharing between client and server as well as unified deployment.

### Why we are not using an existing meta-framework
I chose to not use an existing meta-framework for our stack for two main reasons:

1. Current meta-frameworks are very bloated and have lots of abstractions that are not the simplest to understand (goal 2)
2. It is possible to creation our own "meta-framework" from scratch very easily with 90% of the same features, but much more composable, understandable, and universal. (goals 1 and 2)

### Vinxi

[Vinxi](https://vinxi.vercel.app/) is the tool that enables use to "create" our own meta-framework. It builds on top of [Vite](https://vitejs.dev/), an excellent, but frontend only, development server and build tool, by allowing you to compose your frontend Vite app with a [nitro](https://nitro.unjs.io/) http server seamlessly. 

This right away gives us most of the benefits of the popular meta-frameworks, but with some a unique benefit for our use case: the server has a clear separation from the frontend app.
- This means that if we ever want to migrate off of Vinxi, it is trivial to run the server as its own separate app.
- It also means that there is a much more clear client/server separation, which is somewhat important for us as we have dedicated "frontend" and "backend" teams.

### Backend Router

Our server starts as a barebones [nitro](https://nitro.unjs.io/) event handler, which can easily be convert to a web-standard `Request -> Response` function. From there, there were two options I considered.

The first was [`itty-router`](https://itty.dev/itty-router/). Itty router's selling point is its minimal bundle size which isn't really a priority for us. So the other option, [hono](https://hono.dev/), which has more features made more sense to me.

Hono is very popular, extremely portable (again means it very easy to move our server anywhere if needed), has lots of built in helpers and middlewares, and a large ecosystem.

Hono is basically the [modern express](https://hono.dev/docs/concepts/motivation#motivation), and will take care of all of our backend needs.

### Frontend Framework

Now, we need a client side framework. While there are may great options these days (and I encourage you to check them (solid, svelte, vue in that order) out and understand their unique pros and cons), I have chosen React.

React is the most popular frontend framework for good reason. It has the largest ecosystem, a excellent compositional modal, and "wrapper-free" state management. React is also so common in industry, I think it would be against goal 1 for us not to choose it.

### Frontend Router

Now we have two of the three core pieces of a meta-framework, all that's left is the client side router. 

I have chosen TanStack router. For those unfamiliar, the "TanStack" is a set of excellent frontend libraries lead by Tanner Lindsey. TanStack router is the newest and most innovative frontend router and provides clear benefits over the two main existing options for React (next.js and remix/react router) in typesafety and overall developer experience. The TanStack docs go very in depth into why TanStack router exists, why its built the way it is, and how it is an improvement over other routers. See: [Overview](https://tanstack.com/router/latest/docs/framework/react/overview), [Comparison](https://tanstack.com/router/latest/docs/framework/react/comparison), and [Decisions on DX](https://tanstack.com/router/latest/docs/framework/react/decisions-on-dx) 

One of the really cool things about TanStack router is its powered by a Vite plugin. It also has an accompanying "fullstack meta-framework" called TanStack Start, which is also just some code and a Vite plugin. This means that we can use just the parts we want (SSR) without the parts we dont (single client+server router and server functions), while at the same time making it super easy to add those things in if we decide we want them at some point! 

A good example is SSG (or static site generation) which we will likely use. Because TanStack Start is based on Vinxi, which is based on Nitro, which supports prerendering, the way it does SSG is just by using nitro. This means we can do SSG the exact same way trivially in our nitro config- so cool, Vinxi is awesome.

## Runtime

We use [Bun](https://bun.com/) as our runtime, which handles all code execution, as a replacement to Node. But it is also a bundler, transpiler, package manager, etc. with a whole suite of tools that are a unified improvement over many npm dependencies we would otherwise need to install and configure separately. Like many other frameworks we are using, it is rewritten in a low-level language to make it much faster at everything.

Bun aims for 100% node compatibility, and there were some hurdles in migrating from to 1.1 to 1.2 with breaking changes, but it is an almost universally better pick.

## Styling

I have chosen TailwindCSS as the CSS framework for our stack.

CSS as a language is all about *impurity*. This is by it's own definition- styles "cascade". The problem is that in a large project this quickly becomes very, very difficult to maintain. The isolated component model is an extremely powerful concept, but when paired with global css rules it can start to break down. When you change a css rule in a .css file, you have very little insight onto just how many things have become affected by that change. Standard CSS also requires a lot of arbitrary naming and conventions like BEM, which is bad? 

Tailwind is different.

In Tailwind, you apply styles by adding atomic "utility classes" to html elements. Tailwind is deeply thought through and has very strong defaults and primitives, while also being highly customizable.

It will take some getting used to but I promise the benefits are seriously worth it.

For those still not convinced or curious:
- From the creator of Tailwind on the failures of traditional CSS: [CSS Utility Classes and "Separation of Concerns"](https://adamwathan.me/css-utility-classes-and-separation-of-concerns/)
- From YouTuber Theo on his journey to Tailwind: [My Tailwind Journey - Theo](https://youtu.be/5MKw-wOpJR8?si=-psKW3k9nN71cxR8)
- From Theo comparing many different CSS Solutions (including Tailwind): [Comparing Modern CSS Solutions (Tailwind vs MUI vs Bootstrap vs Chakra vs...) - Theo](https://youtu.be/CQuTF-bkOgc?si=qvHH5DapIO4ii7Jk)

## Persistence

Most apps end up needing some kind of persisted database. There are countless options to choose from here, each with their own pros and cons. Something I feel quite strongly about is that we should use a SQL database (goal 1). SQL is extremely common in industry, and learning how to model data through relations, and generally the SQL syntax is very valuable.

From there, I think [sqlite](https://sqlite.org/) is the SQL database that makes the most sense for us to use. For those unfamiliar, sqlite is the ["most widely deployed and used database engine"](https://sqlite.org/mostdeployed.html). One of the coolest parts about sqlite, which separates it from almost all other SQL databases, is the database itself is just a file. So just like an other file you can easily copy it, send it to a friend, back it up, etc. This is really powerful for local development- no need to spin up docker containers or anything, each developer has their own database right in their filesystem.

### "ORM"

For interacting with our database from Typescript I have selected [drizzle](https://orm.drizzle.team/). Drizzle is sort of halfway between a more abstracted ORM like [Prisma](https://www.prisma.io/orm), and directly writing raw SQL. 

Drizzle's main benefit is it's typesafety. In drizzle, you define your database schema as code, enabling the types of the columns to be derived for queries. This means that queries (even complex ones with joins and such) come back fully typed with zero validation required.

Drizzle's query syntax also closely model's raw sql:
```ts
const result = await db
	.select({ id: users.id, name: users.name})
	.from(users)
	.leftJoin(todos, eq(todos.userId, users.id))
	.where(eq(users.id, 10))
```
```sql
SELECT users.id, users.name
FROM users
LEFT JOIN todos ON todos.userId = users.id
WHERE users.id = 10;
```

This means that you will learn the sql structure and syntax, even while using a "orm" (goal 1)!

Drizzle also has a migration toolkit called `drizzle-kit`, which manages schema migrations. Because our schema is defined in code, we do not need to [deal with complex migration setups](https://www.youtube.com/watch?v=jeWrbAiA1D0&pp=ygUPdGhlbyBtaWdyYXRpb25z). Instead, it's as easy as `drizzle-kit db push` to push the schema in code to the database.

Also check out drizzle's very well written [Why Drizzle?](https://orm.drizzle.team/docs/overview#why-sql-like) page.

### Sqlite in Production

While having a local file as your database is very convenient for local development, it is less ideal for a app deployed via [serverless](#deployment). This is where [Turso](https://turso.tech/) comes in.

Turso is a database company that provides cloud hosted, edge replicated sqlite via their sqlite compatible fork of sqlite, libsql.

With Turso, when we deploy to production, it's as easy as changing a single environment variable from a local file path to a remote URL

Turso has a [very generous free plan](https://turso.tech/pricing). You can create up to 500 unique databases, with up to 9GB of storage (that is a ton, sql data is very small), as well as provides point-in-time restore up to 1 day in the past. 

(I also know the founder and CEO personally he is a really nice guy)

## Authentication

There are many options for user authentication. Most of these are hosted services, which can often be expensive (doesn't mean they aren't good- [Clerk](https://clerk.com/) is excellent). However, the free option, "rolling our own auth", also has the benefit of teaching us how user authentication actually works (goal 1 and 2).

We currently implement auth manually by tracking roles and sessions in our database, using bcrypt for hashing, using google login, etc. If more user state and validation is desired (highly likely since account functionality is greatest area for expansion), we naturally might want to move to a formal library.

However, an issue with many auth libraries is that they abstract too much, which goes against the design goals stated above. This should be a point of discussion; but if going with a library I might suggest [Better-auth](https://hono.dev/examples/better-auth), which I have not used but seems to match alright.

## Email

We use [Resend](https://resend.com/) as our email provider. Resend is a modern, developer-friendly service with strong TypeScript support and an API-first design, which makes it easy to integrate into our backend. It handles the complexity of deliverability (SPF, DKIM, bounce handling) so we don’t need to manage that ourselves, and its generous free tier of 3,000 emails per month is more than enough for our current needs. Emails can be sent using either raw HTML or through [React Email](https://react.email/), which allows us to create reusable and consistent templates.

For setup, Resend is authenticated with an API key stored in environment variables. Currently, we use it for sending account password reset verifications, but the integration can easily be expanded if more automated email functionality is needed.  

There are a few considerations to keep in mind. To send emails from our official domain (`@ufsase.com`), we need to complete domain verification with SPF and DKIM records; until then, the sandbox domain can be used for testing. Additionally, while the free tier is generous, we should monitor usage if email volume grows. Finally, because Resend uses standard APIs, I suggest migrating to another provider (such as Postmark or SendGrid) if our needs change in the future.

## Image Storage
Shipping with a lot of locally stored images increases the site's bundle size, which is not ideal since we have a limited amount that can be served from Vercel. So, we store less accessed images, such as those in a gallery, in [UploadThing](https://uploadthing.com/), and then get them with a request when needed. It is not particularly special, but it does have good developer experience.

Also, generally we should be somewhat wary of resource usage (ex load lazy when possible, though most optimizations are applied automatically). I encourage use of standard image sizes, and even with more blogs and user-added media we should not use a CMS for above reasons.

## Deployment

I have chosen [Vercel](https://vercel.com) as our deployment platform (at least to start, like I have mentioned our setup is very portable and we can theoretically deploy in many ways with many providers).

Vercel provides an excellent development experience. It is 1 click to connect a new project, and then from there just push to deploy. 

Vercel automatically creates "preview" deployments for all pushes to non-main branches. These are a complete production build of the app, just with their own unique domain. This makes it very easy to see what changes look like in production before merging. 

Our static assets (js bundles, html files, css files, and pubic assets) will be served on Vercel's edge CDN, and our server will be a Vercel edge function. An edge function is a serverless function that runs on Vercel's edge runtime. For those unfamiliar, serverless computing is a model of running servers via ephemeral request response handlers. Basically, you write a function from request to response. When a request to your app is made, a new instance of that function is created, running that code and returning the response. After the function finishes its execution, it is "killed". This enables so called "scale to zero", where when no one is using your app, you don't pay for anything. It also enables much higher scaling under heavy loads, as many of these function instances can be created in parallel.

For our use case most of this doesn't really matter, the big thing is that serverless is really easy, convenient, and most importantly, cheap.

If we ever want to move off Vercel, this can easily be done with a single change in nitro config to one of the [many providers with a built-in preset](https://nitro.unjs.io/deploy).

[Somewhat related video if your curious](https://youtu.be/2Z4fZtSKlcE?si=scUdiHOhZGBQqG7K)

## Conclusion

Hopefully you found this helpful or interesting! You're free to suggest changes/additions to any layer of the stack; it's pretty easy to read about their features online, but takes time to develop a deeper understanding of the pros/cons for a particular use case like ours. 
We'll also be keeping this proposal as updated as possible as we migrate to different technologies. Again huge thanks to Ethan and Ricky for creating the proposal!

Have any questions? Reach out to us!