const Provider = require('../provider');

class ErrorHandlingProvider extends Provider {
	booted() {
		this.app.express.use(this.handleError);
	}

	handleError = (err, req, res, next) => {
		// Report
		if (err && typeof err.report === 'function') {
			err.report();
		} else {
			console.log(err);
		}

		// Render to a response
		if (err && typeof err.render === 'function') {
			res.status(err.statusCode || 500).send(err.render());
		} else {
			res.status(500).send('Server error');
		}
	};
}

module.exports = ErrorHandlingProvider;
