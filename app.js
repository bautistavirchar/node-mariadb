const router = require('./src/routes/router')
const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const port = 3000;

const morgan = require('morgan')

app.use(morgan('short'))

app.use(bodyParser.urlencoded({extended: true}));
app.use(router);

app.use(express.static('./src/public'))

app.post('/register',(req,res) => {
    console.log('received data..')
    console.log('Name: '+ req.body.name)
    // res.end()
    res.send(req.body)
})

app.all('/secret',(req,res,next) => {
    console.log('secret here...')
    next()
})

// wiki
const wiki = require('./src/routes/wiki')
app.use('/wiki',wiki)

app.listen(port,() => {
    console.log(`listening port: ${ port }`)
})