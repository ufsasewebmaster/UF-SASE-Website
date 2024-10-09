  import fs from "fs";
  import { createClient } from "@libsql/client";
  import "dotenv/config";

  if (fs.existsSync("local.db")) {
    fs.rmSync("local.db");
  }

  const _client = createClient({
    url: "file:local.db",
  });
