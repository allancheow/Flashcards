const express = require(`express`);
// body-parser is now built into express, no longer needed
// const bodyParser = require(`body-parser`);
const cookieParser = require(`cookie-parser`);

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/static', express.static('public'));

app.set('view engine', 'pug');

const mainRoutes = require('./routes');
const cardRoutes = require('./routes/cards');

app.use(mainRoutes);
app.use('/cards', cardRoutes);

app.use((req, res, next) => {
  console.log('Hello');
  // const err = new Error('Oh noes!');
  // err.status = 500;
  next();
});

app.use((req, res, next) => {
  console.log('world');
  next();
});

app.use((req, res, next) => {
  const err = new Error('Not found');
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  res.locals.error = err;
  if (err.status >= 100 && err.status < 600) res.status(err.status);
  else res.status(500);
  res.render('error');
});

app.listen(3000, () => {
  console.log('The application is running on localhost:3000!');
});
