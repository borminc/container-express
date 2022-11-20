import AuthService from './auth.service';
import Provider from '../../foundation/provider';
import AuthController from './auth.controller';
import AuthMiddleware from './auth.middleware';

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

export default AuthProvider;
