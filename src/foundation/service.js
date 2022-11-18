const App = require('./app');
const Container = require('./container');

/**
 * Generic "Service" class
 *
 * Any class that needs access to the application instance (this.app)
 * and container (this.container) can extend from this class.
 */
class Service {
	/**
	 * @type {App}
	 */
	app;

	constructor() {
		this.app = Container.get('app');
	}

	get container() {
		return this.app.container;
	}
}

module.exports = Service;
