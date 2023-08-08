import { catchError } from '@error';
import { prisma } from '@utils';

export default catchError(async (req, res, next) => {
	try {
		let data = {};

		if (req.body?.name) {
			data = {
				name: req.body.name,
			};
		}

		if (req.body?.available) {
			data = {
				...data,
				available: req.body.available,
			};
		}

		if (req.body?.description) {
			data = {
				...data,
				description: req.body.description,
			};
		}

		if (req.body?.data) {
			data = {
				...data,
				data: req.body.data,
			};
		}
		if (req.body?.type) {
			data = {
				...data,
				type: req.body.type,
			};
		}

		await prisma.items.update({
			where: {
				id: req.params.id,
			},

			data: {
				...data,
			},
		});

		res.status(202).json({
			updated: true,
		});
	} catch (err) {
		next(err);
	}
});
