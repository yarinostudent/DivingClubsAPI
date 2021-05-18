const indexR = require('./index');
const clubsR = require('./clubs');
const usersR = require('./users');

//allows to get request from other domain
exports.originAllow = (app) => {
    app.all('*', function (req, res, next) {
        if (!req.get('Origin')) return next();
        res.set('Access-Control-Allow-Origin', '*');
        res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
        res.set('Access-Control-Allow-Headers', 'X-Requested-With,Content-Type,x-auth-token');
        next();
    });
}

exports.routesInit = (app) =>{
    app.use('/', indexR);
    app.use('/clubs', clubsR);
    app.use('/users', usersR);

    app.use((req,res)=>{
        res.status(400).json({msg:"404 Page Not Found"});
    })
}