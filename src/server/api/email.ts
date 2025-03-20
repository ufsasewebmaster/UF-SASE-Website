import { db } from "@/server/db/db";
import { emailSubscribers } from "@db/tables";
import * as Schema from "@db/tables";
import { SERVER_ENV } from "@server/env";
import { createErrorResponse, createSuccessResponse } from "@shared/utils";
import { eq } from "drizzle-orm";
import { Hono } from "hono";
import { Resend } from "resend";

const resend = new Resend(SERVER_ENV.RESEND_API_KEY);
const emailRoutes = new Hono();

emailRoutes.get("/email/test", async (c) => {
  try {
    const result = await resend.emails.send({
      from: "UF SASE <info@ufsase.com>",
      to: ["ufsase.webmaster@gmail.com"],
      subject: "Test Email from Resend",
      html: "<h1>This is a test email</h1><p>If you received this, Resend works!</p>",
    });
    return createSuccessResponse(c, result, "Test email sent successfully");
  } catch (error) {
    console.error("Test email error:", error);
    return createErrorResponse(c, "EMAIL_TEST_FAILURE", "Failed to send test email", 500);
  }
});

emailRoutes.post("/email/add", async (c) => {
  try {
    const { email, name } = await c.req.json();
    if (!email) return createErrorResponse(c, "INVALID_INPUT", "Email is required", 400);
    await db.insert(emailSubscribers).values({
      email,
      name: name || null,
    });
    return createSuccessResponse(c, { success: true }, "Email added successfully");
  } catch (error) {
    console.error("Error adding email:", error);
    return createErrorResponse(c, "EMAIL_ADD_FAILURE", "Failed to add email", 500);
  }
});

emailRoutes.post("/email/send", async (c) => {
  try {
    const { html, recipientList, subject } = await c.req.json();
    if (!recipientList || !subject || !html) {
      return createErrorResponse(c, "INVALID_INPUT", "Missing required fields", 400);
    }
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
    return createSuccessResponse(c, results, "Emails sent successfully");
  } catch (error) {
    console.error("Email sending error:", error);
    return createErrorResponse(c, "EMAIL_SEND_FAILURE", "Failed to send emails", 500);
  }
});

emailRoutes.post("/email/password-reset", async (c) => {
  try {
    const { email } = await c.req.json();
    if (!email) {
      return createErrorResponse(c, "INVALID_INPUT", "Email is required", 400);
    }

    const user = await db.select().from(Schema.users).where(eq(Schema.users.email, email));
    if (!user || user.length === 0) {
      return createErrorResponse(c, "USER_NOT_FOUND", "User not found", 404);
    }

    const resetPage = `http://ufsase.com/reset-password?id=${user[0].id}`;
    const htmlTemplate = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1>Password Reset Notification</h1>
        <p>Hello ${user[0].username || "user"},</p>
        <p>Your UF SASE password can be reset by clicking the button below. If you did not request a new password, please ignore this email.</p>
        <p>
          <a href="${resetPage}" style="background-color: #007bff; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block;">
            Reset Password
          </a>
        </p>
        <p>This link will expire in 24 hours for security reasons.</p>
        <p>Best regards,<br>The UF SASE WebDev Team</p>
      </div>
    `;
    const result = await resend.emails.send({
      from: "UF SASE <password@email.ufsase.com>",
      to: [email],
      subject: "Password Reset Request for UF SASE",
      html: htmlTemplate,
    });
    return createSuccessResponse(c, result.data, "Password reset email sent successfully");
  } catch (error) {
    console.error("Password reset email error:", error);
    return createErrorResponse(c, "PASSWORD_RESET_FAILURE", "Failed to send password reset email", 500);
  }
});

export default emailRoutes;
