const App = require('./app');

/**
 * Generic "Service" class
 *
 * Any class that needs access to the application instance (this.app)
 * and container (this.container) can extend this class.
 */
class Service {
	constructor() {
		this.app = App.instance;
	}

	get container() {
		return this.app.container;
	}
}

module.exports = Service;
