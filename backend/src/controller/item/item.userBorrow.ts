import { Request, Response } from 'express';
import { catchError } from '@error';
import { prisma } from '@utils';
import { ItemProps } from './types';

export default catchError(async (req: R, res: Response<Res>, next) => {
	try {
		const items = await prisma.items.findMany({
			where: {
				borrow_id: req.user?.id,
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
						email: true,
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
			data: items,
			message: null,
		});
	} catch (err) {
		next(err);
	}
});

type R = Request & {
	user?: {
		email: string;
		id: string;
	};
};

type Res = {
	success: boolean;
	error: boolean;
	message: string | null;
	data: Array<ItemProps>;
};
