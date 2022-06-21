import nodemailer from "nodemailer";
import { MailAdapter, SendmailData } from "../mail-adapter";

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "3e964c1767ca8e",
    pass: "eb9c0413ee4f4a"
  }
});

export class NodemailerMailAdapter implements MailAdapter {
  async sendMail(data: SendmailData) {
    const { subject, body } = data;
    await transport.sendMail({
      from: "Equipe Feedget <oi@feedget.com",
      to: "MboiTata <batata@gmail.com>",
      subject: subject,
      html: body,
    });
  }
}
