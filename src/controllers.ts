import express from 'express';
import { db } from './index';

async function root(req: express.Request, res: express.Response): Promise<void> {
	res.send('Connection Success');
}

async function readAllUsers(req: express.Request, res: express.Response) {
	db.all(
		"select * from User",
		(err, rows) => {
			if (err) {
				sendError(res, err);
			} else {
				res.status(200).json(rows);
			}
		},
	);
}

async function insertSingleUser(req: express.Request, res: express.Response) {
	const data = req.body
	const stmt = db.prepare("insert into User(name, age) values(?, ?)");
	stmt.run([data.name, data.age],
		function (this, err) {
			if (err) {
				sendError(res, err);
			} else {
				res.status(200).json({
					id: this.lastID,
					name: data.name,
					age: data.age,
				});
			}
		});
}

async function deleteSingleUser(req: express.Request, res: express.Response) {
	db.run("delete from User where id = ?",
		[req.params.id],
		(err) => {
			if (err) {
				sendError(res, err);
			} else {
				res.status(200).send();
			}
		});
}

function sendError(res: express.Response, err: Error) {
	res.status(401).json({
		status: "error",
		message: err.message
	});
}
export default {
	root,
	readAllUsers,
	insertSingleUser,
	deleteSingleUser,
};