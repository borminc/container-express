require('dotenv/config');
const App = require('./foundation/app');
const ErrorHandlingProvider = require('./foundation/error-handling/error-handling.provider');
const AuthProvider = require('./modules/auth/auth.provider');

const app = new App();

app.bootstrap();

app.registerProviders([ErrorHandlingProvider, AuthProvider]);

app.boot();

app.listen(process.env.PORT || 3000);
