const express = require('express');
const Container = require('./container');
const ErrorHandlingProvider = require('./error-handling/error-handling.provider');
const Provider = require('./provider');

class App {
	/**
	 * @param {Provider[]}
	 */
	providers = [];

	constructor() {
		this.express = express();
	}

	get container() {
		return Container.instance;
	}

	bootstrap() {
		this.container.register('app', () => this, true);
	}

	get defaultProviders() {
		return [ErrorHandlingProvider];
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
		[...providers, ...this.defaultProviders].forEach(provider =>
			this.registerProvider(provider)
		);
	}

	boot() {
		this.providers.forEach(p => p.boot());
	}

	listen(port) {
		this.express.listen(port, () => {
			console.log(`Listening on http://localhost:${port}`);
		});
	}
}

module.exports = App;
