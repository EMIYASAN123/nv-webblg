let express = require('express')
let bodyParser = require('body-parser')
const { sequelize } = require('./models')

const config = require('./config/config')

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

require('./route')(app)

app.get('/status', function (req, res) {
    res.send('Hello nodejs server')
})

app.get('/hello/:person', function (req, res) {
    console.log('hello - ' + req.params.person)
    res.send('sey hello eith' + req.params.person)
})

let port = process.env.PORT || config.port
    
sequelize.sync({ force:false}).than(() => {
    app.listen(port, function () {
        console.log('Server running on' + port);
    })
})

