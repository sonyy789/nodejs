var mongoose = require('mongoose')

var database = { };

database.init = function(app, config){
    console.log('init() called')
    connect(app, config);
}
function connect(app, config){
    var dburl = config.db_url;
    console.log('DB connected.....');
    mongoose.connect(dburl);
    mongoose.Promise = global.Promise;
    var db = mongoose.connection;
    db.on('error', console.error.bind(console,'mongoose connection error'))
    db.once('open', function(){
        console.log('SuccessFul Connected DB')
        createSchema(app, config);
    })
    db.on('disconnected', function(){
        console.log('Session out from DB .... retrying to connect');
        setInterval(connectDB, 5000);
    })
}
function createSchema(app, config){
    var schemalen = config.db_schemas.length;

    for(var i = 0; i < schemalen; i++){
        var curr = config.db_schemas[i];

        var currSchema = require(curr.file).createSchema(mongoose);
        var currModel = mongoose.model(curr.collection, currSchema);

        database[curr.schemaName] = currSchema;
        database[curr.modelName] = currModel;
    }
    app.set('database', database);
}
module.exports = database;