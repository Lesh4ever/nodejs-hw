import { HttpError } from 'http-errors';

export const errorHandler = (err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }

  const isHttpError = err instanceof HttpError;

  const status = isHttpError ? err.status : 500;

  const isProd = process.env.NODE_ENV === 'production';

  const message = isHttpError
    ? err.message
    : isProd
      ? 'Something went wrong. Please try again later.'
      : err.message;

  if (!isHttpError) {
    console.error(err);
  }

  return res.status(status).json({
    message,
  });
};
