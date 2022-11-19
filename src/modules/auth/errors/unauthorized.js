class Unauthorized extends Error {
	statusCode = 401;

	constructor(message) {
		super(message || 'Unauthorized');
	}

	report() {}

	render() {
		return 'Unauthorized';
	}
}

module.exports = Unauthorized;
