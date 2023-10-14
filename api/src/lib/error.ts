export default class ServerError extends Error {
  status: number;
  error: string;

  constructor (status: number, error: string) {
    super(`Server error with code: ${status}. ${error}`);
    Error.captureStackTrace(this, ServerError);
    this.status = status;
    this.error = error;
  }
}
