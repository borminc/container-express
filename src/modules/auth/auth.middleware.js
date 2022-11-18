const Middleware = require('../../foundation/http/middleware');
const jwt = require('jsonwebtoken');
const Unauthorized = require('./errors/unauthorized');

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

module.exports = AuthMiddleware;
