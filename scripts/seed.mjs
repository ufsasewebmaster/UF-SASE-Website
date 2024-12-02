import { createClient } from "@libsql/client";
import "dotenv/config";

const client = createClient({
  url: "file:local.db",
});

client.execute("INSERT INTO user (username, points, roles) VALUES ('test', 0, 'admin')"); // should populate users
client.execute("INSERT INTO users (username, points, roles) VALUES ('test', 0, 'admin')"); // should populate users

(async () => {
  await client.execute(
    `INSERT INTO blog (id, title, content, author_id, published_date) 
      VALUES (?, ?, ?, ?)`,
    ["My First Blog", "This is the blog content.", "UF Historian", Date.now()],
  );
})();
