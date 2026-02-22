import { pinoHttp } from "pino-http";
import { logger } from "../config/logger.js";
import { getTraceId } from "./requestContext.js";

export const requestLogger = pinoHttp({
  logger,

  customProps: () => ({
    traceId: getTraceId()
  }),

  serializers: {
    req: (req) => ({
      method: req.method,
      url: req.url
    }),

    res: (res) => ({
      statusCode: res.statusCode
    })
  }
});