const path = require('path');

module.exports = {
    mode : 'development',
    entry: {
        signup: path.resolve(__dirname, 'src/public/js/view/signup.js'),
        signin: path.resolve(__dirname, 'src/public/js/view/login.js'),
        signout: path.resolve(__dirname, 'src/utils/sidebarFunc.js')
    },
    output: {
        path: path.resolve(__dirname, 'src/public/js/authentication'), 
        filename: '[name].js'
    }
}