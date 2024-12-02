import React from "react";

const ContactForm = () => {
  return (
    <div className="mx-auto max-w-5xl p-4">
      <h2 className="mb-4 text-lg font-medium text-gray-800">
        Have any questions or comments? Submit the form below and we will get in contact with you shortly!
      </h2>
      <form className="space-y-4">
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
              required
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
              required
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
            required
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
