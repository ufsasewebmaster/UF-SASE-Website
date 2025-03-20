import { createClient } from "@libsql/client";
import "dotenv/config";
import { SERVER_ENV } from "../src/server/env";

const databaseUrl = SERVER_ENV.DATABASE_URL || "file:local.db";

const client = createClient({
  url: databaseUrl,
});

//Admin account info will be in ENV information (Google Drive)
//Username: testUser2 and password:DEF@1234 respectively
if (databaseUrl === "file:local.db") {
  (async () => {
    await client.batch([
      "INSERT OR REPLACE INTO user (id, username, password, time_added, time_updated, points, email) VALUES ('hwurhw64luqmednj5xqh5suwzm', 'ADMIN', '$2a$10$rNZx8xLCv59C2.yFGr/17.ewAWG8YNURu2nO95AkXz92ksI/gHTbe', 1738639335, 1738639335, 0, 'ufsase.webmaster.shared@gmail.com')",
      "INSERT OR REPLACE INTO user (id, username, password, time_added, time_updated, points, email) VALUES ('n4cpqnzaf4cdmxzuwwlxmberpq', 'testUser', '$2a$10$zi2/N.Ry3euMsMviLp9IvurB/jjf8nkuTUePmPFCNWTl4OZYkohla', 1738639335, 1738639335, 0, 'testuser2@gmail.com')",
      "INSERT OR REPLACE INTO roles (id, name) VALUES ('0', 'admin')",
      "INSERT OR REPLACE INTO roles (id, name) VALUES ('1', 'board')",
      "INSERT OR REPLACE INTO roles (id, name) VALUES ('2', 'user')",
      "INSERT OR REPLACE INTO user_roles_relationship (id, user_id, role) VALUES ('0', 'hwurhw64luqmednj5xqh5suwzm', 'admin')",
      "INSERT OR REPLACE INTO user_roles_relationship (id, user_id, role) VALUES ('1', 'n4cpqnzaf4cdmxzuwwlxmberpq', 'user')",
      "INSERT OR REPLACE INTO personal_info (user_id, first_name, last_name, phone, area_code) VALUES ('hwurhw64luqmednj5xqh5suwzm', 'ADMIN', 'ADMIN', 1234567890, 123)",
      "INSERT OR REPLACE INTO personal_info (user_id, first_name, last_name, phone, area_code) VALUES ('n4cpqnzaf4cdmxzuwwlxmberpq', 'Test', 'User', 1112223333, 111)",
      "INSERT OR REPLACE INTO professional_info (user_id, resume_path, linkedin, portfolio, majors, minors, graduation_semester) VALUES ('hwurhw64luqmednj5xqh5suwzm', 'ufsase.com', 'linkedin.com', 'github.com', 'Computer Science', 'Mathematics', 'Spring 2025')",
      "INSERT OR REPLACE INTO professional_info (user_id, resume_path, linkedin, portfolio, majors, minors, graduation_semester) VALUES ('n4cpqnzaf4cdmxzuwwlxmberpq', 'ufsase.com', 'linkedin.com', 'github.com', 'Computer Science', 'Statistics', 'Spring 2027')",
      "INSERT OR REPLACE INTO sase_info (user_id, events_attended, groups) VALUES ('hwurhw64luqmednj5xqh5suwzm', 'eventID', 'SASE')",
      "INSERT OR REPLACE INTO sase_info (user_id, events_attended, groups) VALUES ('n4cpqnzaf4cdmxzuwwlxmberpq', 'eventID', 'SASE')",
      "INSERT OR REPLACE INTO mentor_mentee_relationship (id, mentor_id, mentee_id) VALUES ('0', 'hwurhw64luqmednj5xqh5suwzm', 'n4cpqnzaf4cdmxzuwwlxmberpq')",
      `INSERT OR REPLACE INTO blog (id, title, content, author_id, published_date, time_updated) VALUES ('TEST_ID', 'My First Blog', 'This is the blog content.', 'hwurhw64luqmednj5xqh5suwzm', ${Date.now()}, ${Date.now()})`,
      "INSERT OR REPLACE INTO blog_tag (id, name) VALUES('0', 'testTag')",
      "INSERT OR REPLACE INTO blog_tag_relationship (id, blog_id, tag_id) VALUES('0', 'TEST_ID', '0')",
      `INSERT OR REPLACE INTO event (id, name, description, time_added, time_updated, location, start_time, end_time, involved_groups) VALUES ('0', 'TEST_EVENT', 'This is a test event', ${Date.now()}, ${Date.now()}, 'PLANET EARTH', ${Date.now()}, ${Date.now() + 600000}, 'SASE')`,
    ]);
  })();
}
