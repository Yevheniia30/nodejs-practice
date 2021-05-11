const express = require('express')
const logger = require('morgan')
const cors=require('cors')
const app = express()

app.use(logger('combined'))

app.use('/weather', require('./routes/api/weather'))

// обработка ошибок
app.use((_req, res) => {
    res.status(404).json({message:'Not Found'})
})
// если передано 4 параметра то экспресс понимает что это ошибка
app.use((err, _req, res, _next) => {
    res.status(500).json({message: err.message})
})

// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })

module.exports=app