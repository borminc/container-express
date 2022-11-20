import Provider from '../../foundation/provider';
import sequelize from './sequelize';

class DBProvider extends Provider {
	register() {
		this.container.register('db', container => sequelize, true);

		require('./models');
	}

	async boot() {
		const db = this.container.get('db');

		await db.authenticate();

		await db.sync({ alter: process.env.APP_ENV === 'local' });
	}
}

export default DBProvider;
