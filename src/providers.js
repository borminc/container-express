const ErrorHandlingProvider = require('./foundation/error-handling/error-handling.provider');
const AuthProvider = require('./modules/auth/auth.provider');
const DBProvider = require('./modules/db/db.provider');

/**
 * All the providers in the app
 */
module.exports = [DBProvider, ErrorHandlingProvider, AuthProvider];
