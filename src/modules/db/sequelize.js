const { Sequelize } = require('sequelize');

const dbConfig = {
	connection: process.env.DB_CONNECTION,
	databaseName: process.env.DB_NAME,
	host: process.env.DB_HOST,
	port: process.env.DB_PORT,
	username: process.env.DB_USERNAME,
	password: process.env.DB_PASSWORD,
};

const sequelize = new Sequelize(
	dbConfig.databaseName,
	dbConfig.username,
	dbConfig.password,
	{
		port: dbConfig.port,
		host: dbConfig.host,
		dialect: dbConfig.connection,
		logging: false,
	}
);

module.exports = sequelize;
