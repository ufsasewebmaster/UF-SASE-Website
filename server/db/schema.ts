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
