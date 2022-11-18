class Container {
	static _instance;

	bindings = {};

	/**
	 * Get the instance of the container (singleton)
	 *
	 * @returns {Container}
	 */
	static get instance() {
		return Container.resolveSingleTon(
			Container._instance,
			() => (Container._instance = new Container())
		);
	}

	static register(key, factory, singleton) {
		return Container.instance.register(key, factory, singleton);
	}

	static get(key) {
		return Container.instance.get(key);
	}

	/**
	 * @param {mixed} object
	 * @param {Function} factory
	 * @returns
	 */
	static resolveSingleTon(object, factory) {
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
	 */
	get(key) {
		const bindings = this.bindings;

		if (bindings[key] === undefined) {
			throw new Error(`${key} is not registered in the container.`);
		}

		if (!bindings[key].singleton) {
			return bindings[key].factory(this);
		}

		return Container.resolveSingleTon(
			bindings[key].instance,
			() => (bindings[key].instance = bindings[key].factory(this))
		);
	}
}

module.exports = Container;
