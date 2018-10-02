const express = require('express');
const morgan = require('morgan');
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const app = express();

mongoose.Promise = global.Promise;
const ENV = require('./ENV');
mongoose.connect(ENV.CONNECTION_STRING,  { useNewUrlParser: true })
    .then(() => console.log("You are Connected :p"))
    .catch(() => console.log("Opsss ! Somthing happned :("));

// Dummy Data !

/*
 * I had a problem installing pow-mongodb-fixtures in the docker container
 * I used this line in the Dockerfile : RUN  cd /usr/app/ & npm install pow-mongodb-fixtures
 * Not sure if it solve the problem (because I got int the container and typed the command there too)
 */

const fixtures = require('pow-mongodb-fixtures').connect('timeTracking', {
    host: 'mongo',
    port: 27017
});
const data = require('./data');
fixtures.clearAndLoad(data, function(err) {
    if(err){
        console.error(err);
    }else{
        console.log("Dummy Data Added x)")
    }
});


// MiddleWare

app.use(cookieParser());
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
// Routes

app.use('/', require('./routes/index'));
app.use('/api/tasks', require('./routes/api/tasks'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    let err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// Start The Server

const port = process.env.PORT || '5000';
app.listen(port);
console.log('Server Listning at ' + port);