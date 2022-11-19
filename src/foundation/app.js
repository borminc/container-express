const Container = require('./container');

class App {
	providers = [];

	container;

	constructor() {
		this.express = require('express')();
		this.container = Container.init();
	}

	/**
	 * @returns {App}
	 */
	static get instance() {
		return Container.get('app');
	}

	bootstrap() {
		this.container.register('app', () => this, true);
	}

	/**
	 * @param {new () => Provider} provider
	 */
	registerProvider(provider) {
		const p = new provider();

		if (p.register) {
			p.register();
		}

		this.providers.push(p);
	}

	registerProviders(providers) {
		providers.forEach(provider => this.registerProvider(provider));
	}

	boot() {
		this.providers.forEach(p => {
			if (typeof p.boot === 'function') p.boot();
		});

		this.providers.forEach(p => {
			if (typeof p.booted === 'function') p.booted();
		});
	}

	listen(port) {
		this.express.listen(port, () => {
			console.log(`Listening on http://localhost:${port}`);
		});
	}
}

module.exports = App;
