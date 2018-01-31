var user = require('./user')
var route_loader = { }
var config = require('../config')
route_loader.init = function(app){
    var routelen = config.route_info.length;
    for(var i = 0; i < routelen; i++){
        var curr = config.route_info[i];
        route_loader[curr.path] = curr.method;
    }
    app.set('route_loader',route_loader);
}
module.exports = route_loader;