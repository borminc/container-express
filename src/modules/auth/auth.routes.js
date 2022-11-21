import { Router } from 'express';
import AuthController from './auth.controller';

export default app => {
	const router = Router();
	const controller = new AuthController();

	router.get('/', controller.index);
	router.get('/login', controller.login);
	router.get(
		'/auth',
		app.container.get('auth.middleware').handle,
		controller.auth
	);

	app.express.use('/auth', router);
};
