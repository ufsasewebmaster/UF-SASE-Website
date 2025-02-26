import { cn } from "@/shared/utils";
import { Page } from "@components/Page";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@ui/button";
import { Input } from "@ui/input";
import React from "react";
import type { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";
import ShadowCard from "../components/AuthShadowCard";
import { Logo } from "../components/navigation/Logo";

interface ForgotPasswordFormData {
  email: string;
}

const StyledFormField = ({ children, hasError, icon }: { children: React.ReactNode; icon?: string; hasError?: boolean }) => (
  <div className={cn("relative mb-1 w-full")}>
    {icon && <span className={cn("pointer-events-none absolute left-3 top-[40%] z-10 h-5 w-5 -translate-y-1/2 text-gray-500", icon)} />}
    {React.cloneElement(children as React.ReactElement, {
      className: cn(
        "mb-3 rounded-lg border border-gray-300 bg-saseGreenLight p-4 pl-10 placeholder-black opacity-90",
        hasError ? "border-red-600" : "",
      ),
    })}
  </div>
);

const Password = () => {
  const {
    formState: { errors, isSubmitting },
    handleSubmit,
    register,
  } = useForm<ForgotPasswordFormData>({ mode: "onBlur" });

  const onSubmit: SubmitHandler<ForgotPasswordFormData> = async (data) => {
    console.log("Reset request submitted for:", data.email);
    // add your reset password logic here
  };

  return (
    <Page>
      <div className={cn("relative flex min-h-screen items-center justify-center")}>
        <ShadowCard />
        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className={cn(
            "relative z-10 flex h-[32rem] w-full max-w-md flex-col items-center justify-start overflow-y-auto rounded-lg border bg-gray-100 p-6 shadow-xl",
          )}
        >
          <div className={cn("mb-6 p-2")}>
            <Logo />
          </div>
          <h3 className={cn("heading mb-3 pb-2 text-center font-oswald text-4xl font-semibold")}>Forgot Password</h3>
          <p className={cn("mb-10 text-center text-gray-600")}>Please type the email associated with the account</p>
          <StyledFormField icon="icon-[mdi--email-outline]" hasError={!!errors.email}>
            <Input
              id="email"
              type="email"
              placeholder="Email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                  message: "Enter a valid email address",
                },
              })}
            />
          </StyledFormField>
          {errors.email && <span className={cn("mb-4 font-redhat text-sm text-red-600")}>{errors.email.message}</span>}
          <Button
            type="submit"
            className={cn("mt-5 w-full rounded-lg border bg-saseBlueLight p-5 font-semibold text-white")}
            disabled={isSubmitting || !!errors.email}
          >
            Send Email Verification
          </Button>
          <p className={cn("text-md mt-6 text-center font-redhat")}>
            <Link to="/login" className={cn("cursor-pointer text-saseBlue underline")}>
              Back to Login
            </Link>
          </p>
        </form>
      </div>
    </Page>
  );
};

export const Route = createFileRoute("/password")({
  component: Password,
});
