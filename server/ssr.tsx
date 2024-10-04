import { createMemoryHistory } from "@tanstack/react-router";
import { StartServer } from "@tanstack/start/server";
import ReactDOMServer from "react-dom/server";
import { eventHandler, getRequestURL } from "vinxi/http";
import { getManifest } from "vinxi/manifest";
import { createRouter } from "../client/router";

export default eventHandler(async (event) => {
  const router = createRouter();

  const clientManifest = getManifest("client");
  const clientHandler = clientManifest.inputs[clientManifest.handler];
  const scriptSrc = clientHandler.output.path;

  const url = getRequestURL(event);

  const memoryHistory = createMemoryHistory({
    initialEntries: [url.pathname],
  });

  router.update({
    history: memoryHistory,
  });

  await router.load();

  const base =
    import.meta.env.BASE_URL === "/" ? undefined : import.meta.env.BASE_URL;

  const stream = await new Promise<ReactDOMServer.PipeableStream>((resolve) => {
    const stream = ReactDOMServer.renderToPipeableStream(
      <StartServer router={router} />,
      {
        onShellReady() {
          resolve(stream);
        },
        bootstrapModules: [scriptSrc],
        bootstrapScriptContent: `
          window.manifest = ${JSON.stringify(clientManifest.json())}
          window.base = ${JSON.stringify(base)}
        `,
      },
    );
  });

  event.node.res.setHeader("Content-Type", "text/html");
  event.node.res.statusCode = router.hasNotFoundMatch() ? 404 : 200;
  return stream;
});
