import { db } from "@/server/db/db";
import { createErrorResponse, createSuccessResponse } from "@/shared/utils";
import * as Schema from "@db/tables";
import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";
import { Hono } from "hono";
import { generateIdFromEntropySize } from "lucia";

const { compare, genSalt, hash } = bcrypt;

const authRoutes = new Hono();

// Signup route
authRoutes.post("/auth/signup", async (c) => {
  const formData = await c.req.json();
  const formUsername = formData["username"];
  const formPassword = formData["password"];
  const formEmail = formData["email"];
  const passwordRegex = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*!@#$%^&*()\-_=+\\|[{}\];:'",<>./?])[A-Za-z\d!@#$%^&*()\-_=+\\|[{}\];:'",<>./?]{8,}$/;
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  //validate username
  if (!formUsername || typeof formUsername !== "string") {
    return createErrorResponse(c, "INVALID_USERNAME", "Invalid username!", 400);
  }
  //validate password
  if (!formPassword || typeof formPassword !== "string" || !passwordRegex.test(formPassword)) {
    return createErrorResponse(c, "INVALID_PASSWORD", "Invalid password from regex", 400);
  }
  //validate email
  // add 3rd validation for email using regular expressions
  if (!formEmail || typeof formEmail !== "string" || !emailRegex.test(formEmail)) {
    return createErrorResponse(c, "INVALID_EMAIL", "Invalid email!", 400);
  }

  const passSalt = await genSalt(10);
  const formPasswordHash = await hash(formPassword, passSalt);

  const userId = generateIdFromEntropySize(16); // 16 characters long

  try {
    await db.insert(Schema.users).values({
      id: userId,
      username: formUsername,
      password: formPasswordHash,
      email: formEmail,
    });

    await db.insert(Schema.personalInfo).values({
      user_id: userId,
      first_name: "",
      last_name: "",
      phone: "",
      area_code: 0,
    });

    await db.insert(Schema.professionalInfo).values({
      user_id: userId,
      resume_path: "",
      linkedin: "",
      portfolio: "",
      majors: "",
      minors: "",
      graduation_semester: "",
    });

    await db.insert(Schema.userRoleRelationship).values({
      user_id: userId,
      role: "user",
    });

    return createSuccessResponse(c, { userId }, "User successfully created");
  } catch (error) {
    console.log(error);
    return createErrorResponse(c, "CREATE_USER_ERROR", "Error creating user", 400);
  }
});

// Login route
authRoutes.post("/auth/login", async (c) => {
  const formData = await c.req.json();
  const formUsername = formData["username"];
  const formPassword = formData["password"];
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  if (!formUsername || typeof formUsername !== "string" || formUsername.trim() === "") {
    return createErrorResponse(c, "INVALID_USERNAME", "Invalid username!", 401);
  }

  if (!formPassword || typeof formPassword !== "string") {
    return createErrorResponse(c, "INVALID_PASSWORD", "Invalid password from login", 401);
  }

  let user;
  if (emailRegex.test(formUsername)) {
    user = await db.select().from(Schema.users).where(eq(Schema.users.email, formUsername));
  } else {
    user = await db.select().from(Schema.users).where(eq(Schema.users.username, formUsername));
  }

  if (user.length === 0) {
    console.log(user);
    return createErrorResponse(c, "INVALID_CREDENTIALS", "Invalid username or password!", 401);
  }

  const validPassword = await compare(formPassword, user[0].password);

  if (!validPassword) {
    return createErrorResponse(c, "INVALID_PASSWORD", "Incorrect password!", 401);
  } else {
    const session_id = generateIdFromEntropySize(16);
    createSession(session_id, user[0].id);
    // Set cookie here
    c.header("Set-Cookie", `sessionId=${session_id}; Path=/; HttpOnly; Secure; Max-Age=3600; SameSite=Lax`);
    return createSuccessResponse(c, { sessionId: session_id }, "Successfully logged in");
  }
});

// Logout route
authRoutes.post("/auth/logout", async (c) => {
  const sessionId = c.req.header("Cookie")?.match(/sessionId=([^;]*)/)?.[1];

  if (!sessionId) {
    return createErrorResponse(c, "NO_SESSION", "No active session found", 401);
  }

  try {
    // delete the session id row from the table
    await db.delete(Schema.sessions).where(eq(Schema.sessions.id, sessionId));

    return createSuccessResponse(c, { success: true }, "Successfully logged out");
  } catch (error) {
    console.log(error);
    return createErrorResponse(c, "LOGOUT_ERROR", "Error logging out", 500);
  }
});

// used for validating sessions
authRoutes.get("/auth/session", async (c) => {
  const sessionId = c.req.header("Cookie")?.match(/sessionId=([^;]*)/)?.[1];
  console.log(sessionId);

  if (!sessionId) {
    return createErrorResponse(c, "NO_SESSION", "No active session", 401);
  }

  try {
    const session = await db.select().from(Schema.sessions).where(eq(Schema.sessions.id, sessionId));

    if (session.length === 0) {
      return createErrorResponse(c, "SESSION_NOT_FOUND", "Session not found", 401);
    }

    if (session[0].expires_at < Date.now()) {
      await db.delete(Schema.sessions).where(eq(Schema.sessions.id, sessionId));
      // maybe renew session?
      return createErrorResponse(c, "SESSION_EXPIRED", "Session expired", 401);
    }

    const user = await db
      .select({ id: Schema.users.id, username: Schema.users.username })
      .from(Schema.users)
      .where(eq(Schema.users.id, session[0].user_id));

    if (user.length === 0) {
      return createErrorResponse(c, "USER_NOT_FOUND", "User not found", 401);
    }

    return createSuccessResponse(c, { id: user[0].id, username: user[0].username }, "Session valid");
  } catch (error) {
    console.log(error);
    return createErrorResponse(c, "SESSION_CHECK_ERROR", "Error checking session", 500);
  }
});

async function createSession(sessionID: string, userID: string) {
  try {
    await db.insert(Schema.sessions).values({
      id: sessionID,
      user_id: userID, //Session expires in 1 hour from when it is created
      expires_at: Date.now() + 3600 * 1000,
    });
  } catch (error) {
    console.log(error);
  }
}

export default authRoutes;
