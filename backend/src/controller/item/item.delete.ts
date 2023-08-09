import { Request, Response } from 'express';

import { catchError, AppError } from '@error';
import { prisma } from '@utils';

export default catchError(async (req, res, next) => {
	try {
		await prisma.items.delete({
			where: {
				id: req.params.id,
			},
		});

		res.status(200).json({
			deleted: true,
		});
	} catch (err) {
		next(err);
	}
});
