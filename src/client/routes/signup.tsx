import { imageUrls } from "@assets/imageUrls";
import type { FormData } from "@components/AuthForm";
import { Page } from "@components/Page";
import { useMutation } from "@tanstack/react-query";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import AuthForm from "../components/AuthForm";
import AuthLayout from "../components/AuthLayout";
import { SuccessModal } from "../components/SuccessModal";
import { useAuth } from "../hooks/AuthContext";
import { seo } from "../utils/seo";

export const Route = createFileRoute("/signup")({
  meta: () => [...seo({ title: "Signup | UF SASE", description: "Sign Up page for UF SASE", image: imageUrls["SASELogo.png"] })],

  component: () => {
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const { login } = useAuth();
    const navigate = useNavigate();

    const mutation = useMutation({
      mutationFn: async (formData: FormData) => {
        const signupResponse = await signupUser(formData);
        if (!signupResponse.ok) {
          const errorMessage = await signupResponse.text();
          throw new Error(errorMessage);
        }

        const loginResponse = await loginUser(formData);
        if (!loginResponse.ok) {
          const errorMessage = await loginResponse.text();
          throw new Error(errorMessage);
        }

        return loginResponse;
      },
      onSuccess: () => {
        setShowSuccessModal(true);
      },
      onError: (error) => {
        console.error("Error during signup:", error);
        setErrorMessage(error.message);
      },
    });

    const signupUser = async (formData: FormData) => {
      return fetch("/api/auth/signup", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(formData) });
    };

    const loginUser = async (formData: FormData) => {
      return fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: formData.username, password: formData.password }),
      });
    };

    const handleSignup = (data: FormData) => mutation.mutate(data);

    const handleModalClose = () => {
      setShowSuccessModal(false);
      login();
      navigate({ to: "/" });
    };

    return (
      <Page>
        <AuthLayout isSignUp={true}>
          <AuthForm
            title="Sign Up"
            buttonLabel="Sign Up"
            linkText="Already have an account?"
            linkRoute="/login"
            isSignUp={true}
            onSubmit={handleSignup}
            errorMessage={errorMessage || undefined}
          />

          <SuccessModal isOpen={showSuccessModal} onClose={handleModalClose} message="You have successfully created your account!" />
        </AuthLayout>
      </Page>
    );
  },
});
