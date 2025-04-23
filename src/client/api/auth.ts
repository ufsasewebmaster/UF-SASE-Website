// src/api/auth.ts
import { apiFetch } from "@shared/utils";
import { z } from "zod";

const LoginResponseSchema = z.object({
  sessionId: z.string(),
});

const SessionSchema = z.object({
  id: z.string(),
  username: z.string(),
  roles: z.string().array(),
});
export type Session = z.infer<typeof SessionSchema>;

const CredentialsSchema = z.object({
  username: z.string().min(1),
  password: z.string().min(1),
});
export type Credentials = z.infer<typeof CredentialsSchema>;

export const fetchSession = () => apiFetch("/api/auth/session", { credentials: "include" }, SessionSchema).then((res) => res.data);

export const loginApi = async (creds: Credentials): Promise<Session> => {
  CredentialsSchema.parse(creds);

  const { data } = await apiFetch(
    "/api/auth/login",
    {
      method: "POST",
      credentials: "include",
      body: JSON.stringify(creds),
    },
    LoginResponseSchema,
  );
  return data;
};

export const logoutApi = () => apiFetch("/api/auth/logout", { method: "POST", credentials: "include" }, z.null());

export const signupUser = (creds: Credentials) => apiFetch("/api/auth/signup", { method: "POST", body: JSON.stringify(creds) }, z.void());
