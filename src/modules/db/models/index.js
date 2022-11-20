const path = require('path');
const fs = require('fs');

const directoryPath = path.join(__dirname);

const files = fs.readdirSync(directoryPath);

// Load all models
files
	.filter(file => {
		return (
			file.indexOf('.') !== 0 &&
			file !== path.basename(__filename) &&
			file.slice(-3) === '.js'
		);
	})
	.forEach(file => {
		require('./' + file);
	});
