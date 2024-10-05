import { blob, integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { generateIdFromEntropySize } from "lucia";

// Here we define our database schema as code
// https://orm.drizzle.team/docs/column-types/sqlite

/*
TEMPLATE FOR NEW TABLES (not always needed just sometimes)
export const table = sqliteTable("table", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => generateIdFromEntropySize(10)),
  created_at: integer("created_at", { mode: "timestamp" })
    .notNull()
    .$defaultFn(() => new Date()),
  updated_at: integer("updated_at", { mode: "timestamp" })
    .notNull()
    .$onUpdateFn(() => new Date()),
});
*/

// temporary
export const todos = sqliteTable("todo", {
  id: integer("id").notNull().primaryKey({ autoIncrement: true }),
  title: text("title").notNull(),
  completed: integer("completed", { mode: "boolean" }).notNull(),
});

// For lucia: https://lucia-auth.com/database/drizzle
// https://lucia-auth.com/tutorials/username-and-password/astro
export const users = sqliteTable("user", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => generateIdFromEntropySize(10)), // https://lucia-auth.com/basics/users
  username: text("username").notNull().unique(), // required by lucia
  password_hash: text("password_hash").notNull(), // required by lucia
  created_at: integer("created_at", { mode: "timestamp" })
    .notNull()
    .$defaultFn(() => new Date()),
  updated_at: integer("updated_at", { mode: "timestamp" })
    .notNull()
    .$onUpdateFn(() => new Date()),
  email: text("email").notNull().unique(),
  phone: blob("id", { mode: "bigint" }).unique(),
  areaCode: integer("area_code"),
  graduationSemester: text("graduation_semester"),
});

// For lucia
export const sessions = sqliteTable("session", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => users.id),
  expiresAt: integer("expires_at").notNull(),
});

export const events = sqliteTable("event", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => generateIdFromEntropySize(10)),
  name: text("name").notNull().unique(),
  description: text("description"),
  created_at: integer("created_at", { mode: "timestamp" })
    .notNull()
    .$defaultFn(() => new Date()),
  updated_at: integer("updated_at", { mode: "timestamp" })
    .notNull()
    .$onUpdateFn(() => new Date()),
  location: text("location"),
  startTime: integer("start_time", { mode: "timestamp" }),
  endTime: integer("end_time", { mode: "timestamp" }),
});

export const blogs = sqliteTable("blog", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => generateIdFromEntropySize(10)),
  publishedDate: integer("created_at", { mode: "timestamp" })
    .notNull()
    .$defaultFn(() => new Date()),
  updated_at: integer("updated_at", { mode: "timestamp" })
    .notNull()
    .$onUpdateFn(() => new Date()),
  content: text("content").notNull(), // markdown
  title: text("title").notNull().unique(),
  authorId: text("author_id").references(() => users.id),
});

export const blogTags = sqliteTable("blog_tag", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => generateIdFromEntropySize(10)),
  name: text("name").notNull().unique(),
});

export const blogTagRelationship = sqliteTable("blog_tag_relationship", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => generateIdFromEntropySize(10)),
  blogId: text("blog_id").references(() => blogs.id),
  tagId: text("tag_id").references(() => blogTags.id),
});

export const mentorMenteeRelationship = sqliteTable(
  "mentor_mentee_relationship",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => generateIdFromEntropySize(10)),
    mentorId: text("mentor_id").references(() => users.id),
    menteeId: text("mentee_id").references(() => users.id),
  },
);
