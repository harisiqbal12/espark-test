import { Request, Response } from 'express';
import { AppError, catchError } from '@error';
import { prisma } from '@utils';

export default catchError(async (req: R, res: Response<Res>, next) => {
	try {
		validateBody(req as Request);

		const item = await prisma.items.create({
			data: {
				name: req.body.name,
				description: req.body?.description || null,
				type: req.body.type,
				data: req.body?.data || null,
				author_id: req.user?.id,
			},

			select: {
				id: true,
				name: true,
				available: true,
				type: true,
				data: true,
				description: true,
			},
		});

		res.status(201).json({
			success: true,
			error: false,
			message: 'created successfull',
			data: item,
		});
	} catch (err) {
		next(err);
	}
});

function validateBody(req: Request) {
	const fields = [];
	let isError: boolean = false;

	if (!req.body.name) {
		fields.push('name');
		isError = true;
	}

	if (!req.body?.type) {
		fields.push('type');
		isError = true;
	}

	if (isError) {
		throw new AppError(401, `${fields?.join(',')} missing fields`);
	}

	if (
		req?.body?.type !== 'NEWSPAPER' &&
		req?.body?.type !== 'DOCUMENTARIES' &&
		req?.body?.type !== 'BOOKS'
	) {
		throw new AppError(422, 'invalid item type');
	}

	if (req.body.name.length > 30) {
		throw new AppError(422, 'name too long');
	}
}

type Res = {
	readonly success: boolean;
	readonly error: boolean;
	readonly message: string | null;
	readonly data: {
		id: string;
		name: string;
		available: boolean;
		description: string | null;
		type: 'NEWSPAPER' | 'DOCUMENTARIES' | 'BOOKS';
		data: string | null;
	};
};

type R = Request & {
	readonly user?: {
		email: string;
		id: string;
	};
};
