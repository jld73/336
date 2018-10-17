const express = require('express')
const app = express()
const port = 3000

getAge = function(date) {
    var today = new Date();
    var birthDate = new Date(date);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}

var people = {};
people["johno13"] = {
    fname: "John",
    lname: "Osborn",
    start: "1990/02/05"
}
people["stevel3"] = {
    fname: "Steve",
    lname: "Larson",
    start: "1987/09/10"
}
people["claran6"] = {
    fname: "Clara",
    lname: "Nelson",
    start: "1993/01/06"
}
people["janiceg7"] = {
    fname: "Janice",
    lname: "Grant",
    start: "2001/07/02"
}

app.get('/people', (req, res) => res.json(people))
app.get('/people/:id', (req,res) => {
    if (data = people[req.params.id]) res.json(people[req.params.id]);
    else res.sendStatus(404);
})
app.post('/people', (req,res) => {
    
})
app.get('/people/:id/name', (req, res) => {
    data = people[req.params.id];
    if (data) res.json(data.fname + " " + data.lname);
    else res.sendStatus(404);
})
app.get('/people/:id/years', (req, res) => {
    data = people[req.params.id];
    if (data) res.json(getAge(data.start));
    else res.sendStatus(404);
})
app.use(express.static('.'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))
