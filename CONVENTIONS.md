## Dependency Graph

###

#### Shared/schema

- Used in all layers to validate schema (basically provide types for everything).

---

```
+---------------+       +-----------------+       +-----------------+       +-----------------+       +-------------------+
| Database      | ----> | Server API      | ----> | Server Routing  | ----> | Client API      | ----> | React Query Hooks |
| (server/db)   |       | (server/api)    |       | server/index.ts |       | (client/api)    |       | (client/hooks)    |
+---------------+       +-----------------+       +-----------------+       +-----------------+       +-------------------+
        ^                     ^                                                  ^                          ^
        |                     |                                                  |                          |
        +-----------------------+------------------------+----------------------+---------------------------+
                                      Shared Schema (src/shared/schema)
```

#### Database Layer

- **Example:** `export const users = sqliteTable("user"...)`
- **Description:** Handles operations directly with the database, such as the schema (ex)

#### Server API Layer

- **Example:** `userRoutes.get("/users/:id", async (c) => { ... }`
- **Description:** Contains core server-side API logic (e.g., `getAllBlogs`, `createBlog`, `updateBlog`).

#### Server Routing

- **Example:** `app.route("/api", userRoutes)`
- **Description:** Maps routes -> API endpoints.

#### Client Library

- **Example:** `export const fetchUser = async (id: string): Promise<SelectUser> => { ... }`
- **Description:** Encapsulates API calls with standard handling

#### React Query Hooks

- **Example:** `export const useUsers = (userId: string) => { ... }`
- **Description:** Provides state management and caching for easy and efficient use`.

---

### Client Structure

#### Entry Point

- **Path:** `/index`
- **Description:** Main entry point for the application.

#### Assets

- Two methods for serving images:
  - **Locally:** For images requiring fast loading.
  - **Remotely (UploadThing):** For non-critical images (e.g., gallery).
- **Standardized Image Sizes:**
  - Thumbnails: `300x200`
  - Gallery: `800x600`
  - Full banners: `1920x1080`
  - Mobile banners: `768x432`
- **Optimization Steps:**
  - Download image information to `image_data.json`.
  - Run `generateImageMaps` with `bun generate`.

#### Components

- **Structure:** Organized by page name folders under `/components`.
  - **Reusable Components:** Place in `/ui` (e.g., ShadCN components).
  - **Generic Components:** Include items like `page`, `modal`, `notfound`, etc.

#### Hooks

- **Location:** `client/hooks`
- **Description:** Wraps API calls from `libapi` with `useQuery` for effective caching and state management.

#### Lib

- **Location:** `client/lib`
- **Description:** Encapsulates database queries.

#### Routes

- **Location:** `client/routes`
- **Description:** Full pages with client-side routing.
  - **Root Component:** `__root.tsx` (shared navbar wrapper).

#### Utils

- **Location:** `client/utils`
- **Description:** Contains commonly used and repeated code.

#### Tests

- **Location:** `client/tests`
- **Description:** Test-related code.

#### Authentication

- **Location:** `client/auth`
- **Description:** Consolidates authentication logic.
  - **TODO:** Delete duplicate logic and transition to the layered approach.

---

#### API Response Format

- **Success:**
  ```json
  {
      "data": { ... },
      "message": "...",
      "meta": { ... } // e.g., pagination
  }
  ```
- **Error:**
  ```json
  {
      "error": {
          "errCode": ...,
          "errMsg": ...
      }
  }
  ```

---

### Server Structure

#### API

- **Location:** `src/server/api`
- **Description:** Core logic for interacting with the database.

#### DB

- **Location:** `src/server/db`
- **Description:**
  - `index.ts`: Sets up and exports the database.
  - `tables.ts`: Defines schemas as code (SQL).
- **Usage:** Use `db:all` for database operations. See specific commands in package.json for more details.

---

### Shared Structure

#### Schema

- **Location:** `src/shared/schema`
- **Description:** Validates the schema for everything (similar to TypeScript types).

---

### Root Structure

#### Files

- **`index.ts`**: Entry point for all `/api/...` requests.
- **`.env`**: Environment variables (create manually).
- **`index.html`**: Client entry point and favicon definition.
- **Config Files:** Typical setup stuff.

---

### Tailwind Guidelines

#### General Rules

- **Commit to Tailwind!** Yes, it has a bit of a learning curve (I promise it’s worth it).
- You can do so much in Tailwind; it’s very powerful.
- Have a Tailwind cheatsheet [https://nerdcave.com/tailwind-cheat-sheet](https://nerdcave.com/tailwind-cheat-sheet) up while you're learning to find the classes for CSS rules you already know.
- Learn the common pseudoselectors [https://tailwindcss.com/docs/hover-focus-and-other-states#pseudo-classes](https://tailwindcss.com/docs/hover-focus-and-other-states#pseudo-classes) like `hover:`, `disabled:`, `sm:`, `md:`, `lg:`.

#### Avoid Margins

- **AVOID MARGIN**.
- Margin really breaks component composition because it makes components affect the things around them.
- If you need to space things, do it external to the element/component with little spacer elements:
  <div className="py-10"></div>

#### Dynamic Classes

- Tailwind knows what classes to ship to the browser by scanning your source code to look for known class strings.
- This means if you do `py-${n}`, it will not be able to statically detect what classes you might use.
- **Solution:** Statically define all of the classes you might use in variables or an object or something, and conditionally enable them.
- Prefer `clsx` or the `cn` helper in utils over raw template strings.

#### Prohibitions

- **Do not use `@apply`.**
- Doing so basically forfeits all of the benefits of Tailwind.

#### Documentation

- Like with anything, **read the docs!** [https://tailwindcss.com/docs/installation](https://tailwindcss.com/docs/installation).
- Tailwind is deeply thought through, and the docs are excellent.

### UI/UX Guidelines

- **Idk TBD**
- **Consistency:** Maintain existing design and font conventions.
- **Image Standards:** Decide standardized sizes and document them in Figma.
- **Icon Usage:** Copy the span for Tailwind CSS in Iconify and modify using Tailwind classes.

---

### TODOs (temp)

1. Optimize images and decide on standardized sizes.
2. Remove redundant UI libraries; adopt Tailwind with Radix UI.
3. Inspect the naming of everything
4. Move all CSS to `tailwind.config.css` for standardization.
5. Fix all the backend implementationn (users routes = example of correct)
6. Delete duplicate authentication logic and transition to layered implementation.
