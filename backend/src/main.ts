import 'module-alias/register';
import 'dotenv/config';

import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import routers from './router';
import { errorHandler } from './middleware';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(
	cors({
		origin: '*',
		credentials: true,
	})
);

app.use('/api', routers);

app.use('*', errorHandler);

app.get('/', (req, res) => {
	res.status(200).send('<h1>Backend Esparck</h1>');
});

app.listen(4000, () => {
	console.log('listening on port 4000');
});
