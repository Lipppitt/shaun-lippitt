import { EmailTemplate } from '../../components/emails/email-template';
import { Resend } from 'resend';
import axios from "axios";
import qs from "qs";

const resend = new Resend(process.env.RESEND_API_KEY);
const recaptchaUrl = 'https://www.google.com/recaptcha/api/siteverify';

export default async function handler(req, res) {
  const { token } = req.body;

  try {
    const formData = qs.stringify({
      secret: process.env.RECAPTCHA_SECRET,
      response: token
    });

    const response = await axios.post(recaptchaUrl, formData, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });

    if (!response.data.success) {
      return res.status(400).json({ error: "reCAPTCHA verification failed" });
    }

    const { data, error } = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL,
      to: [process.env.RESEND_TO_EMAIL],
      subject: 'New Website Enquiry',
      react: EmailTemplate(req.body.form),
    });

    if (error) {
      return res.status(400).json({ error: "Error sending email" });
    }

    res.status(200).json(data);
  } catch (error) {
    console.error("An error occurred:", error);
    res.status(500).json({ error: "An error occurred. Please try again later." });
  }
}
