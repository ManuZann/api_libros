const express = require('express')
const libros_routes = require('./routes/libros')
const errorHandler = require('./middlewares/errorHandler')

const app = express()
const port = 3000
app.use(express.json())

app.use('/libros', libros_routes)
app.use(errorHandler)

app.listen(port, () =>{
    console.log('Servidor levantado');
})