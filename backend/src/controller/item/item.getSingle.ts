import { Response, Request } from 'express';

import { prisma } from '@utils';
import { catchError } from '@error';

import { ItemProps } from './types';

export default catchError(async (req, res: Response<Res>, next) => {
	try {
		const item = await prisma.items.findUniqueOrThrow({
			where: {
				id: req.params.id,
			},

			select: {
				id: true,
				name: true,
				available: true,
				description: true,
				type: true,
				data: true,
				borrow: {
					select: {
						name: true,
					},
				},
				author: {
					select: {
						name: true,
					},
				},
				createdAt: true,
			},
		});

		res.status(200).json({
			success: true,
			error: false,
			message: null,
			data: item,
		});
	} catch (err) {
		next(err);
	}
});

type Res = {
	success: boolean;
	error: boolean;
	message: string | null;
	data: ItemProps;
};
