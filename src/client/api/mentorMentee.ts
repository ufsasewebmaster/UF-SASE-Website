import type { MMRelationship } from "@shared/schema/MMRelationshipSchema";
import { MMRelationshipSchema } from "@shared/schema/MMRelationshipSchema";
import { apiFetch } from "@shared/utils";

export const fetchMentorMenteeRelations = async (): Promise<Array<MMRelationship>> => {
    const response = await apiFetch("/api/mentorMentee/all", { method: "GET"}, MMRelationshipSchema.array());
    return response.data;
}

