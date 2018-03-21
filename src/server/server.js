require('rootpath')();

let express = require('express');
let app = express();
let cors = require('cors');
let bodyParser = require('body-parser');
let config = require('config.json');
let morgan = require('morgan');
let port = process.env.PORT || 4000;

app.use(morgan('dev'));

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(__dirname + '/../../dist'));

// routes
app.use('/api', require('./controllers/events.controller'));

// start server
app.listen(port);
console.log(port)