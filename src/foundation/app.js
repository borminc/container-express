const Container = require('./container');

class App {
	constructor() {
		this.express = require('express')();
		this.container = Container.init();
		this.providers = [];
		this.hasBooted = false;
	}

	/**
	 * @returns {App}
	 */
	static get instance() {
		return Container.get('app');
	}

	/**
	 * Perform any necessary configs to bootstrap the app
	 */
	bootstrap() {
		this.container.register('app', () => this, true);
	}

	/**
	 * @param {(new () => Provider)[]} provider
	 */
	registerProviders(providers) {
		providers.forEach(provider => this.registerProvider(provider));
	}

	/**
	 * @param {new () => Provider} provider
	 */
	registerProvider(provider) {
		const p = new provider();

		if (typeof p.register === 'function') {
			p.register();
		}

		this.providers.push(p);

		if (this.hasBooted) {
			// everything else has has booted as the app has booted,
			// so now just boot this provider
			this.bootProvider(p);
		}
	}

	/**
	 * @param {new () => Provider} provider
	 */
	bootProvider(provider) {
		if (typeof provider.boot === 'function') provider.boot();

		if (typeof provider.booted === 'function') provider.booted();
	}

	/**
	 * Boot the app
	 */
	boot() {
		this.providers.forEach(p => this.bootProvider(p));

		this.hasBooted = true;
	}

	/**
	 * @param {string|number} port
	 */
	listen(port) {
		this.express.listen(port, () => {
			console.log(`Listening on http://localhost:${port}`);
		});
	}
}

module.exports = App;
