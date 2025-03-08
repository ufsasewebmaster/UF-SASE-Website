import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { generateIdFromEntropySize } from "lucia";

// Here we define our database schema as code
// https://orm.drizzle.team/docs/column-types/sqlite

// Users table
export const users = sqliteTable("user", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => generateIdFromEntropySize(10)),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  email: text("email").notNull().unique(),
  time_added: integer("time_added", { mode: "timestamp" })
    .notNull()
    .$defaultFn(() => new Date()),
  time_updated: integer("time_updated", { mode: "timestamp" })
    .notNull()
    .$onUpdateFn(() => new Date()),
  points: integer("points"),
});

// Session table
export const sessions = sqliteTable("session", {
  id: text("id").primaryKey(),
  user_id: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expires_at: integer("expires_at").notNull(),
});

//Roles table
export const roles = sqliteTable("roles", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => generateIdFromEntropySize(10)),
  name: text("name").notNull().unique(),
});

//User Roles Relationship table
export const userRoleRelationship = sqliteTable("user_roles_relationship", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => generateIdFromEntropySize(10)),
  user_id: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  role: text("role")
    .notNull()
    .references(() => roles.name)
    .default("user"),
});

// Personal Info table
export const personalInfo = sqliteTable("personal_info", {
  user_id: text("user_id")
    .primaryKey()
    .references(() => users.id, { onDelete: "cascade" }),
  first_name: text("first_name").notNull(),
  last_name: text("last_name").notNull(),
  phone: text("phone"), // NOTE: Phone is bigint
  area_code: integer("area_code"),
});

// Professional Info table
export const professionalInfo = sqliteTable("professional_info", {
  user_id: text("user_id")
    .primaryKey()
    .references(() => users.id, { onDelete: "cascade" }),
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
    .references(() => users.id, { onDelete: "cascade" }),
  events_attended: text("events_attended"),
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
  slides_url: text("slides_url"),
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
  blog_id: text("blog_id").references(() => blogs.id, { onDelete: "cascade" }),
  tag_id: text("tag_id").references(() => blogTags.id),
});

// Mentor/Mentee Relationship table
export const mentorMenteeRelationship = sqliteTable("mentor_mentee_relationship", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => generateIdFromEntropySize(10)),
  mentor_id: text("mentor_id").references(() => users.id, { onDelete: "cascade" }),
  mentee_id: text("mentee_id").references(() => users.id, { onDelete: "cascade" }),
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

export const meetingSlides = sqliteTable("meeting_slides", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => generateIdFromEntropySize(10)),
  thumbnail_url: text("thumbnail_url").notNull().unique(),
  embed_url: text("embed_url").notNull().unique(),
  last_modified: integer("last_modified", { mode: "timestamp" }).notNull(),
});
