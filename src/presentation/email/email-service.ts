import nodemailer from "nodemailer";
import { envs } from "../../config/pugings/env.plugins";

export interface SendMailOptions {
  to: string | string[];
  subject: string;
  htmlBody: string;
  attachments?: Attachment[];
}

export interface Attachment {
  fileName: string;
  path: string;
}

export class EmailService {
  private transporter = nodemailer.createTransport({
    service: envs.MAILER_SERVICE,
    auth: {
      user: envs.MAILER_EMAIL,
      pass: envs.MAILER_SECRET_KEY,
    },
  });

  constructor() {}

  async sendEmail(options: SendMailOptions): Promise<boolean> {
    const { to, subject, htmlBody, attachments = [] } = options;
    try {
      const sentInformation = await this.transporter.sendMail({
        to,
        subject,
        html: htmlBody,
        attachments,
      });
      return true;
    } catch (error) {
      return false;
    }
  }

  async sendEmailWithFileSystemLogs(to: string | string[]) {
    const subject = "Logs del servidor";
    const htmlBody = `
        <h3>Logs de sistema -NOC </h3>
        <p> Email de logs del sistema.</p>
        <p> Se enviaron como archivos los logs del sistema.</p>

    `;
    const attachments: Attachment[] = [
      {
        fileName: "logs-all.log",
        path: "./logs/logs-all.log",
      },
      {
        fileName: "logs-high.log",
        path: "./logs/logs-high.log",
      },
      {
        fileName: "logs-medium.log",
        path: "./logs/logs-medium.log",
      },
    ];
    return this.sendEmail({ to, subject, htmlBody, attachments });
  }
}
