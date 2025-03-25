import { Database } from "./shared/config/database";
import { config } from "./shared/environments/load-env";

export const ServerDbConnect = async () => {
  await Database.connect();
};

export const ServerDbDisconnect = async () => {
  await Database.disconnect();
};

const startServer = async () => {
  const { nodeEnv } = config.server;
  if (nodeEnv === "development") await Database.connect();
};

startServer();

process.on("SIGINT", async () => {
  await Database.disconnect();
  process.exit(0);
});