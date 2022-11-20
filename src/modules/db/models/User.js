const { DataTypes, Model } = require('sequelize');
const Container = require('../../../foundation/container');

class User extends Model {}

User.init(
	{
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true,
		},
		userName: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	},
	{
		sequelize: Container.get('db'), // connection instance
		modelName: 'User',
	}
);

module.exports = User;
