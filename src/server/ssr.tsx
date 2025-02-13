/// <reference types="vinxi/types/server" />
import { getRouterManifest } from "@tanstack/start/router-manifest";
import { createStartHandler, defaultStreamHandler } from "@tanstack/start/server";
import { createRouter } from "../client/router";

// Unknown :X
const handler = createStartHandler({
  createRouter,
  getRouterManifest,
})(defaultStreamHandler) as unknown;

export default handler;
