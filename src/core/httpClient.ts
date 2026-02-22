import axios from "axios";
import https from "node:https";
import fs from "node:fs";

import { logger } from "../config/logger.js";
import { getTraceId } from "../middleware/requestContext.js";

class HttpClient {
  private static instance: HttpClient;

  static getInstance() {
    if (!this.instance) {
      const httpsAgent = new https.Agent({
        cert: fs.readFileSync(process.env.CLIENT_CERT_PATH || ""),
        key: fs.readFileSync(process.env.CLIENT_KEY_PATH || ""),
        rejectUnauthorized: true,
      });

      const client = axios.create({
        timeout: 10000,
        httpsAgent,
      });

      client.interceptors.request.use((config) => {
        config.headers["x-trace-id"] = getTraceId();

        logger.info({
          type: "external_request",
          traceId: getTraceId(),
          url: config.url,
          method: config.method,
        });

        return config;
      });

      client.interceptors.response.use(
        (response) => {
          logger.info({
            type: "external_response",
            traceId: getTraceId(),
            status: response.status,
            url: response.config.url,
          });

          return response;
        },

        (error) => {
          logger.error({
            type: "external_error",
            traceId: getTraceId(),
            error: error.message,
          });

          throw error;
        },
      );

      this.instance = client;
    }

    return this.instance;
  }
}

export const httpClient = HttpClient.getInstance();
