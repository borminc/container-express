class Container {
	/**
	 * @type {Container}
	 */
	static _instance;

	bindings = {};

	/**
	 * Get the global instance of the container (singleton)
	 *
	 * @returns {Container}
	 */
	static get instance() {
		return Container._resolveSingleTon(
			Container._instance,
			() => (Container._instance = new Container())
		);
	}

	/**
	 * Set the global container instance (singleton)
	 *
	 * @param {Container} container
	 */
	static setGlobalInstance(container) {
		if (!container instanceof Container) {
			throw new Error('Invalid container.');
		}

		Container._instance = container;
	}

	/**
	 * Initialize the global container
	 *
	 * @returns {Container}
	 */
	static init() {
		const container = new Container();

		Container.setGlobalInstance(container);

		return container;
	}

	static register(key, factory, singleton = false) {
		return Container.instance.register(key, factory, singleton);
	}

	static get(key, optional = false) {
		return Container.instance.get(key, optional);
	}

	static destroy(key) {
		return Container.instance.destroy(key);
	}

	/**
	 * @param {mixed} object
	 * @param {Function} factory
	 * @returns
	 */
	static _resolveSingleTon(object, factory) {
		return object === undefined ? factory() : object;
	}

	/**
	 * Register a service in the container
	 *
	 * @param {string} key
	 * @param {Function} factory
	 * @param {bool} singleton
	 */
	register(key, factory, singleton = false) {
		if (this.bindings[key] !== undefined) {
			throw new Error(`${key} is already registered in the container.`);
		}

		this.bindings[key] = {
			factory,
			singleton,
		};
	}

	/**
	 * Get a service from the container
	 *
	 * @param {string} key
	 * @param {bool} optional
	 */
	get(key, optional = false) {
		const bindings = this.bindings;

		if (bindings[key] === undefined) {
			if (optional) return undefined;

			throw new Error(`${key} is not registered in the container.`);
		}

		if (!bindings[key].singleton) {
			return bindings[key].factory(this);
		}

		return Container._resolveSingleTon(
			bindings[key].instance,
			() => (bindings[key].instance = bindings[key].factory(this))
		);
	}

	/**
	 * Destroy the service in the container
	 *
	 * @param {string} key
	 * @returns {void}
	 */
	destroy(key) {
		if (this.bindings[key] === undefined) {
			return;
		}

		delete this.bindings[key];
	}
}

export default Container;
