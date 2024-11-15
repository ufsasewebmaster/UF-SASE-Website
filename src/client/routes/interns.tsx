import saseLogo from "@/client/assets/SASELogo.png";
import { createFileRoute } from "@tanstack/react-router";
import { seo } from "../utils/seo";

export const Route = createFileRoute("/interns")({
  meta: () => [
    ...seo({
      title: "Interns | UF SASE",
      description: "UF Society of Asian Scientists & Engineers",
      image: saseLogo,
    }),
  ],

  component: () => {
    return (
      <>
        <div>This is where the content actually starts</div>
        <div className="icon-[mdi--instagram] h-40 w-40" />
      </>
    );
  },
});
