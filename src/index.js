require('dotenv/config');
const App = require('./foundation/app');
const providers = require('./providers');

async function boot() {
	const app = new App();

	app.bootstrap();

	await app.registerProviders(providers);

	await app.boot();

	app.listen(process.env.APP_PORT || 3000);
}

boot();
