import { Request, Response } from 'express';

import { prisma, getType } from '@utils';

export default async function handler(req: Request, res: Response) {


	const data = await prisma.items.findFirst({
		where: {
			AND: [
				{
					type: getType(req.params.type as 'books' | 'news' | 'docs'),
				},
				{
					name: req.params.name as string,
				},
			],
		},

		select: {
			available: true,
		},
	});

	res.status(200).json({
		available: data?.available,
	});
}
