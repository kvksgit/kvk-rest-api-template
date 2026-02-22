import swaggerUi from "swagger-ui-express";
import { Application } from "express";

export function setupSwagger(app: Application) {
  const spec = {
    openapi: "3.0.0",
    info: {
      title: "KVK Sample Rest API Template",
      version: "1.0.0"
    }
  };
  app.use("/docs", swaggerUi.serve, swaggerUi.setup(spec));
}
