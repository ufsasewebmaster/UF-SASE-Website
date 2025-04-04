import { createClient } from "@libsql/client";
import bcrypt from "bcryptjs";
import "dotenv/config";
import { SERVER_ENV } from "@server/env";

const client = createClient({
  url: SERVER_ENV.DATABASE_URL,
  authToken: SERVER_ENV.DATABASE_AUTH_TOKEN,
});

// Get admin credentials from environment variables
const ADMIN_USERNAME = process.env.ADMIN_USERNAME || "ADMIN";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "Saseadmin@123";
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "admin@example.com";

const TEST_USERNAME = process.env.TEST_USERNAME || "TEST";
const TEST_PASSWORD = process.env.TEST_PASSWORD || "Sasetest@123";
const TEST_EMAIL = process.env.TEST_EMAIL || "test@example.com";

(async () => {
  const adminHash = await bcrypt.hash(ADMIN_PASSWORD, 10);
  const testHash = await bcrypt.hash(TEST_PASSWORD, 10);

  // Essential data
  await client.batch([
    "INSERT OR IGNORE INTO roles (id, name) VALUES ('0', 'admin');",
    "INSERT OR IGNORE INTO roles (id, name) VALUES ('1', 'board');",
    "INSERT OR IGNORE INTO roles (id, name) VALUES ('2', 'user');",
  ]);

  // One admin and normal user account
  await client.batch([
    `INSERT OR IGNORE INTO user (id, username, password, time_added, time_updated, points, email)
     VALUES ('ricky-admin-id', '${ADMIN_USERNAME}', '${adminHash}', strftime('%s','now'), strftime('%s','now'), 0, '${ADMIN_EMAIL}');`,
    `INSERT OR IGNORE INTO user (id, username, password, time_added, time_updated, points, email)
     VALUES ('test-user-id', '${TEST_USERNAME}', '${testHash}', strftime('%s','now'), strftime('%s','now'), 0, '${TEST_EMAIL}');`,
  ]);
  await client.batch([
    "INSERT OR IGNORE INTO user_roles_relationship (id, user_id, role) VALUES ('ricky-role', 'ricky-admin-id', 'admin');",
    "INSERT OR IGNORE INTO user_roles_relationship (id, user_id, role) VALUES ('test-role', 'test-user-id', 'user');",
  ]);
  //Insert dummy data for personal and professional info
  await client.batch([
    "INSERT OR IGNORE INTO personal_info (user_id, first_name, last_name, phone, area_code) VALUES ('ricky-admin-id', 'Ricky', 'Admin', '1234567890', 123);",
    "INSERT OR IGNORE INTO personal_info (user_id, first_name, last_name, phone, area_code) VALUES ('test-user-id', 'Test', 'User', '0987654321', 456);",
    "INSERT OR IGNORE INTO professional_info (user_id, resume_path, linkedin, portfolio, majors, minors, graduation_semester) VALUES ('ricky-admin-id', 'path/to/resume.pdf', 'https://linkedin.com', 'https://portfolio.com/', 'Computer Science', 'Mathematics', 'Spring 2025');",
    "INSERT OR IGNORE INTO professional_info (user_id, resume_path, linkedin, portfolio, majors, minors, graduation_semester) VALUES ('test-user-id', 'path/to/resume.pdf', 'https://linkedin.com', 'https://portfolio.com/', 'Computer Science', 'Finance', 'Spring 2025');",
  ]);

  console.log("Essential seeding complete.");
})();
