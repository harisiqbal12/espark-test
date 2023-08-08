import { Response } from 'express';
import { catchError } from '@error';

import { prisma } from '@utils';
import { ItemProps } from './types';

export default catchError(async (req, res: Response<Res>, next) => {
	try {
		const items = await prisma.items.findMany({
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
			data: items,
		});
	} catch (err) {
		next(err);
	}
});

type Res = {
	success: boolean;
	error: boolean;
	message: string | null;
	data: Array<ItemProps>;
};
