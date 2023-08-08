import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import cookie from 'cookie';

import { AppError, catchError } from '@error';
import { prisma } from '@utils';
import signToken from './signToken';

export default catchError(async (req, res: Response<R>, next) => {
	try {
		validateBody(req);

		const user = await prisma.user.findUnique({
			where: {
				email: req.body.email as string,
			},

			select: {
				id: true,
			},
		});

		if (user?.id) {
			throw new AppError(409, 'email address already exists');
		}

		const encPassword = await bcrypt.hash(
			req.body.password,
			process.env.SALT as string
		);

		const createdUser = await prisma.user.create({
			data: {
				name: req.body.name,
				email: req.body.email,
				password: encPassword,
			},

			select: {
				name: true,
				email: true,
			},
		});

		const token = signToken({ name: createdUser.name, email: createdUser.email });

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
			message: 'user created',
			token: token,
		});
	} catch (err) {
		next(err);
	}
});

function validateBody(req: Request) {
	const fields: Array<string> = [];
	let error: boolean = false;

	if (!req.body?.name) {
		fields.push('name');

		error = true;
	}

	if (!req.body?.email) {
		fields.push('email');
		error = true;
	}

	if (!req.body?.password) {
		fields.push('password');
		error = true;
	}

	if (error) {
		throw new AppError(400, `${fields.join(',')} fields are missing`);
	}

	if (req?.body.name.length > 20) {
		throw new AppError(422, 'name is too long');
	}

	if (req.body.password.length < 8) {
		throw new AppError(422, 'password is too short');
	}

	if (!req.body.email.includes('@') || !req.body.email.includes('.com')) {
		throw new AppError(422, 'invalid email address');
	}
}

type R = {
	readonly success: boolean;
	readonly error: boolean;
	readonly message: string | null;
	readonly token: string | null;
};
