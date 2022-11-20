require('dotenv/config');
const App = require('./foundation/app');
const ErrorHandlingProvider = require('./foundation/error-handling/error-handling.provider');
const AuthProvider = require('./modules/auth/auth.provider');
const DBProvider = require('./modules/db/db.provider');

const app = new App();

app.bootstrap();

app.registerProviders([DBProvider, ErrorHandlingProvider, AuthProvider]);

app.boot();

app.listen(process.env.APP_PORT || 3000);
