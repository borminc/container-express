import { Model, DataTypes } from 'sequelize';
import Container from '../../../foundation/container';

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

export default User;
