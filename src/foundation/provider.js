const express = require('express');
const proxy = require('../support/proxy');
const Router = express.Router();
const Controller = require('./http/controller');
const Middleware = require('./http/middleware');
const Service = require('./service');

class Provider extends Service {
	/**
	 * Register services (into the container)
	 *
	 * @returns {void}
	 */
	register() {}

	/**
	 * Boot the module
	 *
	 * @returns {void}
	 */
	boot() {}

	/**
	 * Use this method to preserve the `this` context in the controller methods
	 *
	 * @param {new () => Controller} controller
	 * @returns {Controller}
	 */
	controller(controller) {
		return proxy(new controller());
	}

	/**
	 * Use this method to preserve the `this` context in the middleware methods
	 *
	 * @param {new () => Middleware} middleware
	 * @returns {Middleware}
	 */
	middleware(middleware) {
		return proxy(new middleware());
	}

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
}

module.exports = Provider;
