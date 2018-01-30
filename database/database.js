var mongoose = require('mongoose')
var config = require('../config')
var database = {}

database.init = function(app, config){
    connect(app, config);
}
function connect(app, config){

}
function createSchema(app, config){
    var schemaLen = config.db_schemas.length;

    for(var i = 0; i < schemaLen; i++){
        var curr = config.db_schemas[i];

        var currSchema = require(curr.file).createSchema(mongoose);
        var currModel = require(curr.collection, currSchema);

        database[curr.schemaName] = currSchema;
        databse[curr.modelName] = currModel;
    }
    app.set('database', database)
}
module.exports = database;