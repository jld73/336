const express = require('express')
const app = express()
var bodyParser = require('body-parser')
const port = 3000

app.use(express.static('public'))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))

app.get('/request', (req, res) => res.send('Hello World!'))
app.head('/request', (req, res) => {
    res.writeHead(200)
})
app.post('/request', function (req, res) {
    res.send('Recieved: ' + req.body.name + "\n")
})
app.put('/request', function (req, res) {
    res.send('Got: ' + req.body.name + "\n")
})
app.delete('/request', function (req, res) {
    res.send('Got: ' + req.body.name)
})
app.post('/forms/handle-form', (req, res) => {
    res.send("name: " + req.body.user_name + "\nmessage: " + req.body.user_message)
})
app.all((req, res) => res.sendStatus(404));
app.listen(port, () => console.log(`Example app listening on port ${port}!`))
