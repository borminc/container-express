const Service = require('../service');

class Middleware extends Service {
	handle(req, res, next) {
		next();
	}
}

module.exports = Middleware;
