import express from "express";
import helmet from "helmet";
import cors from "cors";

import routes from "./routes/index.js";
import { requestLogger } from "./middleware/requestLogger.js";
import { requestContext } from "./middleware/requestContext.js";
import { errorHandler } from "./middleware/errorHandler.js";
import { rateLimiter } from "./middleware/rateLimiter.js";
import { setupSwagger } from "./config/swagger.js";

export const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json({ limit: "1mb" }));

app.use(requestContext);
app.use(requestLogger);
app.use(rateLimiter);

setupSwagger(app);
app.use("/api", routes);

app.use(errorHandler);
