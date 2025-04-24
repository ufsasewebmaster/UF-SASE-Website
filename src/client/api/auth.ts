// src/api/auth.ts
import { apiFetch } from "@shared/utils";
import { z } from "zod";

const LoginResponseSchema = z.object({
  sessionId: z.string(),
});
const SignInSuccessSchema = z.object({
  userId: z.string(),
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
  email: z.string().email(),
});
const LoginCredentialsSchema = CredentialsSchema.omit({
  email: true,
});

export type SignUpCredentials = z.infer<typeof CredentialsSchema>;
export type LoginCredentials = z.infer<typeof LoginCredentialsSchema>;

export const fetchSession = () => apiFetch("/api/auth/session", { credentials: "include" }, SessionSchema).then((res) => res.data);

export const loginApi = async (creds: LoginCredentials): Promise<Session> => {
  LoginCredentialsSchema.parse(creds);

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

export const signupUser = async (creds: SignUpCredentials) =>
  await apiFetch("/api/auth/signup", { method: "POST", body: JSON.stringify(creds) }, SignInSuccessSchema);
