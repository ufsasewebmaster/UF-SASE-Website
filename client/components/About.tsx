// This should not be this long! Organize things if there is any repetition

const About = () => {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center font-[Poppins]">
        <div className="max-w-7xl w-full px-4 py-8">
          {/* Header Section */}
          <header className="text-center mb-10">
            <h1 className="text-4xl font-bold text-gray-800">About Us</h1>
            <p className="mt-4 text-xl text-gray-600">
              "We help shape skills and provide knowledge that will help our members to succeed in the professional world"
            </p>
          </header>
  
          {/* General About Section */}
          <section className="mb-8 flex flex-col md:flex-row items-center md:items-start gap-12">
              {/* YouTube Video on the Left */}
              <div className="w-full md:w-3/5" style={{ height: '425px' }}>
                  <iframe
                  className="w-full h-full"
                  src="https://www.youtube.com/embed/JV9HAUhVet8"
                  title="UF SASE Video"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  ></iframe>
              </div>
  
              {/* About Text on the Right */}
              <div className="w-full md:w-2/5 bg-gray-200 border border-black p-5 rounded-2xl">
                  <p className="text-black">
                  The Society of Asian Scientists and Engineers (SASE) at UF was established in 2010 as a student organization dedicated to the advancement of Asian heritage scientists and engineers.
                  Above all, SASE is a welcoming community of driven individuals who celebrate culture and diversity, cultivating a unique balance between professional development and a supportive, fun community.
                  Through our general body meetings, socials, workshops, and internal mentorship program, we aim to build our members’ relationships, skills, and knowledge that will enable them to succeed.
                  We also offer an intramural program (SASE Sports), an engineering team (SET), and a leadership development program (SASE Interns).
                  UF SASE continues to provide more development opportunities to our members year after year, all while staying as welcoming as ever! Even if you’re not a STEM major, or of Asian heritage, SASE welcomes you with open arms.
                  </p>
              </div>
          </section>
  
          {/* Mission Section */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Our Mission</h2>
            <p className="text-gray-600 mb-4">
              To create a welcoming community where members:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              <li>
                Are able to help each other develop professionally, foster leadership skills, and excel academically
              </li>
              <li>
                Are inspired and encouraged to pursue their goals by creating their own opportunities
              </li>
              <li>
                Learn and understand how their own culture affects the workplace
              </li>
              <li>
                Actively contribute to the local community
              </li>
            </ul>
          </section>
  
          {/* History Section */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Our History</h2>
            <p className="text-gray-600 mb-4">
              Since being founded during the summer of 2010, the University of Florida chapter has had an abundant effort put forth for the development of our members.
            </p>
            <p className="text-gray-600 mb-4">
              This development is centered on five core values of our mission statement: leadership, professionalism, service, academics, and diversity. Our meetings and events are catered to ensure that not only our mission is being fulfilled, but also that a community of support among Asian heritage students is being built. We pride ourselves on our measurable successes but could not have done so without the help of our members, faculty, and sponsors.
            </p>
            <p className="text-gray-600 mb-4">
              Through events we have hosted in the past, such as our annual Quick Race or the Southeast Regional Conferences of 2014-2016, many of our members have been able to get involved in committees and take on leadership roles. Many of our other events allow students to develop professional skills that are essential for positions in industry, such as Mock Interviews with representatives from General Electric, or networking skills to grow lasting connections and relations, such as Lunch with Recruiters sponsored by Procter & Gamble, and informational sessions with Accenture, Medtronic, Dow Chemical, and Harris Corporations.
            </p>
            <p className="text-gray-600">
              Our SASE chapter is not only active on campus, but also within the Gainesville community. We have participated in a 5K raising money for a local robotics team and made dinner for the families at the Ronald McDonald House. We are also heavily involved in the Asian American Student Union at the University of Florida, taking part in their annual welcome assembly, hosting events with cultural and professional sub-organizations, and participating in discussions of current events and issues within the Asian-American community and beyond.
            </p>
            <div className="mt-5 text-center">
              <a
                href="https://ufsase.com/wp-content/uploads/2024/03/2024-2025-SASE-Constitution.docx.pdf"
                className="mt-6 inline-block bg-[#0f6cb6] text-white py-2 px-6 rounded-full hover:duration-300 transform hover:scale-105 transition duration-300"
                target="_blank"
                rel="noopener noreferrer"
              >
                2024-2025 SASE Constitution
              </a>
            </div>
          </section>
  
          {/* Timeline Section VERY VERY DRAFT */}
          <section className="mb-12">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Our Timeline</h2>
              <div className="overflow-x-auto">
                  <div className="relative flex space-x-8 whitespace-nowrap">
                  <div className="absolute left-0 right-0 top-1/2 transform -translate-y-1/2 border-t-2 border-gray-300"></div>
  
                  <div className="relative flex flex-col items-center">
                      <div className="w-64 h-auto bg-white border-4 border-blue-500 rounded-lg shadow-lg p-4 overflow-hidden break-words">
                      <p className="text-gray-600 text-sm">Inspire Awards 2023-24</p>
                      <h3 className="font-semibold text-lg">Strongest SASE Chapter</h3>
                      </div>
                  </div>
  
                  <div className="relative flex flex-col items-center">
                      <div className="w-64 h-auto bg-white border-4 border-green-500 rounded-lg shadow-lg p-4 overflow-hidden break-words">
                      <p className="text-gray-600 text-sm">May 2024</p>
                      <h3 className="font-semibold text-lg">Collegiate Star</h3>
                      <p className="text-gray-600 text-sm">Emely Chhu (UF SASE President)</p>
                      </div>
                  </div>
  
                  <div className="relative flex flex-col items-center">
                      <div className="w-64 h-auto bg-white border-4 border-blue-500 rounded-lg shadow-lg p-4 overflow-hidden break-words">
                      <p className="text-gray-600 text-sm">May 2024</p>
                      <h3 className="font-semibold text-lg">Student Organization of the Year</h3>
                      <p className="text-gray-600 text-sm">USSO</p>
                      </div>
                  </div>
  
                  <div className="relative flex flex-col items-center">
                      <div className="w-64 h-auto bg-white border-4 border-green-500 rounded-lg shadow-lg p-4 overflow-hidden break-words">
                      <p className="text-gray-600 text-sm">Apr 2024</p>
                      <h3 className="font-semibold text-lg">“Life Long Learner”</h3>
                      <p className="text-gray-600 text-sm">Excellence in Career Readiness</p>
                      </div>
                  </div>
  
                  <div className="relative flex flex-col items-center">
                      <div className="w-64 h-auto bg-white border-4 border-blue-500 rounded-lg shadow-lg p-4 overflow-hidden break-words">
                      <p className="text-gray-600 text-sm">Apr 2024</p>
                      <h3 className="font-semibold text-lg">Member of the Year</h3>
                      <p className="text-gray-600 text-sm">Sophia Dong</p>
                      </div>
                  </div>
  
                  <div className="relative flex flex-col items-center">
                      <div className="w-64 h-auto bg-white border-4 border-green-500 rounded-lg shadow-lg p-4 overflow-hidden break-words">
                      <p className="text-gray-600 text-sm">Inspire Awards 2022-23</p>
                      <h3 className="font-semibold text-lg">Most Improved Chapter</h3>
                      </div>
                  </div>
  
                  <div className="relative flex flex-col items-center">
                      <div className="w-64 h-auto bg-white border-4 border-blue-500 rounded-lg shadow-lg p-4 overflow-hidden break-words">
                      <p className="text-gray-600 text-sm">Jun 2023</p>
                      <h3 className="font-semibold text-lg">Gator Engineering Award of Excellence</h3>
                      </div>
                  </div>
  
                  <div className="relative flex flex-col items-center">
                      <div className="w-64 h-auto bg-white border-4 border-green-500 rounded-lg shadow-lg p-4 overflow-hidden break-words">
                      <p className="text-gray-600 text-sm">Jan 2022</p>
                      <h3 className="font-semibold text-lg">Collegiate Star</h3>
                      <p className="text-gray-600 text-sm">Honorable Mention: Ian Lai</p>
                      </div>
                  </div>
  
                  <div className="relative flex flex-col items-center">
                      <div className="w-64 h-auto bg-white border-4 border-blue-500 rounded-lg shadow-lg p-4 overflow-hidden break-words">
                      <p className="text-gray-600 text-sm">Jan 2022</p>
                      <h3 className="font-semibold text-lg">SRC 2021 Host</h3>
                      <p className="text-gray-600 text-sm">Hosted SASE South Regional Conference</p>
                      </div>
                  </div>
  
                  <div className="relative flex flex-col items-center">
                      <div className="w-64 h-auto bg-white border-4 border-green-500 rounded-lg shadow-lg p-4 overflow-hidden break-words">
                      <p className="text-gray-600 text-sm">Jan 2020</p>
                      <h3 className="font-semibold text-lg">Most Influential Chapter</h3>
                      <p className="text-gray-600 text-sm">Honorable Mention</p>
                      </div>
                  </div>
  
                  </div>
              </div>
          </section>
        </div>
      </div>
    );
  };
  
  export default About;