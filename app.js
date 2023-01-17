const express = require('express');
require('dotenv').config()
const app = express();
const port = process.env.PORT;
const db = require('./database/db')
const userRouter = require('./routes/userRoute')
app.use(express.json())

app.use('/users', userRouter)
db
    .then(() => {
        console.log('connected is done successfully')
        app.listen(port, () => {
            console.log(`server is running in port ${port}`)
        })
    })
    .catch((err) => {
        console.log('something is wrong ' + err)
        process.exit(1)
    })


