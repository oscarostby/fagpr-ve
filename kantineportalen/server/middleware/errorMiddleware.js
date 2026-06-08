function isDatabaseError(error) {
  return ['MongoNetworkError', 'MongoServerSelectionError', 'MongoTimeoutError'].includes(error.name)
}

export function notFound(req, res, next) {
  const error = new Error(`Fant ikke ${req.originalUrl}`)
  error.statusCode = 404
  next(error)
}

export function errorHandler(error, req, res, _next) {
  let statusCode = error.statusCode || (res.statusCode === 200 ? 500 : res.statusCode) || 500
  let message = error.message || 'Serverfeil'
  let errors

  if (error.name === 'ValidationError') {
    statusCode = 400
    message = 'Ugyldig input'
    errors = Object.values(error.errors || {}).map((validationError) => ({
      field: validationError.path,
      message: validationError.message,
    }))
  } else if (error.name === 'CastError') {
    statusCode = 400
    message = 'Ugyldig ObjectId'
  } else if (error.code === 11000) {
    statusCode = 409
    message = 'Ressursen finnes allerede'
  } else if (isDatabaseError(error)) {
    statusCode = 500
    message = 'Databasefeil. Prøv igjen senere.'
  } else if (error.type === 'entity.too.large') {
    statusCode = 413
    message = 'Request body er for stor'
  }

  console.error('[API-feil]', {
    method: req.method,
    path: req.originalUrl,
    statusCode,
    message: error.message,
    type: error.name || error.type,
  })

  const response = {
    message: statusCode >= 500 && !isDatabaseError(error) ? 'Serverfeil' : message,
  }

  if (errors) {
    response.errors = errors
  }

  if (process.env.DEBUG_ERRORS === 'true' && statusCode < 500 && !isDatabaseError(error)) {
    response.stack = error.stack
  }

  res.status(statusCode).json(response)
}
