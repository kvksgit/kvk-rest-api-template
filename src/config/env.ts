import dotenv from "dotenv";
dotenv.config({ path: `.env.${process.env.NODE_ENV || "dev"}` });

export const env = {
  NODE_ENV: process.env.NODE_ENV || "dev",
  PORT: Number(process.env.PORT || 3000),
  SERVICE_NAME: process.env.SERVICE_NAME || "kvk-rest-api-template"
};
