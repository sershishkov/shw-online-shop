const expressSession = require('express-session');
const mongoDbStore = require('connect-mongodb-session');

function createSessionStore() {
  const MongoDBStore = mongoDbStore(expressSession);
  const store = new MongoDBStore({
    uri: process.env.MONGO_URI,
    databaseName: process.env.DATA_BASE_NAME,
    collection: 'sessions',
  });
  return store;
}

function createSessionConfig() {
  return {
    secret: process.env.SECRET_SESSION,
    resave: false,
    saveUninitialized: false,
    store: createSessionStore(),
    cookie: {
      maxAge: 2 * 24 * 60 * 60 * 1000,
    },
  };
}

module.exports = createSessionConfig;
