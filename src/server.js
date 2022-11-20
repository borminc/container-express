import 'dotenv/config';
import App from './foundation/app';
import providers from './providers';

async function boot() {
	const app = new App();

	app.bootstrap();

	await app.registerProviders(providers);

	await app.boot();

	app.listen(process.env.PORT || 3000);
}

boot();
