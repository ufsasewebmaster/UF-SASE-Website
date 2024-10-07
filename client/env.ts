import { createEnv } from "@t3-oss/env-core";

// import { z } from "zod";

// This parses the enviorment variables according to a zod schema and provides them to the client

export const CLIENT_ENV = createEnv({
  clientPrefix: "VITE_",
  client: {},
  runtimeEnv: import.meta.env,
});
