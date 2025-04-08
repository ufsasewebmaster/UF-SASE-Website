import type { FormData } from "@components/AuthForm";
import AuthForm from "@components/AuthForm";
import { Page } from "@components/Page";
import { useMutation } from "@tanstack/react-query";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { imageUrls } from "../assets/imageUrls";
import AuthLayout from "../components/AuthLayout";
import { useAuth } from "../hooks/AuthContext";
import { seo } from "../utils/seo";

export const Route = createFileRoute("/login")({
  meta: () => [
    ...seo({
      title: "Login | UF SASE",
      description: "UF Society of Asian Scientists & Engineers",
      image: imageUrls["SASELogo.png"],
    }),
  ],

  component: () => {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const mutation = useMutation({
      mutationFn: async (formData: FormData) => {
        const response = await fetch("/api/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
          credentials: "include",
        });
        if (!response.ok) {
          const errorMessage = await response.text();
          throw new Error(errorMessage);
        }
      },
      onSuccess: async () => {
        login();
        navigate({ to: "/" });
      },
      onError: (error) => {
        console.error("Error during mutation:", error);
        setErrorMessage(error.message);
      },
    });

    const handleLogin = (data: FormData) => {
      mutation.mutate(data);
    };

    return (
      <Page>
        <AuthLayout isSignUp={false}>
          <AuthForm
            title="Login"
            buttonLabel="Login"
            linkText="Forgot password?"
            linkRoute="/"
            onSubmit={handleLogin}
            errorMessage={errorMessage || undefined}
            additionalButton={{
              text: "Register new account",
              route: "/signup",
            }}
          />
        </AuthLayout>
      </Page>
    );
  },
});
