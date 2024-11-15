import saseLogo from "@/client/assets/SASELogo.png";
import { createFileRoute } from "@tanstack/react-router";
import { seo } from "../utils/seo";

export const Route = createFileRoute("/set")({
  meta: () => [
    ...seo({
      title: "SET | UF SASE",
      description: "UF Society of Asian Scientists & Engineers",
      image: saseLogo,
    }),
  ],
  component: () => {
    return (
      <>
        <div>This is where the content actually starts</div>
      </>
    );
  },
});
