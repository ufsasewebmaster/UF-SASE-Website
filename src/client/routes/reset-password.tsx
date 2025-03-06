import type { FormData } from "@components/AuthForm";
import AuthForm from "@components/AuthForm";
import { Page } from "@components/Page";
import { useMutation } from "@tanstack/react-query";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { imageUrls } from "../assets/imageUrls";
import ShadowCard from "../components/AuthShadowCard";
import { useAuth } from "../hooks/AuthContext";
import { seo } from "../utils/seo";

export const Route = createFileRoute("/reset-password")({
  meta: () => [
    ...seo({
      title: "Reset Password | UF SASE",
      description: "UF Society of Asian Scientists & Engineers",
      image: imageUrls["SASELogo.png"],
    }),
  ],

  component: () => {
    const { login } = useAuth();
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const navigate = useNavigate();

    const mutation = useMutation({
      mutationFn: async (formData: FormData) => {
        const response = await fetch("api/user/users/:id/password", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        if (!response.ok) {
          const errorMessage = await response.text();
          throw new Error(errorMessage);
        }
      },
      onSuccess: () => {
        login();
        navigate({ to: "/login" });
      },
      onError: (error) => {
        setErrorMessage(error.message);
      },
    });

    const handleResetPassword = (data: FormData) => {
      mutation.mutate(data);
    };

    return (
      <Page>
        <div className="relative flex min-h-screen items-center justify-center">
          <ShadowCard />
          <AuthForm
            title="Reset Password"
            buttonLabel="Reset Password"
            linkText=""
            linkRoute=""
            isResetPassword={true}
            onSubmit={handleResetPassword}
            errorMessage={errorMessage || undefined}
          />
        </div>
      </Page>
    );
  },
});
