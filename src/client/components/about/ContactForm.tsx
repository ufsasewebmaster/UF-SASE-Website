import React from "react";
import type { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

export interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  message: string;
}
const notify = () =>
  toast.success("Thanks for your feedback!", {
    position: "bottom-center",
  });

const ContactForm = () => {
  const { handleSubmit, register, reset } = useForm<FormData>({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      message: "",
    },
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    notify();
    reset();
    const url = "/api/contact/submit";
    try {
      const resp = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (!resp.ok) {
        throw new Error(`Response status: ${resp.status}"`);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="mx-auto max-w-5xl p-4">
      <h2 className="mb-4 text-lg font-medium text-gray-800">
        Have any questions or comments? Submit the form below and we will get in contact with you shortly!
      </h2>
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <div className="-mx-2 flex flex-wrap">
          <div className="mb-4 w-1/2 px-2">
            <label htmlFor="firstName" className="block text-sm font-semibold text-gray-700">
              Name <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              id="firstName"
              placeholder="First"
              className="mt-1 w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:ring-blue-500"
              {...register("firstName", { required: "This is required.", maxLength: 256 })}
            />
          </div>
          <div className="mb-4 w-1/2 px-2">
            <label htmlFor="lastName" className="block text-sm font-semibold text-gray-700">
              &nbsp;
            </label>
            <input
              type="text"
              id="lastName"
              placeholder="Last"
              className="mt-1 w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:ring-blue-500"
              {...register("lastName", { required: "This is required.", maxLength: 256 })}
            />
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-semibold text-gray-700">
            Email <span className="text-red-600">*</span>
          </label>
          <input
            type="email"
            id="email"
            placeholder="Email"
            className="mt-1 w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:ring-blue-500"
            {...register("email", { required: "Email is required.", minLength: 4, maxLength: 256 })}
          />
        </div>

        <div className="mb-4">
          <label htmlFor="message" className="block text-sm font-semibold text-gray-700">
            Comment or Message
          </label>
          <textarea
            id="message"
            rows={4}
            placeholder="Your message"
            className="mt-1 w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:ring-blue-500"
            {...register("message", { required: "Message cannot be empty", maxLength: { value: 3000, message: "Message is too long." } })}
          ></textarea>
        </div>
        <button
          type="submit"
          className="w-full rounded-md bg-saseBlue p-2 font-medium text-white transition duration-300 hover:bg-saseGreen hover:text-black"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
