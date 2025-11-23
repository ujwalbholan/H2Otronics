// Centralized error utilities for controllers/services

export const normalizeError = (error, fallbackMessage) => {
  if (!error) {
    return {
      status: 500,
      message: fallbackMessage || "Unknown error",
      code: "UNKNOWN_ERROR",
    };
  }

  const statusFromError =
    error.statusCode || error.status || error.response?.status;

  return {
    status: statusFromError && statusFromError >= 400 ? statusFromError : 500,
    message:
      error.message ||
      error.response?.data?.message ||
      fallbackMessage ||
      "Unexpected error occurred",
    code:
      error.code ||
      error.response?.data?.code ||
      error.name ||
      "INTERNAL_ERROR",
    meta: error.meta,
  };
};

export const handleControllerError = (
  res,
  error,
  contextMessage = "Unexpected server error"
) => {
  const { status, message, code } = normalizeError(error, contextMessage);

  // Log with context for observability (avoid leaking sensitive info to response)
  console.error(`[${contextMessage}]`, {
    status,
    message: error?.message,
    code,
    stack: error?.stack,
  });

  if (!res.headersSent) {
    res.status(status).json({
      success: false,
      message,
      code,
    });
  }
};

export const withErrorHandling = (asyncFn, contextMessage) => {
  return async (req, res, next) => {
    try {
      await asyncFn(req, res, next);
    } catch (error) {
      handleControllerError(res, error, contextMessage);
    }
  };
};

