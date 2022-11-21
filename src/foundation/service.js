import App from './app';

/**
 * Generic "Service" class
 *
 * Any class that needs access to the application instance (this.app)
 * and container (this.container) can extend this class.
 */
class Service {
	constructor() {
		this.app = App.instance;

		return new Proxy(this, {
			get(target, prop, receiver) {
				if (typeof target[prop] === 'function') {
					return target[prop].bind(target);
				}

				return target[prop];
			},
		});
	}

	get container() {
		return this.app.container;
	}
}

export default Service;
