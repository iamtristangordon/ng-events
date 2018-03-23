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

app.use(function(req, res, next) {
    var contentType = req.headers['content-type'] || ''
    var mime = contentType.split(';')[0];
     // Only use this middleware for content-type: application/octet-stream
     if(mime != 'application/octet-stream') {
         return next();
     }
    var data = '';
    req.setEncoding('binary');
     req.on('data', function(chunk) { 
        data += chunk;
    });
    req.on('end', function() {
       req.rawBody = data;
       next();
   });
 });

app.use(express.static(__dirname + '/../../dist'));

// routes
app.use('/api', require('./controllers/events.controller'));

// start server
app.listen(port);
console.log(port)