const Provider = require('../../foundation/provider');
const DB = require('./db.facade');

class DBProvider extends Provider {
	register() {
		this.container.register('db', container => require('./sequelize'), true);

		require('./models');
	}

	boot() {
		const db = this.container.get('db');

		db.authenticate().then(() =>
			db.sync({ alter: process.env.APP_ENV === 'local' })
		);
	}
}

module.exports = DBProvider;
