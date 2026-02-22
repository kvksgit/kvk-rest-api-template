import { app } from "./app.js";
import { env } from "./config/env.js";
import { logger } from "./config/logger.js";
import { secretsManager } from "./core/secretsManager.js";

await secretsManager.load();

const server = app.listen(env.PORT, () => {
  logger.info(`Server started on port ${env.PORT}`);
});

const shutdown = () => {
  logger.info("Shutdown initiated");
  server.close(() => {
    logger.info("Shutdown complete");
    process.exit(0);
  });
};

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
