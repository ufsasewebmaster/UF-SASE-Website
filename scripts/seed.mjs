import { createClient } from "@libsql/client";

const client = createClient({
  url: "file:local.db",
});

client.query("INSERT INTO todo (title, completed) VALUES ('Learn vim', 0)");
