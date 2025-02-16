import { cn } from "@/shared/utils";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@ui/button";
import { Input } from "@ui/input";
import type { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";
import { Logo } from "../components/navigation/Logo";

interface ForgotPasswordFormData {
  email: string;
}

const Password = () => {
  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<ForgotPasswordFormData>({
    mode: "onBlur",
  });

  const onSubmit: SubmitHandler<ForgotPasswordFormData> = (data) => {
    console.log("Reset request submitted for:", data.email);
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className={cn(
          "relative z-10 flex h-[32em] w-[26rem] flex-col items-center justify-start",
          "rounded-2xl border bg-gray-100 p-8",
          "shadow-[8px_8px_0px_#2C6BED,-8px_-8px_0px_#71B840]",
        )}
      >
        <div className="mb-6 p-2">
          <Logo />
        </div>
        <h3 className="heading mb-4 text-center font-oswald text-4xl font-semibold">Forgot Password</h3>
        <p className="mb-8 text-center text-gray-600">Please type the email associated with the account</p>

        <div className="relative mb-6 w-full">
          <span
            className={cn("pointer-events-none absolute left-3 top-[40%] z-10 h-5 w-5 -translate-y-1/2 text-gray-500", "icon-[mdi--email-outline]")}
          />
          <Input
            id="email"
            type="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                message: "Enter a valid email address",
              },
            })}
            placeholder="Email"
            className={cn(
              "rounded-2xlg mb-6 border border-gray-300 bg-saseGreenLight p-4 pl-10",
              "placeholder-black opacity-90",
              errors.email && "border-red-600",
            )}
          />
        </div>
        {errors.email && <span className="mb-4 font-redhat text-sm text-red-600">{errors.email.message}</span>}

        <Button
          type="submit"
          className={cn(
            "w-full rounded-lg border border-gray-300 bg-white p-5",
            "font-semibold text-black transition-colors duration-300 ease-in-out",
            "hover:bg-saseBlueLight hover:text-white",
            errors.email && "cursor-not-allowed opacity-50",
          )}
          disabled={!!errors.email}
        >
          Send Email Verification
        </Button>

        <p className="text-md mt-6 text-center font-redhat">
          <Link to="/login" className="cursor-pointer text-saseBlue underline">
            Back to Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export const Route = createFileRoute("/password")({
  component: Password,
});
