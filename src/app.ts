import { envs } from "./config/pugings/env.plugins";
import { MongoDatabase } from "./data/mongo";
import { ServerApp } from "./presentation/server";

(async () => {
  await main();
})();

async function main() {
  await MongoDatabase.connect({
    mongoUrl: envs.MONGO_URL,
    dbName: envs.MONGO_DB_NAME,
  });
  ServerApp.start();
}
