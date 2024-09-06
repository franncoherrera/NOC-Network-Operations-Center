import { File } from "buffer";
import { LogSeverityLevel } from "../domain/entities/log.entity";
import { CheckService } from "../domain/use-cases/checks/check-service";
import { CheckServiceMultiple } from "../domain/use-cases/checks/check-service-multiple";
import { SendEmailLogs } from "../domain/use-cases/email/send-email-logs";
import { FileSystemDataSource } from "../infrastructure/datasources/file-system.datasources";
import { MongoLogDatasource } from "../infrastructure/datasources/mongo-log.datasources";
import { PostgresLogDatasource } from "../infrastructure/datasources/postgres-log.datasource";
import { LogRepositoryImpl } from "../infrastructure/repositories/log.repository.implementation";
import { CronService } from "./cron/cron-service";
import { EmailService } from "./email/email-service";

const fsLogRepository = new LogRepositoryImpl(new FileSystemDataSource());

const mongoLogRepository = new LogRepositoryImpl(new MongoLogDatasource());

const postgresLogRepository = new LogRepositoryImpl(
  new PostgresLogDatasource()
);

const emailService = new EmailService();

export class ServerApp {
  public static async start() {
    console.log("Server started...");

    // new SendEmailLogs(emailService, fileSystemLogRepository).execute([
    //   "franncoherrera2011@gmail.com",
    // ]);

    // emailService.sendEmail({
    //   to: "franncoherrera2011@gmail.com",
    //   subject: "Logs de sistema",
    //   htmlBody: `
    //     <h3>Logs de sistema -NOC </h3>
    //     <p> Hola</p>
    //   `,
    // });

    // emailService.sendEmailWithFileSystemLogs(['franncoherrera2011@gmail.com']);

    // CronService.createJob("*/5 * * * * *", function () {
    //   const url = "https://googlee.com";
    //   new CheckService(
    //     logRepository,
    //     () => console.log(`${url} is ok`),
    //     (error) => console.log(error)
    //   ).execute(url);
    // });

    CronService.createJob("*/5 * * * * *", function () {
      const url = "https://google.com";
      new CheckServiceMultiple(
        [fsLogRepository, postgresLogRepository, mongoLogRepository],
        () => console.log(`${url} is ok`),
        (error) => console.log(error)
      ).execute(url);
    });

    // const logs = await logRepository.getLogs(LogSeverityLevel.low)
    // console.log(logs)
  }
}
