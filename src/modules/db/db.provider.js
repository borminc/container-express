const Provider = require('../../foundation/provider');
const DB = require('./db.facade');

class DBProvider extends Provider {
	register() {
		this.container.register('db', container => require('./sequelize'), true);

		require('./models');
	}

	async boot() {
		const db = this.container.get('db');

		await db.authenticate();

		await db.sync({ alter: process.env.APP_ENV === 'local' });
	}
}

module.exports = DBProvider;
