interface CustomError extends Error {
  status: number;
  message: string;
}

const createError = (status: number, message: string) => {
  const err = new Error() as CustomError;
  err.status = status;
  err.message = message;
  return err;
};

export default createError;
