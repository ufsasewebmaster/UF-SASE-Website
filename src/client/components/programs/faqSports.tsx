export const faqData: Array<{ question: string; answer: string | React.ReactNode }> = [
  {
    question: "How do I sign up?",
    answer: (
      <>
        Keep an eye out for <strong>Spring 2025</strong> part 1 and 2 intramural signups on UF SASE’s{" "}
        <a href="https://www.instagram.com/ufsase/" target="_blank" rel="noopener noreferrer" className="text-saseGreen underline">
          Instagram
        </a>{" "}
        and{" "}
        <a href="http://discord.gg/q3HBeC5" target="_blank" rel="noopener noreferrer" className="text-saseGreen underline">
          Discord
        </a>
        ! Also, look out for casual SASE sports which are open to everybody, no signup needed! These are announced on the casual-sports Discord
        channel as well as the UF{" "}
        <a href="https://www.instagram.com/ufsasesports/" target="_blank" rel="noopener noreferrer" className="text-saseGreen underline">
          SASE Sports Instagram
        </a>
        .
      </>
    ),
  },
  {
    question: "What if I am not experienced in sports?",
    answer: "The number one goal of SASE sports is to have fun and meet new people! SASE sports is a great space to try out new things :)",
  },
  {
    question: "What does the time commitment look like?",
    answer:
      "Intramural sports have a commitment of an hour a week for games, plus any casual practices the team decides to hold! Casual sports have no time commitment!",
  },
  {
    question: "I have more questions!",
    answer: (
      <>
        Feel free to ask your questions in the{" "}
        <a href="http://discord.gg/q3HBeC5" target="_blank" rel="noopener noreferrer" className="text-saseGreen underline">
          SASE Discord channel
        </a>{" "}
        or contact our Sports Coordinators, Alex and Jessica, through Discord!
      </>
    ),
  },
];
