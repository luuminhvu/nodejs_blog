const express = require('express');
const path = require('path');
const morgan = require('morgan');
const handlebars = require('express-handlebars');
const methodOverride = require('method-override');
const { JSDOM } = require( "jsdom" );
const { window } = new JSDOM( "" );
const $ = require( "jquery" )( window );
const db = require('./config/db');
db.connect();
const app = express();
const port = 3000;
const route = require('./routes');
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));
// HTTP logger
app.use(morgan('combined'));

// Handlebars engine
app.engine(
  'hbs',
  handlebars.create({
    extname: '.hbs',
    helpers: {
      sum : (a,b) => a+b,
    }
  }).engine,
);

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources', 'views'));
route(app);
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
