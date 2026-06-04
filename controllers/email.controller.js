import Email from "../models/Email.model.js";
import { sendEmail } from "../services/sendEmail.js";

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "tiarasbreadhub@gmail.com";

export const sendEmailToAdmin = async (req, res) => {
  try {
    const { name, message, from } = req.body;

    // Validate required fields
    if (!name || !message || !from) {
      return res.status(400).json({
        message: "Missing required fields: name, message, and from are required",
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(from)) {
      return res.status(400).json({
        message: "Invalid email address format",
      });
    }

    const email = await Email.create({ name, message, from });

    await sendEmail({
      to: ADMIN_EMAIL,
      replyTo: from,
      subject: "Enquiry",
      html: `<h1>${name} with Email address: ${from}, sent:</h1><p>${message}</p>`,
    });

    res.status(200).json({ message: "Email sent successfully", email });
  } catch (error) {
    console.error("Email controller error:", error);
    res
      .status(500)
      .json({ message: "Failed to send email", error: error.message });
  }
};
