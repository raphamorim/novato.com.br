
/**
 * Module dependencies.
 */

var express = require('express'),
    routes = require('./routes/index'),
    http = require('http'),
    path = require('path'),
    mongoose = require('mongoose'),
    middleware = require('./middleware'),
    env = require('./config/environment'),
    auth = middleware.auth;

var app = express();

// conecting to mongoDB
mongoose.connect(env.config.mongo);

// all environments
app.set('port', process.env.PORT || 8012);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.cookieParser('newbie'));
app.use(express.session());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', auth, routes.index);
app.get('/signup/:account', auth, routes.signUp);
app.post('/register/:account', auth, routes.register);
app.get('/partial/forms/:name', auth, routes.partialForms);
app.get('/home', auth, routes.home);

http.createServer(app).listen(app.get('port'), function(){
  console.log('\n[LOG] Newbie on port ' + app.get('port'));
});
