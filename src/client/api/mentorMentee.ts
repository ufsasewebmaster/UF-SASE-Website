import type { Mentee, Mentor, MMRelationship } from "@shared/schema/MMRelationshipSchema";
import { MenteeSchema, MentorSchema, MMRelationshipSchema } from "@shared/schema/MMRelationshipSchema";
import { apiFetch } from "@shared/utils";

export const fetchMentorMenteeRelations = async (): Promise<Array<MMRelationship>> => {
  const response = await apiFetch("/api/mentorMentee/all", { method: "GET" }, MMRelationshipSchema.array());
  return response.data;
};

export const addMentorMenteeRelation = async (mentorId: string, menteeId: string): Promise<null> => {
  const info = { mentorId: mentorId, menteeId: menteeId };
  const response = await apiFetch(
    "/api/mentorMentee/single",
    {
      method: "POST",
      body: JSON.stringify(info),
    },
    MMRelationshipSchema,
  );

  return response.data();
};

export const getAllMentors = async (): Promise<Array<Mentor>> => {
  const response = await apiFetch("/api/mentorMentee/mentors", { method: "GET" }, MentorSchema.array());
  return response.data();
};

export const getAllMentees = async (): Promise<Array<Mentee>> => {
  const response = await apiFetch("/api/mentorMentee/mentees", { method: "GET" }, MenteeSchema.array());
  return response.data();
};
