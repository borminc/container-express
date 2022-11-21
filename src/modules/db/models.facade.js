import { Sequelize } from 'sequelize';
import Container from '../../foundation/container';

const Models = new Proxy(
	class {
		static getDB() {
			return Container.get('db');
		}
	},
	{
		get(target, prop) {
			const db = target.getDB();

			if (!db instanceof Sequelize) {
				throw new Error('Expected a Sequelize instance.');
			}

			return db.models[prop];
		},
	}
);

export default Models;
