const mongoose = require('mongoose')
const dotenv = require('dotenv')

dotenv.config({
    path: './.env'
})

const app = require('./src/app')

const db = process.env.database.replace('<password>', process.env.password)

mongoose.connect(db).then(con =>{
    console.log('Database connect successfully')
})

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`App is listening on port ${port}`)
})