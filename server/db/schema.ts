import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

// Here we define our database schema as code

export const todos = sqliteTable("todo", {
  id: integer("id").notNull().primaryKey({ autoIncrement: true }),
  title: text("title").notNull(),
  completed: integer("completed", { mode: "boolean" }).notNull(),
});

export const users = sqliteTable("users", {
  userID: text("userID").notNull().primaryKey(),
  username: text("username").notNull(),
  passwordHash: text("passwordHash").notNull(),
  passwordSalt: text("passwordSalt").notNull(),
  dateAdded: integer("dateAdded").notNull(),
  dateLastUpdate: integer("dateLastUpdate"),
  points: integer("points"),
  roles: text("roles"),
});

export const personalInfo = sqliteTable("personalInfo", {
  userID: text("userID")
    .primaryKey()
    .references(() => users.userID),
  firstName: text("firstName").notNull(),
  lastName: text("lastName").notNull(),
  emails: text("emails").notNull(),
  phoneNumber: integer("phoneNumber"),
  phoneCountryCode: integer("phoneCountryCode"),
});

export const professionalInfo = sqliteTable("professionalInfo", {
  userID: text("userID")
    .primaryKey()
    .references(() => users.userID),
  resumePath: text("resumePath"),
  linkedin: text("linkedin"),
  portfolio: text("portfolio"),
  majors: text("majors"),
  minors: text("minors"),
  graduationSemester: text("graduationSemester"),
});

export const saseInfo = sqliteTable("saseInfo", {
  userID: text("userID")
    .primaryKey()
    .references(() => users.userID),
  eventsAttended: text("eventsAttended"),
  mentors: text("mentors"),
  mentees: text("mentees"),
  groups: text("groups"),
});

export const events = sqliteTable("events", {
  eventID: text("eventID").notNull().primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  location: text("location").notNull(),
  startDate: text("startDate").notNull(),
  endDate: text("endDate").notNull(),
  involvedGroups: text("involvedGroups"),
});

export const blogs = sqliteTable("blogs", {
  blogID: text("blogID").notNull().primaryKey(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  authorID: text("authorID").references(() => users.userID),
  publishDate: text("publishDate").notNull(),
  lastUpdateDate: text("lastUpdateDate"),
  tags: text("text"),
});

export const groups = sqliteTable("groups", {
  groupID: text("groupID").notNull().primaryKey(),
  name: text("name").notNull(),
});
