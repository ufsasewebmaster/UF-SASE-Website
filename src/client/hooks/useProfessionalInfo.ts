// src/hooks/useProfessionalInfo.ts
import { createProfessionalInfo, deleteProfessionalInfo, fetchProfessionalInfo, updateProfessionalInfo } from "@client/api/professionalInfo";
import type { ProfessionalInfo, ProfessionalInfoInsert, ProfessionalInfoUpdate } from "@shared/schema/professionalInfoSchema";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useProfessionalInfo = (id: string) => {
  const queryClient = useQueryClient();

  const infoQuery = useQuery<ProfessionalInfo, Error>({
    queryKey: ["professionalInfo", id],
    initialData: {
      userId: id,
      phone: "",
      discord: "",
      bio: "",
      resumePath: "",
      linkedin: "",
      portfolio: "",
      majors: "",
      minors: "",
      graduationSemester: "",
    },
    queryFn: () => (id ? fetchProfessionalInfo(id) : Promise.reject(new Error("User ID is required"))),
  });

  const createMutation = useMutation<ProfessionalInfo, Error, ProfessionalInfoInsert>({
    mutationFn: (newInfo) => createProfessionalInfo(newInfo),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["professionalInfo", data.userId] });
    },
  });

  const updateMutation = useMutation<ProfessionalInfo, Error, ProfessionalInfoUpdate>({
    mutationFn: (changes) => updateProfessionalInfo(id, changes),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["professionalInfo", id] });
    },
  });

  const deleteMutation = useMutation<void, Error, void>({
    mutationFn: () => deleteProfessionalInfo(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["professionalInfo", id] });
    },
  });

  return {
    professionalInfo: infoQuery.data,
    isLoading: infoQuery.isLoading,
    error: infoQuery.error,

    createProfessionalInfo: createMutation,
    updateProfessionalInfo: updateMutation,
    deleteProfessionalInfo: deleteMutation,
  };
};
