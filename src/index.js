require('dotenv/config');

const App = require('./foundation/app');
const AuthProvider = require('./modules/auth/auth.provider');

const app = new App();

app.bootstrap();

app.registerProviders([AuthProvider]);

app.boot();

app.listen(process.env.PORT || 3000);
