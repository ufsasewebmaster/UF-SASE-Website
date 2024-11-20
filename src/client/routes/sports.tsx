import { imageUrls } from "@assets/imageUrls";
import { createFileRoute } from "@tanstack/react-router";
import { seo } from "../utils/seo";

export const Route = createFileRoute("/sports")({
  meta: () => [
    ...seo({
      title: "Sports | UF SASE",
      description: "UF Society of Asian Scientists & Engineers",
      image: imageUrls["SASELogo.png"],
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
