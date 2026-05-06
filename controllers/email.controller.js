import Email from "../models/Email.model.js";
import { sendEmail } from "../services/sendEmail.js";

export const sendEmailToAdmin = async (req, res) => {
  const { name, message, from } = req.body;
  const email = await Email.create({ name, message, from });
  sendEmail({
    to: "dabojohnson98@gmail.com",
    name: name,
    message: message,
    // from: from,
    subject: "Enquiry",
    html: `<h1>${name} with Email address : ${from},  sent:
         ${message}</h1>`,
  });

  res.status(200).json({ message: "Email sent successfully", email });
};
