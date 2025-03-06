import { createErrorResponse, createSuccessResponse } from "@/shared/utils";
import { Hono } from "hono";

// Sleep function that behaves synchronously in an async function
const sleep = (delay: number) => new Promise((resolve) => setTimeout(resolve, delay));
const contactRoutes = new Hono();

contactRoutes.post("/contact/submit", async (c) => {
  try {
    const formData = await c.req.json();
    const formFirstName = formData["firstName"];
    const formLastName = formData["lastName"];
    const formEmail = formData["email"];
    const formMessage = formData["message"];
    const saseEmail = "ufsase.webmaster.shared@gmail.com";

    // Validation
    if (typeof formFirstName !== "string" || formFirstName.length > 256) {
      return createErrorResponse(c, "INVALID_INPUT", "Invalid Name", 400);
    }
    if (typeof formLastName !== "string" || formLastName.length > 256) {
      return createErrorResponse(c, "INVALID_INPUT", "Invalid Name", 400);
    }
    const regex = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    if (typeof formEmail !== "string" || formEmail.length > 256 || !regex.test(formEmail)) {
      return createErrorResponse(c, "INVALID_INPUT", "Invalid Email", 400);
    }
    if (typeof formMessage !== "string" || formMessage.length > 3000) {
      return createErrorResponse(c, "INVALID_INPUT", "Message is too long", 400);
    }

    // Generate email HTML
    const formHTML = `<p>${formMessage}</p>
  <h2>Sender name: ${formFirstName} ${formLastName}</h2>
  <h2>Sender email: ${formEmail}</h2>`;

    let resp = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "UF SASE <contactform@email.ufsase.com>",
        to: [saseEmail],
        subject: "Contact Form Submission",
        html: formHTML,
      }),
    });

    if (resp.status === 429) {
      await sleep(1000);
      resp = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        },
        body: JSON.stringify({
          from: "UF SASE <info@ufsase.com>",
          to: [saseEmail],
          subject: "Contact Form Submission",
          html: formHTML,
        }),
      });
    }

    if (resp.ok) {
      return createSuccessResponse(c, { message: "Email sent successfully" }, "Email sent successfully");
    } else {
      return createErrorResponse(c, "EMAIL_FAILURE", "Email not sent successfully", 300);
    }
  } catch (error) {
    console.error("Contact form error:", error);
    return createErrorResponse(c, "CONTACT_SUBMIT_ERROR", "Failed to submit contact form", 500);
  }
});

export default contactRoutes;
