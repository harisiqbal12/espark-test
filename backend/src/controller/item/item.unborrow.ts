import { Request } from 'express';

import { catchError } from '@error';
import { prisma } from '@utils';

export default catchError(async (req: R, res, next) => {
	try {
		console.log(req.user);
		// validate if the user actually borrowed or not
		await prisma.items.findFirstOrThrow({
			where: {
				AND: [
					{
						id: req.params.id,
					},
					{
						borrow_id: req?.user?.id,
					},
				],
			},

			select: {
				id: true,
			},
		});

		await prisma.items.update({
			where: {
				id: req.params.id,
			},

			data: {
				borrow_id: null,
				available: true
			},
		});

		res.status(202).json({ success: true });
	} catch (err) {
		next(err);
	}
});

type R = Request & {
	readonly user?: {
		email: string;
		id: string;
	};
};
