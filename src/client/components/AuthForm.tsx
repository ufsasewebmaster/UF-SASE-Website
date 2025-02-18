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
  additionalButton?: {
    text: string;
    route: string;
  };
}

export interface FormData {
  username: string;
  password: string;
  retypePassword?: string;
}

//only styling
const StyledFormField = ({ children, hasError, icon }: { children: React.ReactNode; icon?: string; hasError?: boolean }) => (
  <div className="relative mb-1 w-full">
    {icon && <span className={`pointer-events-none absolute left-3 top-[40%] z-10 h-5 w-5 -translate-y-1/2 text-gray-500 ${icon}`} />}
    {React.cloneElement(children as React.ReactElement, {
      className: `mb-3 rounded-lg border border-gray-300 bg-saseGreenLight p-4 pl-10 placeholder-black opacity-90 ${
        hasError ? "border-red-600" : ""
      }`,
    })}
  </div>
);

const AuthForm = ({ additionalButton, buttonLabel, errorMessage, isSignUp = false, linkRoute, linkText, onSubmit, title }: AuthFormProps) => {
  const {
    formState: { errors },
    handleSubmit,
    register,
    watch,
  } = useForm<FormData>({
    mode: "all",
    defaultValues: {
      username: "",
      password: "",
      retypePassword: "",
    },
  });

  const password = watch("password");
  const handleFormSubmit: SubmitHandler<FormData> = (data) => {
    // remove retypePassword before submitting
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { retypePassword, ...submitData } = data;
    onSubmit(submitData as FormData);
  };

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      noValidate
      className="relative z-10 flex h-[32rem] w-full max-w-md flex-col items-center justify-start overflow-y-auto rounded-lg border bg-gray-100 p-6 shadow-xl"
    >
      <div className="mb-6 p-2">
        <Logo />
      </div>
      <h3 className="heading mb-3 pb-2 text-center font-oswald text-4xl font-semibold">{title}</h3>
      {errorMessage && <div className="mb-3 w-full text-center text-sm text-red-600">{errorMessage}</div>}

      <StyledFormField icon="icon-[qlementine-icons--user-16]" hasError={!!errors.username}>
        <Input
          id="username"
          type="text"
          {...register("username", {
            required: { value: true, message: "Username is required" },
            minLength: {
              value: 4,
              message: "Username must be at least 4 characters!",
            },
            maxLength: {
              value: 12,
              message: "Username must be 12 characters or fewer!",
            },
          })}
          placeholder="Username"
          className="h-12 p-4"
        />
      </StyledFormField>
      {errors.username && <span className="mb-1 font-redhat text-sm text-red-600">{errors.username.message}</span>}

      <StyledFormField icon="icon-[fluent--key-20-filled]" hasError={!!errors.password}>
        <Input
          id="password"
          type="password"
          {...register("password", {
            required: "Password is required",
            pattern: {
              value: /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/,
              message: "Password must contain at least 8 characters, 1 uppercase letter, 1 number, and 1 special character!",
            },
          })}
          placeholder="Password"
          autoComplete="current-password"
        />
      </StyledFormField>
      {errors.password && <span className="mb-1 font-redhat text-sm text-red-600">{errors.password.message}</span>}

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

      <p className="text-md mt-4 text-center font-redhat">
        {linkText}{" "}
        <Link to={linkRoute} className="cursor-pointer text-saseBlue underline">
          {isSignUp ? "Login here." : "Click here to reset."}
        </Link>
      </p>

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
