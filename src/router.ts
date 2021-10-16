import express from 'express';
import controller from './controllers';

const router = express.Router();

router.get('/', controller.root);

router.get('/user/all', controller.readAllUsers);

router.post('/user/insert', controller.insertSingleUser);

router.delete('/user/delete/id/:id', controller.deleteSingleUser);

export default router;