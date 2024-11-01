/// <reference types="vinxi/types/server" />
import { createRouter } from "@/client/router";
import { getRouterManifest } from "@tanstack/start/router-manifest";
import {
  createStartHandler,
  defaultStreamHandler,
} from "@tanstack/start/server";

export default createStartHandler({
  createRouter: createRouter as never, // todo: why does this error?
  getRouterManifest,
})(defaultStreamHandler);
