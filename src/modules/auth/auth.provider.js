import AuthService from './auth.service';
import Provider from '../../foundation/provider';
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

	async boot() {
		(await import('./auth.routes')).default(this.app);
	}
}

export default AuthProvider;
