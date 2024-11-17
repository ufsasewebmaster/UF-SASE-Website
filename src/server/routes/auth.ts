import { hash, verify } from "@node-rs/argon2";
import { eq } from "drizzle-orm";
import { Hono } from "hono";
import { generateIdFromEntropySize } from "lucia";
import { db } from "../db";
import * as Schema from "../db/schema";

const authRoutes = new Hono();

authRoutes.post("/auth/signup", async (c) => {
  const formData = await c.req.formData();
  const formUsername = formData.get("username");
  const formPassword = formData.get("password");

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

  const formPasswordHash = await hash(formPassword, {
    memoryCost: 19456,
    timeCost: 2,
    outputLen: 32,
    parallelism: 1,
  });

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
  const formData = await c.req.formData();
  const formUsername = formData.get("username");
  const formPassword = formData.get("password");

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

  const user = await db
    .select()
    .from(Schema.users)
    .where(eq(Schema.users.username, formUsername));

  if (user.length == 0)
    return new Response("Invalid username or password", { status: 400 });

  const passwordHash = user[0].password_hash;
  const validPassword = await verify(passwordHash, formPassword, {
    memoryCost: 19456,
    timeCost: 2,
    outputLen: 32,
    parallelism: 1,
  });

  if (!validPassword) {
    return new Response("Invalid email or password", {
      status: 400,
    });
  } else {
    return new Response("Successfully logged in", {
      status: 200,
    });
  }
});

export default authRoutes;
