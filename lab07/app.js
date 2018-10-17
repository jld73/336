const express = require('express')
const app = express()
const port = 3000

app.get('/data', (req, res) => {
    res.send("Hello, " + req.query["name"])
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
app.use(express.static('.'))