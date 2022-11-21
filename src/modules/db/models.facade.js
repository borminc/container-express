import { Sequelize, ModelStatic, Model as _Model } from 'sequelize';
import Container from '../../foundation/container';

/**
 * @returns {{
 * 	[T:string]: ModelStatic<_Model<any, any>>|undefined
 * }}
 */
const Models = () => {
	const db = Container.get('db');

	if (!db instanceof Sequelize) {
		throw new Error('Expected a Sequelize instance.');
	}

	return db.models;
};

export const Model = model => Models()[model];

export default Models;
