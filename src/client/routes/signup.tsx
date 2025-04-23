import { signupUser } from "@/client/api/auth";
import { imageUrls } from "@assets/imageUrls";
import type { FormData } from "@components/AuthForm";
import AuthForm from "@components/AuthForm";
import AuthLayout from "@components/AuthLayout";
import { Page } from "@components/Page";
import { SuccessModal } from "@components/SuccessModal";
import { useMutation } from "@tanstack/react-query";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useAuth } from "../hooks/AuthContext";
import { seo } from "../utils/seo";

export const Route = createFileRoute("/signup")({
  meta: () => [
    ...seo({
      title: "Signup | UF SASE",
      description: "Sign Up page for UF SASE",
      image: imageUrls["SASELogo.png"],
    }),
  ],

  component: () => {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const mutation = useMutation({
      mutationFn: async (data: FormData) => {
        // 1) Create the new user
        await signupUser({ username: data.username, password: data.password });
        // 2) Immediately log them in via AuthContext
        await login(data.username, data.password);
      },
      onSuccess: () => {
        setShowSuccessModal(true);
      },
      onError: (err) => {
        console.error("Error during signup:", err);
        setErrorMessage(err.message);
      },
    });

    const handleSignup = (data: FormData) => {
      setErrorMessage(null);
      mutation.mutate(data);
    };

    const handleModalClose = () => {
      setShowSuccessModal(false);
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
