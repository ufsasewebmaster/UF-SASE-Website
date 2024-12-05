import { createClient } from "@libsql/client";
import "dotenv/config";

const client = createClient({
  url: "file:local.db",
});

(async () => {
  try {
    // Log existing tables for debugging
    // const tables = await client.execute(`SELECT name FROM sqlite_master WHERE type='table';`);
    // console.log("Existing tables:", tables.rows);

    // Insert into the 'user' table
    await client.execute(
      "INSERT INTO user (id, username, password_hash, time_added, time_updated, points, roles) VALUES ('0000', 'test_username', 'test_hash', 0, 0, 0, 'admin')",
    );

    // Insert into the 'blog' table
    await client.execute(
      `INSERT INTO blog (id, title, content, author_id, published_date, time_updated, tags) 
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        "TEST_ID", // Blog ID
        "My First Blog", // Title
        "This is the blog content.", // Content
        "0000", // Author ID (matches user.id)
        Date.now(), // Published date
        Date.now(), // Time updated
        "1", // Tags
      ],
    );
  } catch (error) {
    console.error("Error during seeding:", error);
  }
})();
