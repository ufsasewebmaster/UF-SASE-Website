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
  created_at: integer("created_at", { mode: "timestamp" })
    .notNull()
    .$defaultFn(() => new Date()),
  updated_at: integer("updated_at", { mode: "timestamp" })
    .notNull()
    .$onUpdateFn(() => new Date()),
  email: text("email").notNull().unique(),
  phone: blob("phone", { mode: "bigint" }).unique(),
  area_code: integer("area_code"),
  graduation_semester: text("graduation_semester"),

  points: integer("points"),
  roles: text("roles"),
  dateAdded: integer("date_added").notNull(),
  dateLastUpdate: integer("date_last_update"),
});

// Session table
export const sessions = sqliteTable("session", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => users.id),
  expiresAt: integer("expires_at").notNull(),
});

export const personalInfo = sqliteTable("personal_info", {
  userID: text("userID")
    .primaryKey()
    .references(() => users.id),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  emails: text("emails").notNull(),
  phoneNumber: integer("phone_number"),
  phoneCountryCode: integer("phone_country_code"),
});

export const professionalInfo = sqliteTable("professional_info", {
  userID: text("userID")
    .primaryKey()
    .references(() => users.id),
  resumePath: text("resume_path"),
  linkedin: text("linkedin"),
  portfolio: text("portfolio"),
  majors: text("majors"),
  minors: text("minors"),
  graduationSemester: text("graduation_semester"),
});

export const saseInfo = sqliteTable("sase_info", {
  userID: text("userID")
    .primaryKey()
    .references(() => users.id),
  eventsAttended: text("events_attended"),
  mentors: text("mentors"),
  mentees: text("mentees"),
  groups: text("groups"),
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
  location: text("location").notNull(),
  startTime: integer("start_time", { mode: "timestamp" }).notNull(),
  endTime: integer("end_time", { mode: "timestamp" }).notNull(),
  involvedGroups: text("involved_groups"),
});

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
  updated_at: integer("updated_at", { mode: "timestamp" })
    .notNull()
    .$onUpdateFn(() => new Date()),
  lastUpdateDate: text("last_update_date"),
  tags: text("tags"),
});

export const blogTags = sqliteTable("blog_tag", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => generateIdFromEntropySize(10)),
  name: text("name").notNull().unique(),
});

// Blog tag relationship table
export const blogTagRelationship = sqliteTable("blog_tag_relationship", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => generateIdFromEntropySize(10)),
  blogId: text("blog_id").references(() => blogs.id),
  tagId: text("tag_id").references(() => blogTags.id),
});

// Mentor/Mentee relationship table
export const mentorMenteeRelationship = sqliteTable("mentor_mentee_relationship", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => generateIdFromEntropySize(10)),
  mentorId: text("mentor_id").references(() => users.id),
  menteeId: text("mentee_id").references(() => users.id),
});

