import Controller from '../../foundation/http/controller';

class AuthController extends Controller {
	index(req, res) {
		// testing
		const password = this.container.get('auth').hashPassword('password');

		res.send(password);
	}

	login(req, res) {
		const jwt = this.container.get('auth').validate(req.query.password);

		res.send(jwt);
	}

	auth(req, res) {
		res.send('authenticated');
	}
}

export default AuthController;
