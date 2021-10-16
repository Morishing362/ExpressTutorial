import express from 'express';
import path from 'path';
import sqlite3 from 'sqlite3';
import router from './router';
import cors from 'cors';

const app = express();

const dirname = path.resolve();

export const db = new sqlite3.Database(
	path.join(dirname, 'src', 'db', 'database.sqlite3'),
	(err) => {
		if (err) {
			console.log(err.message);
		}
	});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(router);

app.listen(4001, () => {
	console.log('The server is listening on port 4001');
});
