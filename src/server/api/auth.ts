import { db } from "@db/index";
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

  //TODO VALIDATE USERNAME
  if (!formUsername || typeof formUsername !== "string") {
    return new Response("Invalid username", {
      status: 400,
    });
  }

  //TODO VALIDATE PASSWORD
  if (!formPassword || typeof formPassword !== "string") {
    return new Response("Invalid password", {
      status: 400,
    });
  }

  const passSalt = await genSalt(10);
  const formPasswordHash = await hash(formPassword, passSalt);

  const userId = generateIdFromEntropySize(10); // 16 characters long

  try {
    await db.insert(Schema.users).values({
      id: userId,
      username: formUsername,
      password_hash: formPasswordHash,
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
    return new Response("Username already used", {
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

  const user = await db
    .select()
    .from(Schema.users)
    .where(eq(Schema.users.username, formUsername));

  if (user.length == 0)
    return new Response("Invalid username or password", { status: 401 });

  const passwordHash = user[0].password_hash;
  const validPassword = await compare(formPassword, passwordHash);

  if (!validPassword) {
    return new Response("Invalid email or password", {
      status: 401,
    });
  } else {
    return new Response("Successfully logged in", {
      status: 200,
    });
  }
});

export default authRoutes;
