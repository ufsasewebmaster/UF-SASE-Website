import type { MMRelationship } from "@shared/schema/MMRelationshipSchema";
import { MenteeSchema, MentorSchema, MMRelationshipSchema } from "@shared/schema/MMRelationshipSchema";
import { apiFetch } from "@shared/utils";

export const fetchMentorMenteeRelations = async (): Promise<Array<MMRelationship>> => {
  const response = await apiFetch("/api/mentorMentee/all", { method: "GET" }, MMRelationshipSchema.array());
  return response.data;
};

export const addMentorMenteeRelation = async (): Promise<null> => {
  const response = await apiFetch("/api/mentorMentee/single", { method: "GET" }, MMRelationshipSchema);
  return response.data();
};

export const getAllMentors = async (): Promise<Array<MMRelationship>> => {
  const response = await apiFetch("/api/mentorMentee/allMentors", { method: "GET" }, MentorSchema.array());
  return response.data();
};

export const getAllMentees = async (): Promise<Array<MMRelationship>> => {
  const response = await apiFetch("/api/mentorMentee/allMentors", { method: "GET" }, MenteeSchema.array());
  return response.data();
};
