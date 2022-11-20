import ErrorHandlingProvider from './foundation/error-handling/error-handling.provider';
import AuthProvider from './modules/auth/auth.provider';
import DBProvider from './modules/db/db.provider';

/**
 * All the providers in the app
 */
export default [DBProvider, ErrorHandlingProvider, AuthProvider];
