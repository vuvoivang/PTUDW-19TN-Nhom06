const express = require('express');
const morgan = require('morgan'); // HTTP request logger middleware for nodejs
const expHbs = require('express-handlebars');
const path = require('path'); //built-in nodejs
const bodyParser = require('body-parser');
const route = require('./routes');
const cookieParser = require('cookie-parser')

const app = express(); // đại diện cho ứng dụng nodejs
const mongodb = require('./config/mongodb');
require('dotenv').config(); // use env variables


mongodb.connect();
const { helper } = require('./middlewares/handlebars.middleware');

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
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
route(app);
// 127.0.0.1:3000


const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`App is listening on port ${port}`)
})
