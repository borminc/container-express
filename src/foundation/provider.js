const express = require('express');
const Router = express.Router();
const Controller = require('./http/controller');
const Middleware = require('./http/middleware');
const Service = require('./service');

class Provider extends Service {
	/**
	 * Register services into the container
	 *
	 * Warning: Since the container is being populated with services at this stage,
	 * don't get any service from the container. Do it in boot() instead when all services
	 * are registered.
	 *
	 * @returns {void}
	 */
	register() {}

	/**
	 * Boot the module after all services are registered in the container
	 *
	 * @returns {void}
	 */
	boot() {}

	/**
	 * Do any additional configs after all services are booted
	 *
	 * @returns {void}
	 */
	booted() {}

	/**
	 * Use this method to preserve the `this` context in the controller methods
	 *
	 * @param {new () => Controller|Controller} controller
	 * @returns {Controller}
	 */
	controller(controller) {
		return this._proxyClassInstance(controller, Controller);
	}

	/**
	 * Use this method to preserve the `this` context in the middleware methods
	 *
	 * @param {new () => Middleware|Middleware} middleware
	 * @returns {Middleware}
	 */
	middleware(middleware) {
		return this._proxyClassInstance(middleware, Middleware);
	}

	/**
	 * @param {new () => Middleware|Middleware} middleware
	 */
	applyMiddleware(middleware) {
		return this.middleware(middleware).handle;
	}

	/**
	 * @returns {Router}
	 */
	router() {
		return express.Router();
	}

	/**
	 * @param {string} prefix
	 * @param {Router} router
	 */
	useRouter(prefix, router) {
		this.app.express.use(prefix, router);
	}

	/**
	 * @param {new () => mixed} actualClass
	 * @param {new () => mixed} expectedClass
	 * @returns {bool}
	 */
	_isSubclass(actualClass, expectedClass) {
		return (
			actualClass.prototype instanceof expectedClass ||
			actualClass.prototype === expectedClass
		);
	}

	/**
	 * @param {new () => mixed|Object} actualClass
	 * @param {new () => mixed|Object} expectedClass
	 * @returns {mixed}
	 */
	_proxyClassInstance(actualClass, expectedClass = undefined) {
		if (actualClass instanceof expectedClass) {
			return this._proxy(actualClass); // an instance of the class was passed, so just proxy it
		}

		if (typeof actualClass !== 'function') {
			throw new Error('Invalid argument. A class or instance expected.');
		}

		if (expectedClass && !this._isSubclass(actualClass, expectedClass)) {
			throw new Error(actualClass.name + ' is not a ' + expectedClass.name);
		}

		return this._proxy(new actualClass());
	}

	_proxy(obj) {
		return new Proxy(obj, {
			get: (target, prop, receiver) => {
				if (prop in target && prop[0] !== '_') {
					if (typeof target[prop] === 'function') {
						return target[prop].bind(target);
					} else {
						return target[prop];
					}
				} else {
					throw new Error('Proxy Error');
				}
			},
		});
	}
}

module.exports = Provider;
