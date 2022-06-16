const express = require('express');
const morgan = require('morgan'); // HTTP request logger middleware for nodejs
const expHbs = require('express-handlebars');
const path = require('path'); //built-in nodejs
const route = require('./routes');
const cookieParser = require('cookie-parser')

const app = express(); // đại diện cho ứng dụng nodejs

// env outside of the project
const helper = {
    section: function (name, options) {
        if (!this._sections) this._sections = {};
        this._sections[name] = options.fn(this);
        return null;
    }
}
const handlebars = expHbs.create({ // tạo handlebars với những config
    extname: ".hbs",
    helpers: helper
});


// route
// tham số đầu: định nghĩa tuyến đường

// HTTP logger
app.use(morgan('combined'));
app.use(express.json())
app.use(cookieParser())
//Template engine
app.engine('hbs', handlebars.engine); // engine definition with name is hbs
app.set('view engine', 'hbs'); // set view engine là hbs vừa tạo
app.set('views', path.join(__dirname, 'views')); // config đường dẫn đến thư mục view
app.use(express.static(path.join(__dirname, '/public')));// config đường dẫn đến thư mục public => serve static files in server

route(app); 
// 127.0.0.1:3000

module.exports = app;