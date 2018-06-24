var express = require('express');
var exphbs = require('express-handlebars');
var express_handlebars_sections = require('express-handlebars-sections');
var path = require('path');

var homeController = require('./controllers/homeController');

var app = express();

app.engine('hbs', exphbs({
    defaultLayout: 'main',
    layoutsDir: 'views/layout/',
    helpers: {
        section: express_handlebars_sections()
    }
}));
app.set('view engine', 'hbs');
app.use(express.static(path.resolve(__dirname, 'public')));

app.get('/', (req, res)=>{
    res.redirect('/home');
});

app.use('/home', homeController);

app.listen(3000, () => {
    console.log('Site running on port 3000');
});
