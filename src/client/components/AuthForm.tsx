import { Link } from "@tanstack/react-router";
import { Button } from "@ui/button";
import { Input } from "@ui/input";
import type { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";
import { Logo } from "./navigation/Logo";

interface AuthFormProps {
  onSubmit: (data: FormData) => void;
  title: string;
  buttonLabel: string;
  linkText: string;
  linkRoute: string;
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

const AuthForm = ({
  additionalButton,
  buttonLabel,
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
  } = useForm<FormData>({
    mode: "onChange",
    reValidateMode: "onSubmit",
  });

  const password = watch("password");
  const handleFormSubmit: SubmitHandler<FormData> = (data) => {
    onSubmit(data);
  };
  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className="relative z-10 flex h-[32rem] w-full max-w-md flex-col items-center justify-start overflow-y-auto rounded-lg border bg-gray-100 p-6 shadow-xl"
    >
      <div className="mb-6 p-2">
        <Logo />
      </div>
      <h3 className="heading mb-3 pb-2 text-center text-4xl font-semibold">
        {title}
      </h3>

      <Input
        id="username"
        type="text"
        {...register("username", {
          required: { value: true, message: "Username is required" },
          minLength: {
            value: 4,
            message: "Username must be at least 4 characters",
          },
          maxLength: {
            value: 12,
            message: "Username must be 12 characters or fewer!",
          },
        })}
        placeholder="Username"
        className={`mb-4 rounded-lg border border-gray-300 bg-saseGreenLight p-5 placeholder-black opacity-90 ${
          errors.username ? "border-red-600" : ""
        }`}
      />
      {errors.username && (
        <span className="text-sm text-red-600 mb-1 font-redhat">
          {errors.username.message}
        </span>
      )}

      <Input
        id="password"
        type="password"
        {...register("password", {
          required: "Password is required",
          pattern: {
            value:
              /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/,
            message:
              "Password must contain at least 8 characters, 1 uppercase letter, 1 number, and 1 special character",
          },
        })}
        placeholder="Password"
        className={`mb-4 rounded-lg border border-gray-300 bg-saseGreenLight p-5 placeholder-black opacity-90 ${
          errors.password ? "border-red-600" : ""
        }`}
        autoComplete="current-password"
      />
      {errors.password && (
        <span className="text-sm text-red-600 mb-1 font-redhat">
          {errors.password.message}
        </span>
      )}
      {isSignUp && (
        <Input
          id="retypePassword"
          type="password"
          {...register("retypePassword", {
            required: "Please retype your password",
            validate: (value) => value === password || "Passwords do not match",
          })}
          placeholder="Retype Password"
          className={`mb-4 rounded-lg border border-gray-300 bg-saseGreenLight p-5 placeholder-black opacity-90 ${
            errors.retypePassword ? "border-red-600 font-redhat" : ""
          }`}
        />
      )}
      {errors.retypePassword && (
        <span className="text-sm text-red-600 mb-1 font-redhat">
          {errors.retypePassword.message}
        </span>
      )}

      <Button
        type="submit"
        className="w-full rounded-lg border bg-saseBlueLight p-5 font-semibold text-white"
        disabled={Object.keys(errors).length > 0}
      >
        {buttonLabel}
      </Button>

      <p className="mt-4 text-center font-redhat text-md">
        {linkText}{" "}
        <Link to={linkRoute} className="cursor-pointer text-saseBlue underline">
          {isSignUp ? "Login here." : "Click here to reset."}
        </Link>
      </p>

      {additionalButton && (
        <Link
          to={additionalButton.route}
          className="mt-3 w-full h-16 rounded-2xl border border-gray-300 bg-transparent p-2 flex items-center justify-center font-oswald text-base transition-colors hover:bg-saseBlueLight hover:text-white"
        >
          {additionalButton.text}
        </Link>
      )}
    </form>
  );
};

export default AuthForm;
