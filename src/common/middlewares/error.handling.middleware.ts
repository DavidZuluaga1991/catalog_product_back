import { Request, Response, NextFunction } from "express";
import { ErrorCode } from "../const/error-code.const";

export const errorHandlingMiddleware = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const code = ErrorCode[error.message];
  if (code) {
    res.status(code).json({ message: error.message });
  } else {
    res.status(500).json({ message: "Internal Server Error" });
  }
};
