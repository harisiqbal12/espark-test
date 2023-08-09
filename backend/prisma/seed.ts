import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function secondary() {
	const res = await prisma.user.update({
		where: {
			email: 'admin@gmail.com',
		},

		data: {
			name: 'HarrisK',
		},
	});

	console.log(res);
}

secondary()
	.catch(e => {
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
