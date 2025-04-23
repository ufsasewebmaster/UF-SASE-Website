import { relations } from "drizzle-orm/relations";
import { blog, blogTag, blogTagRelationship, mentorMenteeRelationship, personalInfo, professionalInfo, saseInfo, session, user } from "@db/tables";

export const blogTagRelationshipRelations = relations(blogTagRelationship, ({ one }) => ({
  blogTag: one(blogTag, {
    fields: [blogTagRelationship.tagId],
    references: [blogTag.id],
  }),
  blog: one(blog, {
    fields: [blogTagRelationship.blogId],
    references: [blog.id],
  }),
}));

export const blogTagRelations = relations(blogTag, ({ many }) => ({
  blogTagRelationships: many(blogTagRelationship),
}));

export const blogRelations = relations(blog, ({ many, one }) => ({
  blogTagRelationships: many(blogTagRelationship),
  user: one(user, {
    fields: [blog.author_id],
    references: [user.id],
  }),
}));

export const userRelations = relations(user, ({ many }) => ({
  blogs: many(blog),
  mentorMenteeRelationships_menteeId: many(mentorMenteeRelationship, {
    relationName: "mentorMenteeRelationship_menteeId_user_id",
  }),
  mentorMenteeRelationships_mentorId: many(mentorMenteeRelationship, {
    relationName: "mentorMenteeRelationship_mentorId_user_id",
  }),
  sessions: many(session),
  personalInfos: many(personalInfo),
  professionalInfos: many(professionalInfo),
  saseInfos: many(saseInfo),
}));

export const mentorMenteeRelationshipRelations = relations(mentorMenteeRelationship, ({ one }) => ({
  user_menteeId: one(user, {
    fields: [mentorMenteeRelationship.menteeId],
    references: [user.id],
    relationName: "mentorMenteeRelationship_menteeId_user_id",
  }),
  user_mentorId: one(user, {
    fields: [mentorMenteeRelationship.mentorId],
    references: [user.id],
    relationName: "mentorMenteeRelationship_mentorId_user_id",
  }),
}));

export const sessionRelations = relations(session, ({ one }) => ({
  user: one(user, {
    fields: [session.userId],
    references: [user.id],
  }),
}));

export const personalInfoRelations = relations(personalInfo, ({ one }) => ({
  user: one(user, {
    fields: [personalInfo.userId],
    references: [user.id],
  }),
}));

export const professionalInfoRelations = relations(professionalInfo, ({ one }) => ({
  user: one(user, {
    fields: [professionalInfo.userId],
    references: [user.id],
  }),
}));

export const saseInfoRelations = relations(saseInfo, ({ one }) => ({
  user: one(user, {
    fields: [saseInfo.userId],
    references: [user.id],
  }),
}));
