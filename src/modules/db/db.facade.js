import Container from '../../foundation/container';

class DBFacade {
	static get getContainerKey() {
		return 'db';
	}

	static get instance() {
		return Container.get(DB.getContainerKey);
	}
}

const DB = new Proxy(DBFacade, {
	get(target, prop, receiver) {
		if (target[prop] !== undefined) {
			return target[prop];
		}

		if (target.instance) {
			if (target.instance[prop] !== undefined) {
				return target.instance[prop];
			}

			if (
				target.instance.models &&
				target.instance.models[prop] !== undefined
			) {
				return target.instance.models[prop];
			}
		}

		return undefined;
	},
});

export default DB;
