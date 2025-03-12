import { imageUrls } from "@assets/imageUrls";
import { Page } from "@components/Page";
import { useMutation } from "@tanstack/react-query";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import AuthForm from "../components/AuthForm";
import AuthLayout from "../components/AuthLayout";
import { SuccessModal } from "../components/SuccessModal";
import { seo } from "../utils/seo";

export const Route = createFileRoute("/email-verification")({
  meta: () => [
    ...seo({
      title: "Email Verification | UF SASE",
      description: "UF Society of Asian Scientists & Engineers",
      image: imageUrls["SASELogo.png"],
    }),
  ],

  component: () => {
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const navigate = useNavigate();

    const mutation = useMutation({
      mutationFn: async (formData: { email: string }) => {
        const verificationResponse = await sendVerificationEmail(formData);
        if (!verificationResponse.ok) {
          const errorMessage = await verificationResponse.text();
          throw new Error(errorMessage);
        }

        return verificationResponse;
      },
      onSuccess: () => {
        setShowSuccessModal(true);
      },
      onError: (error) => {
        console.error("Error during email verification:", error);
        setErrorMessage(error.message);
      },
    });

    const sendVerificationEmail = async (formData: { email: string }) => {
      return fetch("/api/email/password-reset", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
    };

    const handleEmailVerification = (data: { email: string }) => mutation.mutate(data);

    const handleModalClose = () => {
      setShowSuccessModal(false);
      navigate({ to: "/" });
    };

    return (
      <Page>
        <AuthLayout isSignUp={false}>
          <AuthForm
            title="Reset Password"
            buttonLabel="Send Verification Email"
            linkText=""
            linkRoute=""
            isEmailVerification={true}
            onSubmit={handleEmailVerification}
            errorMessage={errorMessage || undefined}
          />

          <SuccessModal isOpen={showSuccessModal} onClose={handleModalClose} message="Verification email sent! Please check your inbox." />
        </AuthLayout>
      </Page>
    );
  },
});
