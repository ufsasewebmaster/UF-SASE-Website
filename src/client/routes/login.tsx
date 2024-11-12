import type { FormData } from "@components/AuthForm";
import AuthForm from "@components/AuthForm";
import { Page } from "@components/Page";
import { useMutation } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { useAuth } from "../AuthContext";
import ShadowCard from "../components/AuthShadowCard";

export const Route = createFileRoute("/login")({
  component: () => {
    const { login } = useAuth();
    const mutation = useMutation({
      mutationFn: async (formData: FormData) => {
        try {
          const response = await fetch(
            "https://sheetdb.io/api/v1/79fo2g87zoqgy",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(formData),
            },
          );

          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        } catch (error) {
          console.error("Error submitting data:", error);
          throw error;
        }
      },
      onSuccess: () => {
        login();
      },
      onError: (error) => {
        console.error("Error during mutation:", error);
      },
    });

    const handleLogin = (data: FormData) => {
      mutation.mutate(data);
    };

    return (
      <Page>
        <div className="relative flex min-h-screen items-center justify-center">
          <ShadowCard />
          <AuthForm
            title="Login"
            buttonLabel="Login"
            linkText="Forgot password?"
            linkRoute="/"
            onSubmit={handleLogin}
            additionalButton={{
              text: "Register new account",
              route: "/signup",
            }}
          />
        </div>
      </Page>
    );
  },
});
