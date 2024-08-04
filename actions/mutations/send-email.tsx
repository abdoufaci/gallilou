"use server";

import Contact from "@/components/emails/contact";
import { ContactformSchema } from "@/components/forms/contact-form";
import { render } from "@react-email/components";
import nodemailer from "nodemailer";
import { z } from "zod";

export const SendEmail = async ({
  data,
}: {
  data: z.infer<typeof ContactformSchema>;
}) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASS,
    },
  });

  const emailHtml = render(Contact({ data }));

  const options = {
    from: data.email,
    to: "abdoufaci982@gmail.com",
    subject: "Message de Client",
    html: emailHtml,
  };

  const res = await transporter.sendMail(options);
  return res;
};
