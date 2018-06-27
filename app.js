var express = require('express');
var exphbs = require('express-handlebars');
var express_handlebars_sections = require('express-handlebars-sections');
var path = require('path');

var session = require('express-session');
var MySQLStore = require('express-mysql-session')(session);




var homeController = require('./controllers/homeController');
var handleLayout = require('./middle-ware/handleLayout');

var app = express();

app.engine('hbs', exphbs({
    defaultLayout: 'main',
    layoutsDir: 'views/layout/',
    helpers: {
        section: express_handlebars_sections()
    }
}));

var sessionStore = new MySQLStore({
    host: 'localhost',
    port: 3306,
    user: 'root',
    database: 'databanhang',
    createDatabaseTable: true,
    schema: {
        tableName: 'sessions',
        columnNames: {
            session_id: 'session_id',
            expires: 'expires',
            data: 'data'
        }
    }
});

app.use(session({
    key: 'session_cookie_name',
    secret: 'session_cookie_secret',
    store: sessionStore,
    resave: false,
    saveUninitialized: false
}));
app.set('view engine', 'hbs');
app.use(express.static(path.resolve(__dirname, 'public')));
app.use(handleLayout);

app.get('/', (req, res)=>{
    res.redirect('/home');
});

app.use('/home', homeController);

app.listen(3000, () => {
    console.log('Site running on port 3000');
});
