const express = require('express')
const app = express()
const port = 3000
var bodyParser = require('body-parser')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))


// getAge function
// Params: Date: the date of reference
// Returns: The number of years since the reference date
getAge = function (date) {
    var today = new Date();
    var birthDate = new Date(date);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}

// Default data
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

// Route: /people GET: 
// returns the list of people as JSON
app.get('/people', (req, res) => res.json(people))

// Route: /people POST:
// Creates a new record, generates a new unique user id, and adds the record to the database
app.post('/people', (req, res) => {
    // Create new record
    let person = {
        fname: req.body.fname,
        lname: req.body.lname,
        start: req.body.start
    }
    let id = person.fname.toLowerCase() + person.lname[0].toLowerCase() + "" // Generate initial ID
    while (people[id]) id += Math.floor(Math.random() * 10); // Add numbers to the end of the ID until it's unique
    people[id] = person;
    res.sendStatus(201);
})

// Route: /person/id GET:
// Param: id: the person id
// Returns the data for the given person as JSON
app.get('/person/:id', (req, res) => {
    if (data = people[req.params.id]) res.json(people[req.params.id]);
    else res.sendStatus(404);
})

// Route: /person/id POST:
// Param: id: the person id
// Replaces the given ID with a new record based on the provided data
app.put('/person/:id', (req, res) => {
    if (people[req.params.id]) {
        // Create new record
        let person = {
            fname: req.body.fname.toLowerCase(),
            lname: req.body.lname.toLowerCase(),
            start: req.body.start
        }
        people[req.params.id] = person;
        res.send(201);
    }
    else res.sendStatus(404);
})

// Route: /person/id DELETE:
// Param: id: the person id
// Removes the record associated with the given ID
app.delete('/person/:id', (req, res) => {
    if (people[req.params.id]) {
        delete people[req.params.id]
        res.sendStatus(200);
    }
    else res.sendStatus(404);
})

// Route: /person/id/name GET:
// Param: id: the person id
// Returns the name of the person as JSON
app.get('/person/:id/name', (req, res) => {
    data = people[req.params.id];
    if (data) res.json(data.fname + " " + data.lname);
    else res.sendStatus(404);
})

// Route: /person/id/years GET:
// Param: id: the person id
// Returns the number of years since the specified person's start as JSON
app.get('/person/:id/years', (req, res) => {
    data = people[req.params.id];
    if (data) res.json(getAge(data.start));
    else res.sendStatus(404);
})

// Boilerplate
app.use(express.static('.'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))
