const AuthService = require('./auth.service');
const Provider = require('../../foundation/provider');
const AuthController = require('./auth.controller');
const AuthMiddleware = require('./auth.middleware');

class AuthProvider extends Provider {
	register() {
		this.container.register('auth', container => new AuthService(), true);

		this.container.register(
			'auth.middleware',
			container => new AuthMiddleware(),
			true
		);
	}

	boot() {
		const router = this.router();
		const controller = this.controller(AuthController);

		router.get('/', controller.index);
		router.get('/login', controller.login);
		router.get(
			'/auth',
			this.applyMiddleware(this.container.get('auth.middleware')),
			controller.auth
		);

		this.useRouter('/auth', router);
	}
}

module.exports = AuthProvider;
