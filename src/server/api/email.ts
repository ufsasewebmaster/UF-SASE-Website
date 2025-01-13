import { db } from "@/server/db/db";
import { emailSubscribers } from "@db/tables";
import { createErrorResponse } from "@shared/utils";
import { Hono } from "hono";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const emailRoutes = new Hono();

emailRoutes.get("/email/test", async (c) => {
  try {
    const result = await resend.emails.send({
      from: "UF SASE <info@ufsase.com>",
      to: ["ufsase.webmaster@gmail.com"],
      subject: "Test Email from Resend",
      html: "<h1>This is a test email</h1><p>If you received this, Resend works!</p>",
    });

    return c.json({ message: "Test email sent successfully", result }, 200);
  } catch (error) {
    console.error("Test email error:", error);
    return createErrorResponse(c, "EMAIL_TEST_FAILURE", "Failed to send test email", 500);
  }
});

emailRoutes.post("/email/add", async (c) => {
  try {
    // Parse and validate the request body
    const { email, name } = await c.req.json();
    if (!email) return createErrorResponse(c, "INVALID_INPUT", "Email is required", 400);

    await db.insert(emailSubscribers).values({
      email,
      name: name || null, // Optional name
    });

    return c.json({ message: "Email added successfully" }, 200);
  } catch (error) {
    console.error("Error adding email:", error);
    return createErrorResponse(c, "EMAIL_ADD_FAILURE", "Failed to add email", 500);
  }
});

emailRoutes.post("/email/send", async (c) => {
  try {
    // Parse and validate the request body
    const { html, recipientList, subject } = await c.req.json();
    if (!recipientList || !subject || !html) {
      return createErrorResponse(c, "INVALID_INPUT", "Missing required fields", 400);
    }

    // Loop through recipients and send emails
    const results = [];
    for (const recipient of recipientList) {
      const result = await resend.emails.send({
        from: "UF SASE <info@ufsase.com>",
        to: [recipient],
        subject,
        html,
      });
      results.push(result);
    }

    return c.json({ message: "Emails sent successfully", results }, 200);
  } catch (error) {
    console.error("Email sending error:", error);
    return createErrorResponse(c, "EMAIL_SEND_FAILURE", "Failed to send emails", 500);
  }
});

export default emailRoutes;
