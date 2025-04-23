import {
  blogs,
  blogTagRelationship,
  blogTags,
  mentorMenteeRelationship,
  personalInfo,
  professionalInfo,
  saseInfo,
  sessions,
  users,
} from "@db/tables";
import { relations } from "drizzle-orm/relations";

export const blogTagRelationshipRelations = relations(blogTagRelationship, ({ one }) => ({
  blogTag: one(blogTags, {
    fields: [blogTagRelationship.tagId],
    references: [blogTags.id],
  }),
  blog: one(blogs, {
    fields: [blogTagRelationship.blogId],
    references: [blogs.id],
  }),
}));

export const blogTagRelations = relations(blogTags, ({ many }) => ({
  blogTagRelationships: many(blogTagRelationship),
}));

export const blogRelations = relations(blogs, ({ many, one }) => ({
  blogTagRelationships: many(blogTagRelationship),
  user: one(users, {
    fields: [blogs.authorId],
    references: [users.id],
  }),
}));

export const userRelations = relations(users, ({ many }) => ({
  blogs: many(blogs),
  mentorMenteeRelationships_menteeId: many(mentorMenteeRelationship, {
    relationName: "mentorMenteeRelationship_menteeId_user_id",
  }),
  mentorMenteeRelationships_mentorId: many(mentorMenteeRelationship, {
    relationName: "mentorMenteeRelationship_mentorId_user_id",
  }),
  sessions: many(sessions),
  personalInfos: many(personalInfo),
  professionalInfos: many(professionalInfo),
  saseInfos: many(saseInfo),
}));

export const mentorMenteeRelationshipRelations = relations(mentorMenteeRelationship, ({ one }) => ({
  user_menteeId: one(users, {
    fields: [mentorMenteeRelationship.menteeId],
    references: [users.id],
    relationName: "mentorMenteeRelationship_menteeId_user_id",
  }),
  user_mentorId: one(users, {
    fields: [mentorMenteeRelationship.mentorId],
    references: [users.id],
    relationName: "mentorMenteeRelationship_mentorId_user_id",
  }),
}));

export const sessionRelations = relations(sessions, ({ one }) => ({
  user: one(users, {
    fields: [sessions.userId],
    references: [users.id],
  }),
}));

export const personalInfoRelations = relations(personalInfo, ({ one }) => ({
  user: one(users, {
    fields: [personalInfo.userId],
    references: [users.id],
  }),
}));

export const professionalInfoRelations = relations(professionalInfo, ({ one }) => ({
  user: one(users, {
    fields: [professionalInfo.userId],
    references: [users.id],
  }),
}));

export const saseInfoRelations = relations(saseInfo, ({ one }) => ({
  user: one(users, {
    fields: [saseInfo.userId],
    references: [users.id],
  }),
}));
