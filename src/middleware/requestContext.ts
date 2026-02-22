import { v4 as uuid } from "uuid";
import { AsyncLocalStorage } from "node:async_hooks";
import { Request, Response, NextFunction } from "express";

interface RequestContext {
  traceId: string | string[];
}

const storage = new AsyncLocalStorage<RequestContext>();

export const requestContext = (req: Request, res: Response, next: NextFunction) => {

  const context = {
    traceId: req.headers["x-trace-id"] || uuid()
  };

  storage.run(context, () => {
    res.setHeader("x-trace-id", context.traceId);
    next();
  });
};

export const getTraceId = () => {
  return storage.getStore()?.traceId;
};