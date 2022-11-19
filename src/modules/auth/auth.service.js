const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Unauthorized = require('./errors/unauthorized');

class AuthService {
	hashPassword(password) {
		return bcrypt.hashSync(password);
	}

	validate(password) {
		if (!bcrypt.compareSync(password || '', process.env.HASH_PASSWORD)) {
			throw new Unauthorized();
		}

		// VERIFY: add exp?
		return jwt.sign(
			{
				idk: Math.floor(Math.random() * 1000000), // don't have any data to add, so here's sth ig lol
				auth: true,
			},
			process.env.JWT_SECRET
		);
	}
}

module.exports = AuthService;
