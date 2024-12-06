import { imageUrls } from "@assets/imageUrls";
import type { FormData } from "@components/AuthForm";
import { Page } from "@components/Page";
import { useMutation } from "@tanstack/react-query";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useAuth } from "../AuthContext";
import AuthForm from "../components/AuthForm";
import ShadowCard from "../components/AuthShadowCard";
import { SuccessModal } from "../components/SuccessModal";
import { seo } from "../utils/seo";

export const Route = createFileRoute("/signup")({
  meta: () => [
    ...seo({
      title: "Signup | UF SASE",
      description: "UF Society of Asian Scientists & Engineers",
      image: imageUrls["SASELogo.png"],
    }),
  ],

  component: () => {
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const mutation = useMutation({
      mutationFn: async (formData: FormData) => {
        try {
          await fetch("/api/auth/signup", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          });
        } catch (error) {
          console.error("Error submitting data:", error);
          throw error;
        }
      },
      onSuccess: () => {
        login();
        setShowSuccessModal(true);
      },
      onError: (error) => {
        console.error("Signup error:", error);
      },
    });

    const handleSignup = (data: FormData) => mutation.mutate(data);

    const handleModalClose = () => {
      setShowSuccessModal(false);
      login();
      navigate({ to: "/" });
    };

    return (
      <Page>
        <div className="relative flex min-h-screen items-center justify-center">
          <ShadowCard />
          <AuthForm
            title="Sign Up"
            buttonLabel="Sign Up"
            linkText="Already have an account?"
            linkRoute="/login"
            isSignUp={true}
            onSubmit={handleSignup}
          />

          <SuccessModal isOpen={showSuccessModal} onClose={handleModalClose} message="You have successfully created your account!" />
        </div>
      </Page>
    );
  },
});
