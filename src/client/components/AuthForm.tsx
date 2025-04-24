import { cn } from "@/shared/utils";
import { Link } from "@tanstack/react-router";
import { Button } from "@ui/button";
import { Input } from "@ui/input";
import React from "react";
import type { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";
import { Logo } from "./navigation/Logo";

interface AuthFormProps {
  onSubmit: (data: FormData) => void;
  title: string;
  buttonLabel: string;
  linkText: string;
  linkRoute: string;
  errorMessage?: string;
  isSignUp?: boolean;
  isResetPassword?: boolean;
  isEmailVerification?: boolean;
  additionalButton?: { text: string; route: string };
}

export interface FormData {
  username: string;
  email: string;
  password: string;
  newPassword: string;
  retypePassword?: string;
  firstName: string;
  lastName: string;
}

// only styling
const StyledFormField = ({ children, hasError, icon }: { children: React.ReactNode; icon?: string; hasError?: boolean }) => (
  <div className="relative mb-2 w-full">
    {" "}
    {icon && <span className={`absolute left-3 top-[40%] z-10 h-5 w-5 -translate-y-1/2 text-gray-500 ${icon}`} />}
    {React.cloneElement(children as React.ReactElement, {
      className: cn(
        "mb-3 rounded-lg border border-gray-300 bg-saseGreenLight p-4 pl-10 placeholder-black opacity-90 w-full",
        hasError && "border-red-600",
      ),
    })}
  </div>
);

const AuthForm = ({
  additionalButton,
  buttonLabel,
  errorMessage,
  isEmailVerification = false,
  isResetPassword = false,
  isSignUp = false,
  linkRoute,
  linkText,
  onSubmit,
  title,
}: AuthFormProps) => {
  const {
    formState: { errors },
    handleSubmit,
    register,
    watch,
  } = useForm<FormData>({ mode: "all", defaultValues: { username: "", email: "", password: "", retypePassword: "" } });

  const password = watch("password");
  const handleFormSubmit: SubmitHandler<FormData> = (data) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { retypePassword, ...submitData } = data;
    onSubmit(submitData as FormData);
  };
  const passwordRegex = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_\-+=[\]{}\\|;:'",<>./?])[A-Za-z\d!@#$%^&*()_\-+=[\]{}\\|;:'",<>./?]{8,}$/;
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      noValidate
      className={cn(
        "relative z-10 flex w-full max-w-md flex-col items-center justify-center overflow-y-auto rounded-lg border-muted bg-muted p-6 shadow-xl",
        isSignUp ? "min-h-[38em]" : "min-h-[32rem]",
      )}
    >
      <div className={cn("mb-6 flex items-center justify-center p-2", (isEmailVerification || isResetPassword) && "mt-[-40px]")}>
        <Logo />
      </div>
      <h3 className="heading mb-3 pb-2 text-center font-oswald text-4xl font-semibold">{title}</h3>
      {errorMessage && <div className="mb-3 w-full text-center text-sm text-red-600">{errorMessage}</div>}
      {isEmailVerification && (
        <>
          <StyledFormField icon="icon-[material-symbols--mail-outline]" hasError={!!errors.email}>
            <Input
              id="email"
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: { value: emailRegex, message: "Enter a valid email address" },
              })}
              placeholder="Email"
            />
          </StyledFormField>
          {errors.email && <span className="mb-1 font-redhat text-sm text-red-600">{errors.email.message}</span>}
        </>
      )}
      {!isResetPassword && !isEmailVerification && (
        <>
          <StyledFormField icon="icon-[qlementine-icons--user-16]" hasError={!!errors.username}>
            <Input
              id="username"
              type="text"
              {...register("username", {
                required: { value: true, message: "Username is required" },
                minLength: { value: 4, message: "Username must be at least 4 characters!" },
                maxLength: { value: 254, message: "Username must be 254 characters or fewer!" },
              })}
              placeholder={isSignUp ? "Username" : "Username or email"}
              className="h-12 p-4"
            />
          </StyledFormField>
          {errors.username && <span className="mb-1 font-redhat text-sm text-red-600">{errors.username.message}</span>}

          {isSignUp && (
            <>
              <StyledFormField icon="icon-[material-symbols--mail-outline]" hasError={!!errors.email}>
                <Input
                  id="email"
                  type="email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: { value: emailRegex, message: "Enter a valid email address" },
                  })}
                  placeholder="Email"
                />
              </StyledFormField>
              {errors.email && <span className="mb-1 font-redhat text-sm text-red-600">{errors.email.message}</span>}
            </>
          )}

          <StyledFormField icon="icon-[fluent--key-20-filled]" hasError={!!errors.password}>
            <Input
              id="password"
              type="password"
              {...register("password", {
                required: "Password is required",
                pattern: {
                  value: passwordRegex,
                  message: "Password must contain at least 8 characters, 1 uppercase letter, 1 number, and 1 special character!",
                },
              })}
              placeholder="Password"
              autoComplete="current-password"
              className="h-12 p-4"
            />
          </StyledFormField>
          {errors.password && <span className="mb-1 font-redhat text-sm text-red-600">{errors.password.message}</span>}
        </>
      )}
      {isSignUp && (
        <>
          <StyledFormField icon="icon-[fluent--key-20-filled]" hasError={!!errors.retypePassword}>
            <Input
              id="retypePassword"
              type="password"
              {...register("retypePassword", {
                required: "Please retype your password",
                validate: (value) => value === password || "Passwords do not match!",
              })}
              placeholder="Retype Password"
              className="h-12 p-4"
            />
          </StyledFormField>
          {errors.retypePassword && <span className="mb-1 font-redhat text-sm text-red-600">{errors.retypePassword.message}</span>}
        </>
      )}
      {isResetPassword && (
        <>
          <StyledFormField icon="icon-[fluent--key-20-filled]" hasError={!!errors.newPassword}>
            <Input
              id="newPassword"
              type="password"
              {...register("newPassword", {
                required: "New password is required",
                pattern: {
                  value: passwordRegex,
                  message: "New password must contain at least 8 characters, 1 uppercase letter, 1 number, and 1 special character!",
                },
              })}
              placeholder="New Password"
              className="h-12 p-4"
            />
          </StyledFormField>
          {errors.newPassword && <span className="mb-1 font-redhat text-sm text-red-600">{errors.newPassword.message}</span>}

          <StyledFormField icon="icon-[fluent--key-20-filled]" hasError={!!errors.retypePassword}>
            <Input
              id="retypePassword"
              type="password"
              {...register("retypePassword", {
                required: "Please retype your new password",
                validate: (value) => value === watch("newPassword") || "Passwords do not match!",
              })}
              placeholder="Retype New Password"
              className="h-12 p-4"
            />
          </StyledFormField>
          {errors.retypePassword && <span className="mb-1 font-redhat text-sm text-red-600">{errors.retypePassword.message}</span>}
        </>
      )}
      <Button
        type="submit"
        className="w-full rounded-lg border bg-saseBlueLight p-5 font-semibold text-white"
        disabled={Object.keys(errors).length > 0}
      >
        {buttonLabel}
      </Button>
      {!isResetPassword && (
        <p className="text-md mt-4 text-center font-redhat">
          {linkText}{" "}
          {isEmailVerification ? (
            <Link to="/login" className="cursor-pointer text-saseBlue underline">
              Back to login.
            </Link>
          ) : isSignUp ? (
            <Link to={linkRoute} className="cursor-pointer text-saseBlue underline">
              Login here.
            </Link>
          ) : (
            <Link to="/email-verification" className="cursor-pointer text-saseBlue underline">
              Click here to reset.
            </Link>
          )}
        </p>
      )}
      {additionalButton && (
        <Link
          to={additionalButton.route}
          className="mt-3 flex h-16 w-full items-center justify-center rounded-2xl border border-gray-300 bg-transparent p-2 font-redhat text-base transition-colors hover:bg-saseBlueLight hover:text-white"
        >
          {additionalButton.text}
        </Link>
      )}
    </form>
  );
};

export default AuthForm;
