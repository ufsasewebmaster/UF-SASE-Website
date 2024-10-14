import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: () => {
    return (
      <div className="flex flex-col items-center">
        <div className="mb-12 flex w-full flex-col items-center rounded-md border border-solid border-black p-12">
          <h1 className="mb-4 text-4xl font-bold">
            UF Society of Asian Scientists and Engineers
          </h1>
          <p className="mb-4 text-lg">
            SASE is dedicated to the advancement of Asian heritage scientists
            and engineers in education and employment so that they can achieve
            their full career potential.
          </p>
          <button className="rounded-md border border-solid border-black p-6">
            LinkTree
          </button>
        </div>

        <div className="flex flex-col items-center p-12">
          <h1 className="mb-4 text-3xl font-bold">Our Mission</h1>
          <div className="flex flex-col items-stretch sm:flex-col md:flex-row">
            <div className="m-10 flex w-10/12 flex-col items-center rounded-md border border-solid border-black p-12">
              <p className="mb-4 text-lg font-bold">Professional Development</p>
              <p className="text-lg">
                Prepares Asian heritage students for success in the
                transnational, global business world.
              </p>
            </div>
            <div className="m-10 flex w-10/12 flex-col items-center rounded-md border border-solid border-black p-12">
              <p className="mb-4 text-lg font-bold">Diversity</p>
              <p className="text-lg">
                Promotes diversity and tolerance on campuses and in the
                workplace.
              </p>
            </div>
            <div className="m-10 flex w-10/12 flex-col items-center rounded-md border border-solid border-black p-12">
              <p className="mb-4 text-lg font-bold">Community</p>
              <p className="text-lg">
                Provides opportunities for its members to make contributions to
                their local communities.
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col p-12">
          <h1 className="mb-4 self-center text-3xl font-bold">
            SASE – University of Florida Chapter
          </h1>
          <p className="mb-4 text-lg">
            The Society of Asian Scientists & Engineers is a vibrant and dynamic
            organization at the University of Florida. We are committed to
            fostering meaningful connections across cultures and empowering
            Asian Pacific Islander Desi American (APIDA) professionals in
            science and engineering. Our mission is to support our members in
            reaching their full potential and succeeding in their careers.
          </p>
          <p className="mb-4 text-lg">
            Through engaging meetings and events, we provide a nurturing
            environment where you can acquire essential skills and knowledge to
            excel in the professional world. Our inclusive community welcomes
            individuals from all majors, offering a friendly atmosphere to help
            you secure internships, jobs, and network with like-minded peers.
            Beyond personal growth, we are dedicated to making a positive impact
            in our local communities. By celebrating diversity and embracing our
            heritage, we create opportunities for our members to contribute
            meaningfully to society.
          </p>
          <p className="mb-4 text-lg">
            Stay connected with us on Discord, Instagram, Facebook, and LinkedIn
            to be a part of this inspiring journey. Further, check out our
            Linktree for important links. Together, let’s chart a course towards
            success and progress!
          </p>

          <div className="flex flex-col self-center sm:flex-col md:flex-row">
            <button className="m-6 rounded-md border border-solid border-black p-6">
              LinkTree
            </button>
            <button className="m-6 rounded-md border border-solid border-black p-6">
              Discord
            </button>
            <button className="m-6 rounded-md border border-solid border-black p-6">
              Instagram
            </button>
            <button className="m-6 rounded-md border border-solid border-black p-6">
              LinkedIn
            </button>
            <button className="m-6 rounded-md border border-solid border-black p-6">
              Facebook
            </button>
          </div>
        </div>

        <h1 className="m-12 border-l-4 border-black pl-2 text-2xl font-semibold italic">
          "We provide a nurturing environment where you can acquire essential
          skills and knowledge to excel in the professional world."
        </h1>

        <h1 className="mb-4 text-3xl font-bold">Promotional Video</h1>
        <div className="m-12 h-80 w-10/12 border border-solid border-black">
          Insert Video Here
        </div>

        <h1 className="mb-4 text-3xl font-bold">FAQs</h1>
        <h1 className="mb-4 text-3xl font-bold">Our Values</h1>
        <h1 className="mb-4 text-3xl font-bold">Latest Blogs</h1>
      </div>
    );
  },
});
