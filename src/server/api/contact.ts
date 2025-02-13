import { Hono } from "hono";

//sleep function that behaves synchronously in an async function
const sleep = (delay: number) => new Promise((resolve) => setTimeout(resolve, delay));
const contactRoutes = new Hono();
contactRoutes.post("/contact/submit", async (c) => {
  const formData = await c.req.json();
  const formFirstName = formData["firstName"];
  const formLastName = formData["lastName"];
  const formEmail = formData["email"];
  const formMessage = formData["message"];
  const saseEmail = "ufsase.webmaster.shared@gmail.com";
  //validation
  if (typeof formFirstName !== "string" || formFirstName.length > 256) {
    return new Response("Invalid Name", {
      status: 400,
    });
  }

  if (typeof formLastName !== "string" || formLastName.length > 256) {
    return new Response("Invalid Name", {
      status: 400,
    });
  }
  const regex = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
  if (typeof formEmail !== "string" || formEmail.length > 256 || !regex.test(formEmail)) {
    return new Response("Invalid Email", {
      status: 400,
    });
  }

  if (typeof formMessage !== "string" || formMessage.length > 3000) {
    return new Response("Message is too long", {
      status: 400,
    });
  }
  //generate email HTML
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
  console.log(resp.status);
  console.log(resp.headers);
  const respBody = await resp.json();
  console.log(respBody);
  if (resp.status == 429) {
    await sleep(1000);
    resp = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "UF SASE <info@ufsase.com>",
        to: ["delivered@resend.dev"],
        subject: "Contact Form Submission",
        html: formHTML,
      }),
    });
  }
  if (resp.ok) return c.json({ message: "Email sent succesfully", c }, 200);
  else {
    return c.json({ message: "Email not sent successfully", c }, 300);
  }
});

export default contactRoutes;
