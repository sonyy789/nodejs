var database;
var UserSchema;
var UserModel;
var init = function(db, schema, model){
    database = db;
    UserSchema = schema;
    UserModel=model;
}
var login = function(req, res){
    var id = req.body.id;
    var password  = req.body.password;
    if(!id || !password){
        res.end('NO input ID or Password')
        return;
    }
    if(database){
        Login(database, id, password, function(err, results){

            if(err) {throw err;}
            if(results){
                res.writeHead('200',{'Content-Type':'text/html; charset = utf8'})
                res.write('<h1>LOGIN SUCCESS</h1>')
                res.write('<div><p>USER ID : '+id+'</p></div>')
                res.write('<div><p>USER PASSWORD : '+password+'</p></div>')
                res.end();
            }else{
                res.writeHead('200',{'Content-Type':'text/html; charset = utf8'})
                res.write('<h1>LOGIN FAIL</h1>')
                res.end();
            }
        })
    }else {
        console.log('connect db error');
        res.writeHead('200', {'Content-Type': 'text/html; charset = utf8'})
        res.write('<h1>DB FAIL</h1>')
        res.end();
        return;
    }
}
var adduser = function(req, res){
    var id = req.body.id;
    var password = req.body.password;
    var name = req.body.name;

    if(database){
        addUser(database,id,password,name,function(err){
            if(err) {throw err}

            res.writeHead('200',{'Content-Type':'text/html; charset = utf8'})
            res.write('<h1>SIGN SUCCESS</h1>')
            res.write('<div><p>USER ID : '+id+'</p></div>')
            res.write('<div><p>USER PASSWORD : '+password+'</p></div>')
            res.write('<div><p>USER NAME : '+name+'</p></div>')
            res.end();
        })

    }else{
        console.log('connect db error');
        res.writeHead('200', {'Content-Type': 'text/html; charset = utf8'})
        res.write('<h1>DB FAIL</h1>')
        res.end();
        return;

    }

}

var Login = function(database, id, password, callback) {
    console.log('login called ')

    UserModel.findById(id, function(err, results) {
        if (err) {
            callback(err, null);
            return;
        }
        if(results.length > 0){
            if(results[0]._doc.password == password){
                callback(null, results)
            }else{
                console.log('Incorrect password error');
                callback(null, null);
            }
        }
    })
}
var addUser = function(database, id, password, name, callback){
    console.log('AddUser called ')

    var user = new UserModel({
        'id':id,
        'password':password,
        'name':name
    })

    user.save(function(err){
        if(err){
            callback(err, null);
            return;
        }
        callback(null, user);
    })
}
module.exports.init = init;
module.exports.login = login;
module.exports.adduser = adduser;