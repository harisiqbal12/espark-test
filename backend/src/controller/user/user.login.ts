import { Response, Request } from 'express';
import bcrypt from 'bcrypt';
import cookie from 'cookie';

import { AppError, catchError } from '@error';
import { prisma } from '@utils';
import signToken from './signToken';

export default catchError(async (req, res: Response<R>, next) => {
	try {
		validateBody(req);

		const user = await prisma.user.findUniqueOrThrow({
			where: {
				email: req.body.email,
			},

			select: {
				password: true,
				name: true,
				email: true,
			},
		});

		const passwordMatch = await bcrypt.compare(req.body.password, user.password);

		if (!passwordMatch) throw new AppError(401, 'invalid password');

		const token = signToken({
			name: user.name,
			email: user.email,
		});

		const maxAgeInSeconds = 24 * 60 * 60;
		const options = {
			maxAge: maxAgeInSeconds,
			httpOnly: false,
			secure: false,
			path: '/',
		};

		const cookieString = cookie.serialize('jwt', token, options);
		res.setHeader('Set-Cookie', cookieString);
		res.setHeader('Authorization', `Bearer ${token}`);

		res.status(200).json({
			success: true,
			error: false,
			message: 'user logged in',
			token: token,
		});
	} catch (err) {
		next(err);
	}
});

function validateBody(req: Request) {
	if (req.body.password.length < 8) {
		throw new AppError(400, 'password too short');
	}
}

type R = {
	success: boolean;
	error: boolean;
	message: string | null;
	token: string | null;
};
