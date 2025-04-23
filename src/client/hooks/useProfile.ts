import { profileSchema } from "@/shared/schema/profileSchema";
import type { Profile } from "@/shared/schema/profileSchema";
import { apiFetch } from "@/shared/utils";
import { useQuery, useQueryClient } from "@tanstack/react-query";

export const useProfile = () => {
  return useQuery<Profile, Error>({
    queryKey: ["profile"],
    queryFn: async () => {
      const response = await apiFetch("/api/profile", { credentials: "include" }, profileSchema);
      return response.data;
    },
  });
};

//forces refetch of profile information by invalidating everything in the profile query
export const triggerProfileRefetch = () => {
  const queryClient = useQueryClient();
  queryClient.invalidateQueries({ queryKey: ["profile"] });
};
