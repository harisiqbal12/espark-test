class AppError extends Error {
	statusCode: number = 0;

	constructor(statusCode: number, message: string) {
		super(message);
		this.statusCode = statusCode;

		Error.captureStackTrace(this, this.constructor);
	}
}

export default AppError;
