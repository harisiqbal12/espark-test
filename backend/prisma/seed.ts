import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function secondary() {
	const res = await prisma.user.findMany();

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
