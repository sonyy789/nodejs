var express = require('express'),
    http = require('http'),
    path = require('path')

var bodyParser =  require('body-parser'),
    cookieParser = require('cookie-parser')

var expressSession = require('express-Session')
var crypto = require('crypto')
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

// Connect Database
var mongoose = require('mongoose')
var database;
var UserSchema;
var UserModel;
function connectDB(){
    var dburl = 'mongodb://localhost:27017/local'
    console.log('DB connected.....')
    mongoose.connect(dburl);
    mongoose.Promise - global.Promise;
    database = mongoose.connection;
    database.on('error', console.error.bind(console,'mongoose connection error'))
    database.once('open', function(){
        console.log('SuccessFul Connected DB')
        createUserSchema();
    })

    database.on('disconnected', function(){
        console.log('Session out from DB .... retrying to connect');
        setInterval(connectDB, 5000);
    })
}
function createUserSchema(){
    UserSchema = require('./database/userSchema').createSchema(mongoose);

    UserSchema.static('findById', function(id,callback){
        return this.find({id:id},callback)
    })
    UserModel = mongoose.model('users', UserSchema)
    user.init(database, UserSchema, UserModel)
}
/// Start Express Server
http.createServer(app).listen(config.server_port, function(){
    console.log('Express Server is started ... on port '+config.server_port)
    connectDB();
})
