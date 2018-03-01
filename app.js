const express = require('express');
const bodyParser = require('body-parser');
const path  = require('path');
const hbs = require('express-handlebars');
require('dotenv').config();
require('./app/config/paypal');

const app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


app.engine('hbs', hbs({extname: 'hbs', defaultLayout: 'layout', layoutsDir: path.join(__dirname + '/app/views/templates')}));
app.set('views', path.join(__dirname + '/app/views'));
app.use(express.static(path.join(__dirname + 'app/public')));
app.set('view engine', 'hbs');


app.use(express.static(__dirname + '/app/public'));


const routes = require('./app/routes/routes');
app.use(routes);

app.listen(8080);