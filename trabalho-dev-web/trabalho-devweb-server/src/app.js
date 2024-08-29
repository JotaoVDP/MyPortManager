const express = require('express')
const cors = require('cors')

//rotas
const index = require('./routes/index')
const userRoute = require('./routes/userRoute')
const containerRoute = require('./routes/containerRoute')
const miscRoute = require('./routes/miscRoute')
const machineRoute = require('./routes/machineRoute')
const productRoute = require('./routes/productRoute')
const shipRoute = require('./routes/shipRoute')

const app = express();

app.use(cors())

app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(express.json({ type: 'application/vnd.api+json' }))

app.use(index);
app.use('/api/', userRoute)
app.use('/api/', containerRoute)
app.use('/api/', miscRoute)
app.use('/api/', machineRoute)
app.use('/api/', productRoute)
app.use('/api/', shipRoute)

module.exports = app;