import { Request, Response } from 'express';

import { AppError, catchError } from '@error';
import { itemStatus, itemData } from '@services';

export default catchError(async (req, res, next) => {
	try {
		console.log(req.params);

		validateBody(req);

		if (req.params.response === 'status') {
			itemStatus(req, res);
			return;
		}

		if (req.params.response === 'data') {
			itemData(req, res);
			return;
		}
	} catch (err) {
		next(err);
	}
});

function validateBody(req: Request) {
	if (req.params.name?.length > 30) {
		throw new AppError(422, 'name too long');
	}

	if (
		req.params.type !== 'books' &&
		req.params.type !== 'docs' &&
		req.params.type !== 'news'
	) {
		throw new AppError(422, 'invalid parameter type');
	}
}
