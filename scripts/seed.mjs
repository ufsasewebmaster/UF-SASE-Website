import { createClient } from "@libsql/client";
import "dotenv/config";

const client = createClient({
  url: "file:local.db",
});

//Users have username: testUser and testUser2, with passswords: ABC@1234, DEF@1234 respectively
(async () => {
  await client.batch([
    "INSERT OR IGNORE INTO user (id, username, password, time_added, time_updated, points, roles, email) VALUES ('hwurhw64luqmednj5xqh5suwzm', 'testUser', '$2a$10$F3TH05I6LGRLq3Ws6.NPlOwbXsbjtXCcBedjMuewuUVcmjLEMU1LW', 1738639335, 1738639335, 0, 'admin', 'testuser@gmail.com')",
    "INSERT OR IGNORE INTO user (id, username, password, time_added, time_updated, points, roles, email) VALUES ('n4cpqnzaf4cdmxzuwwlxmberpq', 'testUser2', '$2a$10$zi2/N.Ry3euMsMviLp9IvurB/jjf8nkuTUePmPFCNWTl4OZYkohla', 1738639335, 1738639335, 0, 'admin', 'testuser2@gmail.com')",
    "INSERT OR IGNORE INTO personal_info (user_id, first_name, last_name, phone, area_code) VALUES ('hwurhw64luqmednj5xqh5suwzm', 'Test', 'User', 1234567890, 123)",
    "INSERT OR IGNORE INTO personal_info (user_id, first_name, last_name, phone, area_code) VALUES ('n4cpqnzaf4cdmxzuwwlxmberpq', 'Test', 'User2', 1112223333, 111)",
    "INSERT OR IGNORE INTO professional_info (user_id, resume_path, linkedin, portfolio, majors, minors, graduation_semester) VALUES ('hwurhw64luqmednj5xqh5suwzm', 'ufsase.com', 'linkedin.com', 'github.com', 'Computer Science', 'Mathematics', 'Spring 2025')",
    "INSERT OR IGNORE INTO professional_info (user_id, resume_path, linkedin, portfolio, majors, minors, graduation_semester) VALUES ('n4cpqnzaf4cdmxzuwwlxmberpq', 'ufsase.com', 'linkedin.com', 'github.com', 'Computer Science', 'Statistics', 'Spring 2027')",
    "INSERT OR IGNORE INTO sase_info (user_id, events_attended, groups) VALUES ('hwurhw64luqmednj5xqh5suwzm', 'eventID', 'SASE')",
    "INSERT OR IGNORE INTO sase_info (user_id, events_attended, groups) VALUES ('n4cpqnzaf4cdmxzuwwlxmberpq', 'eventID', 'SASE')",
    "INSERT OR IGNORE INTO mentor_mentee_relationship (id, mentor_id, mentee_id) VALUES ('0', 'hwurhw64luqmednj5xqh5suwzm', 'n4cpqnzaf4cdmxzuwwlxmberpq')",
    `INSERT OR IGNORE INTO blog (id, title, content, author_id, published_date, time_updated) VALUES ('TEST_ID', 'My First Blog', 'This is the blog content.', 'hwurhw64luqmednj5xqh5suwzm', ${Date.now()}, ${Date.now()})`,
    "INSERT OR IGNORE INTO blog_tag (id, name) VALUES('0', 'testTag')",
    "INSERT OR IGNORE INTO blog_tag_relationship (id, blog_id, tag_id) VALUES('0', 'TEST_ID', '0')",
    `INSERT OR IGNORE INTO event (id, name, description, time_added, time_updated, location, start_time, end_time, involved_groups) VALUES ('0', 'TEST_EVENT', 'This is a test event', ${Date.now()}, ${Date.now()}, 'PLANET EARTH', ${Date.now()}, ${Date.now() + 600000}, 'SASE')`,
  ]);
})();
