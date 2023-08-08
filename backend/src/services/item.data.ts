import { Response, Request } from 'express';

import { prisma, getType } from '@utils';

export default async function handler(req: Request, res: Response) {
	const data = await prisma.items.findFirst({
		where: {
			AND: [
				{
					name: req.params.name as string,
				},
				{
					type: getType(req.params.type as 'books' | 'news' | 'docs'),
				},
			],
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
		...data,
	});
}
