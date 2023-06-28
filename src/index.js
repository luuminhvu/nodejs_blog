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
const SortMiddleware = require('./app/middlewares/SortMiddleware');
const app = express();
const port = 3000;
const route = require('./routes');
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));
// HTTP logger
app.use(morgan('combined'));
app.use(SortMiddleware);
// Handlebars engine
app.engine(
  'hbs',
  handlebars.create({
    extname: '.hbs',
    helpers: {
      sum : (a,b) => a+b,
      sortable: (field, sort) => {
        const sortType = field === sort.column ? sort.type : 'default';
       const icons = {
          default: '<ion-icon name="funnel-outline"></ion-icon>',
          asc: '<ion-icon name="funnel-outline"></ion-icon>',
          desc: '<ion-icon name="funnel-outline"></ion-icon>'

      }
      const types = {
          default: 'desc',
          asc: 'desc',
          desc: 'asc'
      }
      const type = types[sortType];
      const icon = icons[sortType];
      return `<a href="?_sort&column=${field}&type=${type}">${icon}</a>`
      }
    }
  }).engine,
);

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources', 'views'));
route(app);
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
