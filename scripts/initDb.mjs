import fs from "fs";
import { createClient } from "@libsql/client";
import "dotenv/config";

let _client = null;

if (fs.existsSync("local.db")) {
  // Prevent some weird sync error if node process doesn't close properly
  if (_client && typeof _client.close === "function") {
    _client.close();
  }
  fs.rmSync("local.db");
}

_client = createClient({
  url: "file:local.db",
});
