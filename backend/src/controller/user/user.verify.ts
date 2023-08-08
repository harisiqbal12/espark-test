import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import { prisma } from '@utils';
import { AppError, catchError } from '@error';

export default catchError(async (req, res, next) => {
	try {
		validateBody(req);

		const secret: string = process.env.JWT_SECRET as string;

		const response: jwt.Jwt = await new Promise((resolve, reject) => {
			jwt.verify(
				req.body?.token,
				secret,
				{
					complete: true,
				},
				(err, decode) => {
					if (err) {
						reject(new AppError(422, 'invalid signature or expired token'));
					}

					resolve(decode as jwt.Jwt);
				}
			);
		});

		const user = await prisma.user.findUniqueOrThrow({
			where: {
				//@ts-ignore
				email: response?.payload?.user?.email,
			},

			select: {
				type: true,
			},
		});

		console.log(response);

		res.status(200).json({
			success: true,
			error: false,
			user: {
				//@ts-ignore
				name: response.payload?.user?.name as string,
				//@ts-ignore
				email: response.payload?.user?.email as string,
				type: user.type,
			},
		});
	} catch (err) {
		next(err);
	}
});

function validateBody(req: Request) {
	if (!req.body?.token) {
		throw new AppError(400, 'provide token');
	}
}
