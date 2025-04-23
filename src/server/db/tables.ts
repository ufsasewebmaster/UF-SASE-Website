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
  timeAdded: integer("time_added", { mode: "timestamp" })
    .notNull()
    .$defaultFn(() => new Date()),
  timeUpdated: integer("time_updated", { mode: "timestamp" })
    .notNull()
    .$onUpdateFn(() => new Date()),
  points: integer("points"),
});

// Session table
export const sessions = sqliteTable("session", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expiresAt: integer("expires_at").notNull(),
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
  userId: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  role: text("role")
    .notNull()
    .references(() => roles.name)
    .default("user"),
});

// Personal Info table
export const personalInfo = sqliteTable("personal_info", {
  userId: text("user_id")
    .primaryKey()
    .references(() => users.id, { onDelete: "cascade" }),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  bio: text("bio").notNull().default(""),
  phone: text("phone").notNull().default(""),
  discord: text("discord").notNull().default(""),
  areaCode: text("area_code").notNull().default(""),
});

// Professional Info table
export const professionalInfo = sqliteTable("professional_info", {
  userId: text("user_id")
    .primaryKey()
    .references(() => users.id, { onDelete: "cascade" }),
  resumePath: text("resume_path"),
  linkedin: text("linkedin"),
  portfolio: text("portfolio"),
  majors: text("majors"),
  minors: text("minors"),
  graduationSemester: text("graduation_semester"),
});

// SASE Info table
export const saseInfo = sqliteTable("sase_info", {
  userId: text("user_id")
    .primaryKey()
    .references(() => users.id, { onDelete: "cascade" }),
  eventsAttended: text("events_attended"),
  groups: text("groups"),
});

// Events table
export const events = sqliteTable("event", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => generateIdFromEntropySize(10)),
  name: text("name").notNull().unique(),
  description: text("description"),
  timeAdded: integer("time_added", { mode: "timestamp" })
    .notNull()
    .$defaultFn(() => new Date()),
  timeUpdated: integer("time_updated", { mode: "timestamp" })
    .notNull()
    .$onUpdateFn(() => new Date()),
  location: text("location").notNull(),
  startTime: integer("start_time", { mode: "timestamp" }).notNull(),
  endTime: integer("end_time", { mode: "timestamp" }).notNull(),
  involvedGroups: text("involved_groups"),
  slidesUrl: text("slides_url"),
});

// Blogs table
export const blogs = sqliteTable("blog", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => generateIdFromEntropySize(10)),
  title: text("title").notNull().unique(),
  content: text("content").notNull(), // Assuming markdown content
  authorId: text("author_id").references(() => users.id),
  publishedDate: integer("published_date", { mode: "timestamp" })
    .notNull()
    .$defaultFn(() => new Date()),
  timeUpdated: integer("time_updated", { mode: "timestamp" })
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
  blogId: text("blog_id").references(() => blogs.id, { onDelete: "cascade" }),
  tagId: text("tag_id").references(() => blogTags.id),
});

// Mentor/Mentee Relationship table
export const mentorMenteeRelationship = sqliteTable("mentor_mentee_relationship", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => generateIdFromEntropySize(10)),
  mentorId: text("mentor_id").references(() => users.id, { onDelete: "cascade" }),
  menteeId: text("mentee_id").references(() => users.id, { onDelete: "cascade" }),
});

export const mentorMenteeInvites = sqliteTable("mentor_mentee_invites", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => generateIdFromEntropySize(10)),
  mentorId: text("mentor_id").references(() => users.id, { onDelete: "cascade" }),
  menteeId: text("mentee_id").references(() => users.id, { onDelete: "cascade" }),
});

export const emailSubscribers = sqliteTable("email_subscriber", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => generateIdFromEntropySize(10)),
  email: text("email").notNull().unique(),
  name: text("name"),
  subscribedAt: integer("subscribed_at", { mode: "timestamp" })
    .notNull()
    .$defaultFn(() => new Date()),
});

export const meetingSlides = sqliteTable("meeting_slides", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => generateIdFromEntropySize(10)),
  category: text("category").notNull(),
  name: text("name").notNull(),
  date: integer("date", { mode: "timestamp" }).notNull(),
  semester: text("semester").notNull(),
  thumbnailUrl: text("thumbnail_url").notNull().unique(),
  embedUrl: text("embed_url").notNull().unique(),
});
