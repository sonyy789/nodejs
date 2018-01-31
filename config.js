module.exports = {
    db_url : 'mongodb://localhost:27017/local',
    server_port:process.env.PORT||3000,
    db_schemas:[
        {file:'./userSchema', collection:'users',schemaName:'UserSchema', modelName:'UserModel'}
    ],
    route_info:[
        {file:'./user', path: '/process/login', method:'login', type:'post'},
        {file:'./user', path: '/process/signup', method:'adduser', type:'post'},
    ]
}