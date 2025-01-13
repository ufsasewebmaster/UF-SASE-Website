import { createClient } from "@libsql/client";
import "dotenv/config";

const client = createClient({
  url: "file:local.db",
});

client.execute(
  "INSERT INTO user (id, username, password, time_added, time_updated, points, roles) VALUES ('0', 'test_username', 'test_hash', 0, 0, 0, 'admin')",
); // should populate users
// client.execute("INSERT INTO users (username, points, roles) VALUES ('test', 0, 'admin')"); // should populate users

(async () => {
  await client.execute(
    `INSERT INTO blog (id, title, content, author_id, published_date, time_updated, tags) 
      VALUES (?, ?, ?, ?, ?, ?, ?)`,
    ["TEST_ID", "My First Blog", "This is the blog content.", "0000", Date.now(), Date.now(), "1"],
  );
})();
