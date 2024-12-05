import { blob, integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { generateIdFromEntropySize } from "lucia";

// Here we define our database schema as code
// https://orm.drizzle.team/docs/column-types/sqlite

/*
TEMPLATE FOR NEW TABLES
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

// Users table
export const users = sqliteTable("user", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => generateIdFromEntropySize(10)), // Required by lucia
  username: text("username").notNull().unique(), // Required by lucia
  password_hash: text("password_hash").notNull(), // Required by lucia

  time_added: integer("time_added", { mode: "timestamp" })
    .notNull()
    .$defaultFn(() => new Date()),
  time_updated: integer("time_updated", { mode: "timestamp" })
    .notNull()
    .$onUpdateFn(() => new Date()),
  points: integer("points"),
  roles: text("roles"),
});

// Session table
export const sessions = sqliteTable("session", {
  id: text("id").primaryKey(),
  user_id: text("user_id")
    .notNull()
    .references(() => users.id),
  expires_at: integer("expires_at").notNull(),
});

// Personal Info table
export const personalInfo = sqliteTable("personal_info", {
  user_id: text("user_id")
    .primaryKey()
    .references(() => users.id),
  first_name: text("first_name").notNull(),
  last_name: text("last_name").notNull(),
  email: text("email").notNull().unique(),
  phone: blob("phone", { mode: "bigint" }).unique(), // NOTE: Phone is bigint
  area_code: integer("area_code"),
});

// Professional Info table
export const professionalInfo = sqliteTable("professional_info", {
  user_id: text("user_id")
    .primaryKey()
    .references(() => users.id),
  resume_path: text("resume_path"),
  linkedin: text("linkedin"),
  portfolio: text("portfolio"),
  majors: text("majors"),
  minors: text("minors"),
  graduation_semester: text("graduation_semester"),
});

// SASE Info table
export const saseInfo = sqliteTable("sase_info", {
  user_id: text("user_id")
    .primaryKey()
    .references(() => users.id),
  events_attended: text("events_attended"),
  mentors: text("mentors"),
  mentees: text("mentees"),
  groups: text("groups"),
});

// Events table
export const events = sqliteTable("event", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => generateIdFromEntropySize(10)),
  name: text("name").notNull().unique(),
  description: text("description"),
  time_added: integer("time_added", { mode: "timestamp" })
    .notNull()
    .$defaultFn(() => new Date()),
  time_updated: integer("time_updated", { mode: "timestamp" })
    .notNull()
    .$onUpdateFn(() => new Date()),
  location: text("location").notNull(),
  start_time: integer("start_time", { mode: "timestamp" }).notNull(),
  end_time: integer("end_time", { mode: "timestamp" }).notNull(),
  involved_groups: text("involved_groups"),
});

// Blogs table
export const blogs = sqliteTable("blog", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => generateIdFromEntropySize(10)),
  title: text("title").notNull().unique(),
  content: text("content").notNull(), // Assuming markdown content
  author_id: text("author_id").references(() => users.id),
  published_date: integer("published_date", { mode: "timestamp" })
    .notNull()
    .$defaultFn(() => new Date()),
  time_updated: integer("time_updated", { mode: "timestamp" })
    .notNull()
    .$onUpdateFn(() => new Date()),
  last_update_date: integer("published_date", { mode: "timestamp" })
  .notNull()
  .$defaultFn(() => new Date()),
  tags: text("tags"),
});

// Blog Tags table
export const blogTags = sqliteTable("blog_tag", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => generateIdFromEntropySize(10)),
  name: text("name").notNull().unique(),
});

// Blog Tag Relationship table
export const blogTagRelationship = sqliteTable("blog_tag_relationship", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => generateIdFromEntropySize(10)),
  blog_id: text("blog_id").references(() => blogs.id),
  tag_id: text("tag_id").references(() => blogTags.id),
});

// Mentor/Mentee Relationship table
export const mentorMenteeRelationship = sqliteTable("mentor_mentee_relationship", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => generateIdFromEntropySize(10)),
  mentor_id: text("mentor_id").references(() => users.id),
  mentee_id: text("mentee_id").references(() => users.id),
});

export const emailSubscribers = sqliteTable("email_subscriber", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => generateIdFromEntropySize(10)),
  email: text("email").notNull().unique(),
  name: text("name"),
  subscribed_at: integer("subscribed_at", { mode: "timestamp" })
    .notNull()
    .$defaultFn(() => new Date()),
});
