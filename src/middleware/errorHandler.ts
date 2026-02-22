import { logger } from "../config/logger.js";
import { getTraceId } from "./requestContext.js";

export const errorHandler = (err: Error, req: any, res: any, next: any) => {
  logger.error({ err, traceId: getTraceId() });
  res.status(500).json({
    success: false,
    error: "Internal Server Error",
    meta: { traceId: getTraceId() }
  });
};
