var express = require('express'),
    http = require('http'),
    path = require('path')

var bodyParser =  require('body-parser'),
    cookieParser = require('cookie-parser')

var expressSession = require('express-Session')
var app = express();

var config = require('./config')
app.set('port', config.server_port);

/// define middlware
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
app.use(express.static('public'))
app.use(expressSession({
    secret:'!@#()*!@',
    resave:false,
    saveUninitialized:true
}))
app.use(cookieParser());
var user = require('./routes/user')
/*
app.use('/process', require('./routes'));*/
app.post('/process/login', user.login)
app.post('/process/signup', user.adduser)

var route_loader = require('./routes/route_loader');
route_loader.init(app);

/// Start Express Server
http.createServer(app).listen(config.server_port, function(){
    console.log('Express Server is started ... on port '+config.server_port)
    var database = require('./database/database').init(app, config); //Connect DB /// setting app (Add database object >> : Have Schema, Model ... etc)
})
