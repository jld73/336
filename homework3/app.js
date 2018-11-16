const express = require('express')
const app = express()
var path = require('path');
const port = 3000
var bodyParser = require('body-parser')
var MongoClient = require('mongodb').MongoClient

var db;

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

// Route: /people GET: 
// returns the list of people as JSON
app.get('/people', (req, res) => {
    db.collection('people').find().toArray(function (err, data) {
        if (err) {
            console.error(err);
            process.exit(1);
        }
        res.json(data);
    });
})

// Route: /people POST:
// Creates a new record, generates a new unique user id, and adds the record to the database
app.post('/people', (req, res) => {
    // Create new record
    let person = {
        id: req.body.id,
        fname: req.body.fname,
        lname: req.body.lname,
        start: req.body.start
    }
    console.log(person)
    db.collection("people").insertOne(person, function (err) {
        if (err) {
            console.error(err);
            process.exit(1);
        } else {
            res.sendStatus(201);
        }
    });
})

// Route: /person/id GET:
// Param: id: the person id
// Returns the data for the given person as JSON
app.get('/person/:id', (req, res) => {
    db.collection('people').find({ "id": req.params.id }).toArray(function (err, data) {
        if (err) {
            console.error(err);
            process.exit(1);
        }

        if (data[0] == undefined) {
            res.sendStatus(404)
        } else {
            res.json(data);
        }
    });
})

// Route: /person/id POST:
// Param: id: the person id
// Replaces the given ID with a new record based on the provided data
app.put('/person/:id', (req, res) => {
    // Create new record
    let person = {
        id: req.body.id,
        fname: req.body.fname,
        lname: req.body.lname,
        start: req.body.start
    }
    console.log(person)
    db.collection("people").updateOne({ "id": req.params.id }, { $set: person }, function (err) {
        if (err) {
            console.error(err);
            process.exit(1);
        } else {
            res.sendStatus(201);
        }
    });
})

// Route: /person/id DELETE:
// Param: id: the person id
// Removes the record associated with the given ID
app.delete('/person/:id', (req, res) => {
    db.collection("people").deleteOne({ "id": req.params.id }, function (err) {
        if (err) {
            console.error(err);
            process.exit(1);
        } else {
            res.sendStatus(200);
        }
    });
})

// Route: /person/id/name GET:
// Param: id: the person id
// Returns the name of the person as JSON
app.get('/person/:id/name', (req, res) => {
    db.collection('people').find({ "id": req.params.id }).toArray(function (err, data) {
        if (err) {
            console.error(err);
            process.exit(1);
        }
        console.log(data)
        res.json(data[0].fname + " " + data[0].lname);
    });
})

// Route: /person/id/years GET:
// Param: id: the person id
// Returns the number of years since the specified person's start as JSON
app.get('/person/:id/years', (req, res) => {
    db.collection('people').find({ "id": req.params.id }).toArray(function (err, data) {
        if (err) {
            console.error(err);
            process.exit(1);
        }
        console.log(data)
        res.json(getAge(data[0].start));
    });
})

// Boilerplate
app.use('/', express.static(path.join(__dirname, 'public')));

MongoClient.connect('mongodb://cs336:' + process.env.MONGO_PASSWORD + '@ds163683.mlab.com:63683/jld73-homework3-cs336', function (err, client) {
    if (err) throw err

    db = client;
    app.listen(3000, function () {
        console.log('Server started: http://localhost:' + app.get('port') + '/');
    });
})