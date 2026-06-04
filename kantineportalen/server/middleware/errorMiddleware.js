export function notFoundHandler(req, res, next) {
  const error = new Error(`Fant ikke ruten: ${req.originalUrl}`)
  res.status(404)
  next(error)
}

export function errorHandler(error, _req, res, _next) {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode

  res.status(statusCode).json({
    message: error.message,
    stack: process.env.NODE_ENV === 'production' ? undefined : error.stack,
  })
}
