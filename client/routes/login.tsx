import { Page } from "@components/Page";
import { Logo } from "@navigation/Logo";
import { useMutation } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@ui/button";
import { Input } from "@ui/input";
import { useForm } from "react-hook-form";

interface FormData {
  username: string;
  password: string;
}

export const Route = createFileRoute("/login")({
  component: () => {
    const {
      formState: { errors },
      handleSubmit,
      register,
    } = useForm<FormData>();

    const mutation = useMutation({
      mutationFn: async (formData: FormData) => {
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
      },
      onSuccess: () => {
        console.log("Data submitted successfully!");
      },
      onError: (error) => {
        console.error("Error submitting data:", error);
      },
    });

    const onSubmit = (data: FormData) => {
      mutation.mutate(data);
    };

    return (
      <Page>
        <div className="relative flex min-h-screen items-center justify-center">
          {/* Shadow Card 1 */}
          <div className="absolute left-1/2 z-0 -ml-4 mt-6 h-[32rem] w-full max-w-md -translate-x-1/2 -translate-y-6 transform rounded-lg bg-saseGreen opacity-100 shadow-lg"></div>

          {/* Shadow Card 2 (Right) */}
          <div className="absolute right-1/2 z-0 -mr-4 mt-20 h-[31.5rem] w-full max-w-md -translate-y-6 translate-x-1/2 transform rounded-lg bg-saseBlue opacity-100 shadow-lg"></div>

          {/* Login Form Container */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="border-gray relative z-10 flex h-[32rem] w-full max-w-md flex-col items-center justify-center rounded-lg border bg-gray-100 p-6 shadow-xl"
          >
            <div className="mb-6 p-2">
              <Logo />
            </div>
            <h3 className="heading mb-3 pb-2 text-center font-redhat text-4xl font-semibold">
              Login
            </h3>
            <p className="mb-4 text-center text-lg"> Sign in to your account</p>

            <Input
              type="text"
              {...register("username", {
                required: "Username is required",
                maxLength: {
                  value: 12,
                  message: "Username must be 12 characters or fewer!",
                },
              })}
              placeholder="Username"
              className={`mb-4 rounded-lg border border-gray-300 bg-saseGreen p-5 placeholder-black opacity-90 ${errors.username ? "border-red-600" : ""}`}
            />
            {errors.username && (
              <span className="errorMessage mb-4 text-red-600">
                {errors.username.message}
              </span>
            )}

            <Input
              type="password"
              {...register("password", {
                required: "Password is required",
                pattern: {
                  value: /^(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/,
                  message:
                    "Password must be longer than 8 characters, contain a number and a special character!",
                },
              })}
              placeholder="Password"
              className={`mb-4 rounded-lg border border-gray-300 bg-saseGreen p-5 placeholder-black opacity-90 ${errors.password ? "border-red-600" : ""}`}
            />
            {errors.password && (
              <span className="errorMessage mb-4 text-red-600">
                {errors.password.message}
              </span>
            )}

            <Button
              type="submit"
              className="w-full rounded-lg border border-gray-300 bg-saseBlue p-5 text-white"
            >
              Login
            </Button>
          </form>
        </div>
      </Page>
    );
  },
});
