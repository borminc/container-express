import express from 'express';
import Container from './container';

class App {
	constructor() {
		this.express = express();
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
	async bootstrap() {
		this.container.register('app', () => this, true);
	}

	/**
	 * @param {(new () => Provider)[]} provider
	 */
	async registerProviders(providers) {
		for (const provider of providers) {
			await this.registerProvider(provider);
		}
	}

	/**
	 * @param {new () => Provider} provider
	 */
	async registerProvider(provider) {
		const p = new provider();

		if (typeof p.register === 'function') {
			await p.register();
		}

		this.providers.push(p);

		if (this.hasBooted) {
			// everything else has has booted as the app has booted,
			// so now just boot this provider
			await this.bootProvider(p);
		}
	}

	/**
	 * @param {Provider} provider
	 */
	async bootProvider(provider) {
		if (typeof provider.boot === 'function') {
			await provider.boot();
		}
	}

	/**
	 * @param {Provider} provider
	 */
	async bootedProvider(provider) {
		if (typeof provider.booted === 'function') {
			await provider.booted();
		}
	}

	/**
	 * Boot the app
	 */
	async boot() {
		for (const provider of this.providers) {
			await this.bootProvider(provider);
		}

		this.booted();
	}

	/**
	 * App has booted
	 */
	async booted() {
		this.hasBooted = true;

		for (const provider of this.providers) {
			await this.bootedProvider(provider);
		}
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

export default App;
