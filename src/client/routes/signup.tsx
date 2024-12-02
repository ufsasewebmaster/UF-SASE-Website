import { imageUrls } from "@assets/imageUrls";
import type { FormData } from "@components/AuthForm";
import { Page } from "@components/Page";
import { useMutation } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import AuthForm from "../components/AuthForm";
import ShadowCard from "../components/AuthShadowCard";
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
    const mutation = useMutation({
      mutationFn: async (formData: FormData) => {
        const response = await fetch("https://sheetdb.io/api/v1/79fo2g87zoqgy", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        if (!response.ok) throw new Error("Network response was not ok");
        return response.json();
      },
      onSuccess: () => console.log("User signed up successfully!"),
    });

    const handleSignup = (data: FormData) => mutation.mutate(data);

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
        </div>
      </Page>
    );
  },
});
