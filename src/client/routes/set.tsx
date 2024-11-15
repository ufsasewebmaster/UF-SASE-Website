import star2 from "@assets/programs/interns/internstar.png";
import titleUnderline from "@assets/programs/interns/titleunderline.png";
import IG from "@assets/programs/set/SETGroup.png";
import IS from "@assets/programs/set/SETRobot.png";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/set")({
  component: () => {
    return (
      <div className="flex w-full flex-col items-center bg-white">
        {/* Header Section */}
        <div className="mt-16 flex w-full max-w-6xl flex-col px-4 md:flex-row">
          {/* Left Side: Heading */}
          <div className="flex items-center md:w-1/3">
            <div className="flex items-center">
              {/* Green Line */}
              <div
                className="mr-4 bg-[#7dc242]"
                style={{ width: "9px", height: "150px" }}
              ></div>
              <h1 className="font-oswald text-6xl text-black">
                SASE
                <br />
                ENGINEERING
                <br />
                TEAM
              </h1>
            </div>
          </div>
          {/* Right Side: Description with Shadow Background */}
          <div className="relative mt-8 md:mt-0 md:flex md:w-2/3 md:justify-end">
            {/* Container for shadow and text box */}
            <div className="relative md:max-w-[40rem]">
              {/* Shadow Background */}
              <div className="absolute -inset-0 translate-x-4 translate-y-8 transform rounded-2xl bg-[#7dc242]"></div>
              {/* Text Box */}
              <div className="relative flex h-full items-center rounded-2xl border border-black bg-neutral-100 p-3">
                <p className="font-redhat text-xl text-black">
                  <span className="font-bold">SASE Engineering Team (SET)</span>{" "}
                  collaborates with other members to execute projects for the
                  SASE community, honing your technical, communication, and
                  leadership skills. Throughout the process, members will gain{" "}
                  <span className="font-bold">
                    experience to add to your resume
                  </span>{" "}
                  and talk about during job interviews. SET members will also
                  obtain{" "}
                  <span className="font-bold">behind-the-scenes insights</span>{" "}
                  through project development and teamwork—valuable for future
                  leadership roles in and out of SASE.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Add Vertical Spacing */}
        <div className="mt-16"></div>

        {/* Image Section with Green Lines and Star */}
        <div className="relative w-full max-w-6xl px-4">
          {/* Top Green Line */}
          <img
            src={titleUnderline}
            alt="Green Line"
            className="absolute -top-6 left-0 right-0 w-full"
          />
          {/* Add Spacing */}
          <div className="mt-6"></div>
          {/* Image with Star */}
          <div className="relative">
            <img
              src={IG}
              alt="SET Image"
              className="w-full rounded-lg object-cover"
            />
            {/* Star at the bottom left */}
            <img
              src={star2}
              alt="Star"
              className="absolute bottom-0 left-0 h-24 w-24 translate-x-[-40px] translate-y-[20px]"
            />
          </div>
          {/* Add Spacing */}
          <div className="mb-6"></div>
          {/* Bottom Green Line */}
          <img
            src={titleUnderline}
            alt="Green Line"
            className="absolute -bottom-6 left-0 right-0 w-full"
          />
        </div>

        {/* Add Vertical Spacing */}
        <div className="mt-16"></div>

        {/* Past Projects Section */}
        <div className="flex w-full max-w-6xl flex-col px-4">
          {/* Heading with Green Line */}
          <div className="mb-8 flex items-center">
            <div
              className="mr-4 bg-[#7dc242]"
              style={{ width: "9px", height: "70px" }}
            ></div>
            <h2 className="font-raleway text-5xl font-medium text-[#363636]">
              Past Projects
            </h2>
          </div>
          {/* Content */}
          <div className="flex flex-col md:flex-row">
            {/* Image with Shadow */}
            <div className="relative md:w-1/2">
              {/* Shadow Background */}
              <div className="absolute inset-0 translate-x-4 translate-y-4 transform rounded-2xl bg-[#7dc242]"></div>
              <div className="relative">
                <img
                  src={IS}
                  alt="Past Project Image"
                  className="h-auto w-full rounded-2xl"
                />
              </div>
            </div>
            {/* Green Line and Centered Text */}
            <div className="flex items-center md:ml-8 md:w-1/2">
              {/* Green Line */}
              <div
                className="bg-[#7dc242]"
                style={{ width: "9px", height: "100%" }}
              ></div>
              {/* Centered Text */}
              <div className="ml-4 flex items-center justify-center">
                <p className="font-redhat text-3xl leading-relaxed text-black">
                  Last year, SET successfully developed a campus cleaner robot
                  designed to autonomously identify and pick up trash 🤖. This
                  innovative project not only helped keep our campus clean but
                  also provided valuable experience in robotics, programming,
                  and teamwork.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Add Vertical Spacing */}
        <div className="mt-16"></div>

        {/* Goals & Outcomes Section */}
        <div className="flex w-full max-w-6xl flex-col px-4">
          <div className="flex items-start">
            {/* Green Line */}
            <div
              className="mr-4 bg-[#7dc242]"
              style={{ width: "9px", height: "70px" }}
            ></div>
            <h2 className="font-raleway text-5xl font-medium text-black">
              Goals &amp; Outcomes
            </h2>
          </div>
          <div className="mt-8 grid grid-cols-1 gap-8 [grid-auto-rows:1fr] md:grid-cols-3">
            {/* Goal 1 */}
            <div className="relative h-full">
              {/* Shadow Background */}
              <div className="absolute inset-0 translate-x-4 translate-y-4 transform rounded-2xl bg-[#7dc242]"></div>
              <div className="relative flex h-full items-center rounded-2xl border border-black bg-neutral-100 p-6">
                <p className="font-redhat text-2xl text-black">
                  Get more involved in SASE, especially for first and second
                  years.
                </p>
              </div>
            </div>
            {/* Goal 2 */}
            <div className="relative h-full">
              {/* Shadow Background */}
              <div className="absolute inset-0 translate-x-4 translate-y-4 transform rounded-2xl bg-[#7dc242]"></div>
              <div className="relative flex h-full items-center rounded-2xl border border-black bg-neutral-100 p-6">
                <p className="font-redhat text-2xl text-black">
                  Develop essential technical skills and experiences to add to
                  your resume.
                </p>
              </div>
            </div>
            {/* Goal 3 */}
            <div className="relative h-full">
              {/* Shadow Background */}
              <div className="absolute inset-0 translate-x-4 translate-y-4 transform rounded-2xl bg-[#7dc242]"></div>
              <div className="relative flex h-full items-center rounded-2xl border border-black bg-neutral-100 p-6">
                <p className="font-redhat text-2xl text-black">
                  Connect with other SASErs and develop leadership skills
                  through hands-on projects.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Add Vertical Spacing */}
        <div className="mt-16"></div>

        {/* FAQs Section */}
        <div className="mb-16 flex w-full max-w-6xl flex-col px-4">
          <div className="flex items-start">
            {/* Green Line */}
            <div
              className="mr-4 bg-[#7dc242]"
              style={{ width: "9px", height: "70px" }}
            ></div>
            <h2 className="font-raleway text-5xl font-medium text-[#363636]">
              FAQs
            </h2>
          </div>
          <div className="mt-8 space-y-6">
            {/* FAQ Item 1 */}
            <div className="relative">
              {/* Shadow Background */}
              <div className="absolute inset-0 translate-x-2 translate-y-2 transform rounded-2xl bg-[#7dc242]"></div>
              <div className="relative overflow-hidden rounded-2xl border border-black bg-neutral-100">
                <div className="flex items-center justify-between p-4">
                  <p className="font-redhat text-2xl font-medium text-black">
                    What projects does SET work on?
                  </p>
                  <span className="text-3xl font-medium text-black">+</span>
                </div>
                {/* Answer can be added here if available */}
              </div>
            </div>
            {/* FAQ Item 2 */}
            <div className="relative">
              {/* Shadow Background */}
              <div className="absolute inset-0 translate-x-2 translate-y-2 transform rounded-2xl bg-[#7dc242]"></div>
              <div className="relative overflow-hidden rounded-2xl border border-black bg-neutral-100">
                <div className="flex items-center justify-between p-4">
                  <p className="font-redhat text-2xl font-medium text-black">
                    What does the time commitment look like?
                  </p>
                  <span className="text-3xl font-medium text-black">+</span>
                </div>
                {/* Answer can be added here if available */}
              </div>
            </div>
            {/* FAQ Item 3 */}
            <div className="relative">
              {/* Shadow Background */}
              <div className="absolute inset-0 translate-x-2 translate-y-2 transform rounded-2xl bg-[#7dc242]"></div>
              <div className="relative overflow-hidden rounded-2xl border border-black bg-neutral-100">
                <div className="flex items-center justify-between p-4">
                  <p className="font-redhat text-2xl font-medium text-black">
                    How do I sign up?
                  </p>
                  <span className="text-3xl font-medium text-black">-</span>
                </div>
                <div className="p-4">
                  <p className="font-redhat text-2xl text-black">
                    Applications for{" "}
                    <span className="font-bold">Fall 2024</span> are now closed,
                    but <span className="font-bold">Spring 2025</span>{" "}
                    applications will open next semester!
                  </p>
                </div>
              </div>
            </div>
            {/* FAQ Item 4 */}
            <div className="relative">
              {/* Shadow Background */}
              <div className="absolute inset-0 translate-x-2 translate-y-2 transform rounded-2xl bg-[#7dc242]"></div>
              <div className="relative overflow-hidden rounded-2xl border border-black bg-neutral-100">
                <div className="flex items-center justify-between p-4">
                  <p className="font-redhat text-2xl font-medium text-black">
                    I have more questions!
                  </p>
                  <span className="text-3xl font-medium text-black">-</span>
                </div>
                <div className="p-4">
                  <p className="font-redhat text-2xl text-black">
                    Feel free to ask your questions in the{" "}
                    <a
                      href="#"
                      className="font-medium text-[#7dc242] underline"
                    >
                      SASE Discord channel
                    </a>{" "}
                    or use the{" "}
                    <a
                      href="#"
                      className="font-medium text-[#7dc242] underline"
                    >
                      Contact Form
                    </a>
                    .
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Add Vertical Spacing */}
        <div className="mt-16"></div>
      </div>
    );
  },
});
