import { ALLprofileSchema } from "@/shared/schema/ALLprofileSchema";
import type { ALLProfile } from "@/shared/schema/ALLprofileSchema";
import { apiFetch } from "@/shared/utils";
import { useQuery } from "@tanstack/react-query";

export const useProfile = () => {
  return useQuery<ALLProfile, Error>({
    queryKey: ["profile"],
    queryFn: async () => {
      const response = await apiFetch("/api/profile", { credentials: "include" }, ALLprofileSchema);
      return response.data;
    },
  });
};
