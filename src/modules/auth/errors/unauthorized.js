class Unauthorized extends Error {
	statusCode = 401;

	report() {}

	render() {
		return 'Unauthorized';
	}
}

module.exports = Unauthorized;
