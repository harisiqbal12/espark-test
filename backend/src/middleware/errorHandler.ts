import { AppError } from '@error';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { NextFunction, Request, Response } from 'express';

export default function handler(
	err: any,
	req: Request,
	res: Response<R>,
	next: NextFunction
) {
	if (err) {
		console.log(err);
		console.log('error');

		if (err instanceof AppError) {
			res.status(err.statusCode).json({
				success: false,
				error: true,
				message: err.message,
			});

			return;
		}

		if (err instanceof PrismaClientKnownRequestError) {
			if (err.code === 'P2025') {
				res.status(404).json({
					success: false,
					error: true,
					message: err?.meta?.cause ? err.meta.cause as string : err.message as string,
				});
				return;
			}

			if (err.code === 'P2002') {
				res.status(409).json({
					success: false,
					error: true,
					message: `duplicate value of ${err.meta?.target}`,
				});
				return;
			}
		}

		res.status(500).json({
			success: false,
			error: true,
			message: 'internal server error',
		});
	}
}

type R = {
	readonly success: boolean;
	readonly error: boolean;
	readonly message: string | null;
};
