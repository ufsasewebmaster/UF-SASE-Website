import { z } from "zod";

export const RoleSchema = z.object({
  id: z.string().min(1, "Role ID is required."),
  name: z.string().min(1, "Role name is required."),
});
export type Role = z.infer<typeof RoleSchema>;

export const RolesSchema = RoleSchema.array();
export type Roles = z.infer<typeof RolesSchema>;

export const UserRoleRelationshipSchema = z.object({
  id: z.string().min(1, "Relationship ID is required."),
  userId: z.string().min(1, "User ID is required."),
  role: z.string().min(1, "Role is required."),
});
export type UserRoleRelationship = z.infer<typeof UserRoleRelationshipSchema>;

export const UserRoleRelationshipsSchema = UserRoleRelationshipSchema.array();
export type UserRoleRelationships = z.infer<typeof UserRoleRelationshipsSchema>;
