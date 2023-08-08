import { Request, Response } from 'express';

import { catchError } from '@error';
import { prisma, getType } from '@utils';

export default catchError(async (req, res: Response, next) => {
	try {
		let query = {};
		let total: number = 0;

		if (
			req.query?.type &&
			(req.query?.type === 'books' ||
				req.query?.type === 'news' ||
				req.query?.type == 'docs')
		) {
			query = { type: getType(req.query.type) };
		}

		if (req.query?.available) {
			query = {
				...query,
				available: req.query.available === 'true' ? true : false,
			};
		}

		if (Object.keys(query)?.length === 0) {
			total = await prisma.items.count();
		}

		if (Object.keys(query)?.length > 0) {
			total = await prisma.items.count({
				where: {
					...query,
				},
			});
		}

		res.status(200).json({
			success: false,
			error: false,
			total: total,
		});
	} catch (err) {
		next(err);
	}
});

