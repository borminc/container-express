const path = require('path');
const fs = require('fs');

const directoryPath = path.join(__dirname);

const files = fs.readdirSync(directoryPath);

// Load all models
files
	.filter(file => file !== 'index.js')
	.forEach(file => {
		require('./' + file);
	});
