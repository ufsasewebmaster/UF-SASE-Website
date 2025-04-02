import { createFileRoute, useRouteContext, useRouter } from "@tanstack/react-router";

// import Fuse from "fuse.js";
// import { router } from "../client";

// const fuseOptions = {
//   // isCaseSensitive: false,
//   // includeScore: false,
//   // ignoreDiacritics: false,
//   // shouldSort: true,
//   // includeMatches: false,
//   // findAllMatches: false,
//   // minMatchCharLength: 1,
//   // location: 0,
//   // threshold: 0.6,
//   // distance: 100,
//   // useExtendedSearch: false,
//   // ignoreLocation: false,
//   // ignoreFieldNorm: false,
//   // fieldNormWeight: 1,
//   keys: ["title", "author.firstName"],
// };

// const fuse = new Fuse(list, fuseOptions);

// // Change the pattern
// const searchPattern = "Jeev";

// console.log(fuse.search(searchPattern));

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

    return (
      <div>
        <h1 className="mb-4 text-2xl font-bold">About</h1>
        {metaTagsList.map((metaTags, index) => (
          <div key={index}>
            <pre>{JSON.stringify(metaTags, null, 2)}</pre>
          </div>
        ))}
      </div>
    );
  },
});
