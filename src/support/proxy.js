const handlers = {
	get: (target, prop, receiver) => {
		if (prop in target && prop[0] !== '_') {
			if (typeof target[prop] === 'function') {
				return target[prop].bind(target);
			} else {
				return target[prop];
			}
		} else {
			throw new Error('Proxy Error');
		}
	},
};

const proxy = obj => {
	return new Proxy(obj, handlers);
};

module.exports = proxy;
