import Middleware from '../../foundation/http/middleware';
import jwt from 'jsonwebtoken';
import Unauthorized from './errors/unauthorized';

class AuthMiddleware extends Middleware {
	handle(req, res, next) {
		const token = req.query.token; // FIX: get from Authorization header

		try {
			const decoded = jwt.verify(token, process.env.JWT_SECRET);
			next();
		} catch (e) {
			throw new Unauthorized();
		}
	}
}

export default AuthMiddleware;
