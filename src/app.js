const express = require('express');
const morgan = require('morgan'); // HTTP request logger middleware for nodejs
const expHbs = require('express-handlebars');
const path = require('path'); //built-in nodejs
const route = require('./routes/index.route');
const app = express(); // đại diện cho ứng dụng nodejs
const handlebars = expHbs.create({ // tạo handlebars với những config
    extname: ".hbs"
});
const port = 3000;  // run ở port 3000
// route
// tham số đầu: định nghĩa tuyến đường

// HTTP logger
app.use(morgan('combined'));
//Template engine
app.engine('hbs', handlebars.engine); // engine definition with name is hbs
app.set('view engine', 'hbs'); // set view engine là hbs vừa tạo
app.set('views', path.join(__dirname, 'views')); // config đường dẫn đến thư mục view
route(app);
// 127.0.0.1:3000
app.listen(port, () => {
    // console.log(`Example app listening on port ${port}`)
})