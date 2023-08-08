import { NextFunction, Request, Response } from 'express';

import { prisma } from '@utils';

export default function handleError(
	handler: (req: Request, res: Response, next: NextFunction) => void
) {
	return async (_req: Request, _res: Response, _next: NextFunction) => {
		try {
			handler(_req, _res, _next);
		} catch (err: unknown) {
			_next(err);
		} finally {
			await prisma.$disconnect();
			console.log('disconnected');
		}
	};
}
