const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const csrf = require('csurf');

const db = require('./data/database');
const addCsrfTokenMiddleware = require('./middlewares/csrf-token');

// load env vars
dotenv.config({ path: './config/config.env' });

const authRoutes = require('./routes/auth.routes');

const app = express();
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));

app.use(csrf());
app.use(addCsrfTokenMiddleware);

app.use(authRoutes);

db.connectToDatabase()
  .then(function () {
    app.listen(process.env.PORT, () => {
      console.log(
        `Server is running on PORT: ${process.env.PORT} and the database connection was successful`
      );
    });
  })
  .catch(function (error) {
    console.log('Failed to connect to database');
    console.log(error);
  });