var express = require('express');
var exphbs = require('express-handlebars');
var express_handlebars_sections = require('express-handlebars-sections');
var path = require('path');
var bodyParser = require('body-parser');
var wnumb = require('wnumb');

var session = require('express-session');
var MySQLStore = require('express-mysql-session')(session);




var homeController = require('./controllers/homeController'),
    accountController = require('./controllers/accountController'),
    categoryController = require('./controllers/categoryController'),
    productController = require('./controllers/productController'),
    cartController = require('./controllers/cartController');

var handleLayout = require('./middle-ware/handleLayout');
    restrict = require('./middle-ware/restrict');

var app = express();

app.engine('hbs', exphbs({
    defaultLayout: 'main',
    layoutsDir: 'views/layout/',
    helpers: {
        section: express_handlebars_sections(),
        number_format: n => {
            var nf = wnumb({
                thousand: ','
            });
            return nf.to(n);
        }
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
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

app.get('/', (req, res)=>{
    res.redirect('/home');
});

app.use('/home', homeController);
app.use('/category', categoryController);
app.use('/product', productController);
app.use('/account', accountController);

app.use('/cart', restrict, cartController);

app.listen(3000, () => {
    console.log('Site running on port 3000');
});
