import type { ProfessionalInfo, ProfessionalInfoInsert, ProfessionalInfoUpdate } from "@shared/schema/professionalInfoSchema";
import { professionalInfoInsertSchema, professionalInfoSchema, professionalInfoUpdateSchema } from "@shared/schema/professionalInfoSchema";
import { apiFetch } from "@shared/utils";

export const fetchProfessionalInfo = async (id: string): Promise<ProfessionalInfo> => {
  const { data } = await apiFetch(`/api/users/professional/${id}`, { method: "GET", credentials: "include" }, professionalInfoSchema);
  return data;
};

export const createProfessionalInfo = async (info: ProfessionalInfoInsert): Promise<ProfessionalInfo> => {
  const { data } = await apiFetch(
    `/api/users/professional`,
    {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(info),
    },
    professionalInfoInsertSchema,
  );
  return data;
};

export const updateProfessionalInfo = async (id: string, changes: ProfessionalInfoUpdate): Promise<ProfessionalInfo> => {
  const { data } = await apiFetch(
    `/api/users/professional/${id}`,
    {
      method: "PATCH",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(changes),
    },
    professionalInfoUpdateSchema,
  );
  return data;
};

export const deleteProfessionalInfo = async (id: string): Promise<void> => {
  await apiFetch(`/api/users/professional/${id}`, { method: "DELETE", credentials: "include" }, professionalInfoSchema);
};
