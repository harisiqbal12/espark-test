import jwt from 'jsonwebtoken';

const signToken = ({ ...user }: { name: string; email: string }) => {
	const secret = process.env.JWT_SECRET || '';

	return jwt.sign(
		{
			user: user,
		},
		secret,
		{
			expiresIn: '24h',
		}
	);
};

export default signToken;
