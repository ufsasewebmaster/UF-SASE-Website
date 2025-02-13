import { db } from "@/server/db/db";
import * as Schema from "@db/tables";
import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";
import { Hono } from "hono";
import { generateIdFromEntropySize } from "lucia";

const { compare, genSalt, hash } = bcrypt;

const authRoutes = new Hono();

authRoutes.post("/auth/signup", async (c) => {
  const formData = await c.req.json();
  const formUsername = formData["username"];
  const formPassword = formData["password"];

  //validate username
  if (!formUsername || typeof formUsername !== "string") {
    return new Response("Invalid username", {
      status: 400,
    });
  }

  if (!formPassword || typeof formPassword !== "string") {
    return new Response("Invalid password", {
      status: 400,
    });
  }

  const passSalt = await genSalt(10);
  const formPasswordHash = await hash(formPassword, passSalt);

  const userId = generateIdFromEntropySize(16); // 16 characters long

  try {
    await db.insert(Schema.users).values({
      id: userId,
      username: formUsername,
      password: formPasswordHash,
    });

    return new Response("User successfully created", {
      status: 201,
      headers: {
        Location: "/",
      },
    });
  } catch (error) {
    console.log(error);
    // db error, email taken, etc
    return new Response("Username already taken", {
      status: 400,
    });
  }
});

authRoutes.post("/auth/login", async (c) => {
  const formData = await c.req.json();
  const formUsername = formData["username"];
  const formPassword = formData["password"];

  if (!formUsername || typeof formUsername !== "string") {
    return new Response("Invalid username", {
      status: 401,
    });
  }

  if (!formPassword || typeof formPassword !== "string") {
    return new Response("Invalid password", {
      status: 401,
    });
  }

  const user = await db.select().from(Schema.users).where(eq(Schema.users.username, formUsername));

  if (user.length == 0) return new Response("Invalid username or password", { status: 401 });

  const validPassword = await compare(formPassword, user[0].password);

  if (!validPassword) {
    return new Response("Invalid email or password", {
      status: 401,
    });
  } else {
    //TODO: CREATE NEW SESSION IN THE DATABASE AND GENERATE ID
    const session_id = generateIdFromEntropySize(16);
    createSession(session_id, user[0].id);
    return new Response("Successfully logged in", {
      status: 200,
      headers: {
        "Set-Cookie": `sessionId=${session_id}; Path=/; HttpOnly; secure; Max-Age=3600; SameSite=Strict`,
      },
    });
  }
});

authRoutes.post("/auth/logout", async (c) => {
  const sessionId = c.req.header("Cookie")?.match(/sessionId=([^;]*)/)?.[1];

  if (!sessionId) {
    return new Response("No active session found", { status: 401 });
  }

  try {
    // delete the session id row from the table
    await db.delete(Schema.sessions).where(eq(Schema.sessions.id, sessionId));

    return new Response("Successfully logged out", {
      status: 200,
      headers: {
        "Set-Cookie": "sessionId=; Path=/; HttpOnly; Secure; Max-Age=0; SameSite=Strict",
      },
    });
  } catch (error) {
    console.log(error);
    return new Response("Error logging out", { status: 500 });
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
