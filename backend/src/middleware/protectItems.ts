import { Request, Response, NextFunction } from 'express';
import { AppError } from '@error';
import { prisma } from '@utils';
import jwt from 'jsonwebtoken';

export default async function handler(
	req: Request,
	res: Response,
	next: NextFunction
) {
	try {
		let token: string = '';

		const secret: string = process.env.JWT_SECRET as string;

		if (
			req?.headers?.authorization &&
			req?.headers?.authorization?.startsWith('Bearer')
		) {
			token = req.headers.authorization.split(' ')[1];
		}

		if (req.cookies?.jwt) {
			token = req.cookies.jwt;
		}

		if (!token) {
			throw new AppError(401, 'please logged in first');
		}

		const decoded: jwt.Jwt = await new Promise((resolve, reject) => {
			jwt.verify(token, secret, { complete: true }, (err, decoded) => {
				if (err) reject(err);

				resolve(decoded as jwt.Jwt);
			});
		});

		const user = await prisma.user.findUnique({
			where: {
				//@ts-ignore
				email: decoded.payload.user.email,
			},

			select: {
				type: true,
				id: true,
			},
		});

		if (user?.type !== 'ADMIN') {

			// if you want to public all the get methods you can just move this left condiftion on upper side
			if (req.method === 'GET' || req.path?.includes('borrow')) {
				Object.assign(req, {
					user,
				});
				next();
				return;
			}

			throw new AppError(401, "you're not authorized to this route");
		}

		Object.assign(req, {
			user,
		});

		next();
	} catch (err) {
		next(err);
	}
}
