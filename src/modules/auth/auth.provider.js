const AuthService = require('./auth.service');
const BaseProvider = require('../../foundation/provider');
const AuthController = require('./auth.controller');
const AuthMiddleware = require('./auth.middleware');

class AuthProvider extends BaseProvider {
	register() {
		this.container.register('auth', container => new AuthService());
	}

	boot() {
		const router = this.router();
		const controller = this.controller(AuthController);

		router.get('/', controller.index);
		router.get('/login', controller.login);
		router.get('/auth', this.applyMiddleware(AuthMiddleware), controller.auth);

		this.useRouter('/auth', router);
	}
}

module.exports = AuthProvider;
