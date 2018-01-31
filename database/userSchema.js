var Schema = { }
Schema.createSchema = function(mongoose){

    UserSchema = mongoose.Schema({
        id:{type:String, require:true, unique:true, 'default':''},
        password:{type:String, require:true, 'default':''},
        name:{type:String, index:'hashed', 'default':''},
        age:{type:Number, 'default':-1},
        created_at:{type:Date, index:{unique:false}, 'default':Date.now()}
    })
    return UserSchema;
}

module.exports =Schema