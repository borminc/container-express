import Service from '../service';

class Middleware extends Service {
	handle(req, res, next) {
		next();
	}
}

export default Middleware;
