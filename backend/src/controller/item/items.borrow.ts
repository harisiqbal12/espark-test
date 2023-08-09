import { Request } from 'express';
import { AppError, catchError } from '@error';
import { prisma } from '@utils';

export default catchError(async (req: R, res, next) => {
	try {
		const item = await prisma.items.findUniqueOrThrow({
			where: {
				id: req.params.id,
			},

			select: {
				borrow_id: true,
			},
		});

		if (item.borrow_id) {
			throw new AppError(409, 'already borrowed by another user');
		}

		await prisma.items.update({
			where: {
				id: req.params.id,
			},

			data: {
				borrow_id: req.user?.id,
				available: false
			},
		});

		res.status(202).json({
			success: true,
		});
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
