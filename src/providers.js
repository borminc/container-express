const ErrorHandlingProvider = require('./foundation/error-handling/error-handling.provider');
const AuthProvider = require('./modules/auth/auth.provider');

/**
 * All the providers in the app
 */
module.exports = [ErrorHandlingProvider, AuthProvider];
