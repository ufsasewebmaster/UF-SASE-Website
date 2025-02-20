// import { sql } from "drizzle-orm";
import { blob, integer, sqliteTable, text, uniqueIndex } from "drizzle-orm/sqlite-core";

export const blogTagRelationship = sqliteTable("blog_tag_relationship", {
  id: text().primaryKey().notNull(),
  blogId: text("blog_id").references(() => blog.id),
  tagId: text("tag_id").references(() => blogTag.id),
});

export const blogTag = sqliteTable(
  "blog_tag",
  {
    id: text().primaryKey().notNull(),
    name: text().notNull(),
  },
  (table) => {
    return {
      nameUnique: uniqueIndex("blog_tag_name_unique").on(table.name),
    };
  },
);

export const blog = sqliteTable(
  "blog",
  {
    id: text().primaryKey().notNull(),
    title: text().notNull(),
    content: text().notNull(),
    author_id: text("author_id").references(() => user.id),
    published_date: integer("published_date").notNull(),
    last_update_date: text("last_update_date"),
    time_updated: integer("time_updated").notNull(),
  },
  (table) => {
    return {
      titleUnique: uniqueIndex("blog_title_unique").on(table.title),
    };
  },
);

export const event = sqliteTable(
  "event",
  {
    id: text().primaryKey().notNull(),
    name: text().notNull(),
    description: text(),
    location: text().notNull(),
    startTime: integer("start_time").notNull(),
    endTime: integer("end_time").notNull(),
    involvedGroups: text("involved_groups"),
    timeAdded: integer("time_added").notNull(),
    time_updated: integer("time_updated").notNull(),
    slidesUrl: text("slides_url"),
  },
  (table) => {
    return {
      nameUnique: uniqueIndex("event_name_unique").on(table.name),
    };
  },
);

export const mentorMenteeRelationship = sqliteTable("mentor_mentee_relationship", {
  id: text().primaryKey().notNull(),
  mentorId: text("mentor_id").references(() => user.id),
  menteeId: text("mentee_id").references(() => user.id),
});

export const session = sqliteTable("session", {
  id: text().primaryKey().notNull(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id),
  expiresAt: integer("expires_at").notNull(),
});

export const user = sqliteTable(
  "user",
  {
    id: text().primaryKey().notNull(),
    username: text().notNull(),
    points: integer(),
    roles: text(),
    timeAdded: integer("time_added").notNull(),
    time_updated: integer("time_updated").notNull(),
    password: text().notNull(),
  },
  (table) => {
    return {
      usernameUnique: uniqueIndex("user_username_unique").on(table.username),
    };
  },
);

export const emailSubscriber = sqliteTable(
  "email_subscriber",
  {
    id: text().primaryKey().notNull(),
    email: text().notNull(),
    name: text(),
    subscribedAt: integer("subscribed_at").notNull(),
  },
  (table) => {
    return {
      emailUnique: uniqueIndex("email_subscriber_email_unique").on(table.email),
    };
  },
);

export const personalInfo = sqliteTable(
  "personal_info",
  {
    userId: text("user_id")
      .primaryKey()
      .notNull()
      .references(() => user.id),
    firstName: text("first_name").notNull(),
    lastName: text("last_name").notNull(),
    email: text().notNull(),
    phone: blob(),
    areaCode: integer("area_code"),
  },
  (table) => {
    return {
      phoneUnique: uniqueIndex("personal_info_phone_unique").on(table.phone),
      emailUnique: uniqueIndex("personal_info_email_unique").on(table.email),
    };
  },
);

export const professionalInfo = sqliteTable("professional_info", {
  userId: text("user_id")
    .primaryKey()
    .notNull()
    .references(() => user.id),
  resumePath: text("resume_path"),
  linkedin: text(),
  portfolio: text(),
  majors: text(),
  minors: text(),
  graduationSemester: text("graduation_semester"),
});

export const saseInfo = sqliteTable("sase_info", {
  userId: text("user_id")
    .primaryKey()
    .notNull()
    .references(() => user.id),
  eventsAttended: text("events_attended"),
  groups: text(),
});
