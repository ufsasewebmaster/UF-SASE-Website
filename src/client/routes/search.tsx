import { createFileRoute, useRouter } from "@tanstack/react-router";
import Fuse from "fuse.js";

export const Route = createFileRoute("/search")({
  component: () => {
    const router = useRouter();
    const routes = router.flatRoutes;
    const metaTagsList: Array<object> = [];
    routes.forEach((route) => {
      const meta_tags =
        route.options.meta &&
        route.options.meta({
          matches: [],
          match: route.id,
          params: {},
          loaderData: null,
        });
      if (meta_tags) {
        const meta_info = {
          path: route.id,
          title: meta_tags[0]?.title || "",
          description: meta_tags[1]?.content || "",
        };
        metaTagsList.push(meta_info);
      }
    });

    const fuseOptions = {
      // isCaseSensitive: false,
      includeScore: true,
      // ignoreDiacritics: false,
      shouldSort: true,
      // includeMatches: false,
      // findAllMatches: false,
      // minMatchCharLength: 1,
      // location: 0,
      // threshold: 0.6,
      distance: 200,
      useExtendedSearch: true,
      // ignoreLocation: false,
      // ignoreFieldNorm: false,
      // fieldNormWeight: 1,
      keys: ["title", "description"],
    };

    const fuse = new Fuse(metaTagsList, fuseOptions);

    // Change the pattern
    const searchPattern = "Pickleball";

    return (
      <div>
        <h1 className="mb-4 text-2xl font-bold">About</h1>
        <pre>{JSON.stringify(fuse.search(searchPattern), null, 2)}</pre>
      </div>
    );
  },
});
