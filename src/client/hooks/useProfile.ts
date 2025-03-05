import { profileSchema } from "@/shared/schema/profileSchema";
import type { Profile } from "@/shared/schema/profileSchema";
import { apiFetch } from "@/shared/utils";
import { useQuery } from "@tanstack/react-query";

export const useProfile = () => {
  return useQuery<Profile, Error>({
    queryKey: ["profile"],
    queryFn: async () => {
      const response = await apiFetch("/api/profile", { credentials: "include" }, profileSchema);
      return response.data;
    },
  });
};
