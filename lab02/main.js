// Person constructor
// Parameters: name: String; birth String;
function Person(name, birth) {
    this.name = name
    this.birth = birth
    this.friends = []
}

// Greet method
// Prints a short message
Person.prototype.greet = function() {
    console.log("I am a person")
}

// setName method
// Params: name: String;
// Updates the person's name
Person.prototype.setName = function(name) {
    this.name = name;
}

// addFriend method
// Params: friend: Person;
// Adds the Person to the list of friends
Person.prototype.addFriend = function(friend) {
    this.friends.push(friend)
}

// getAge method
// Returns age: Number
// Calculates the person's age based on birth date, then returns it
Person.prototype.getAge = function() {
    var today = new Date();
    var birthDate = new Date(this.birth);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}

// Student constructor, inherits Person
// Parameters: name: String; birth String; subject: String;
function Student(name, birth, subject) {
    Person.call(this, name, birth);
    this.subject = subject;
}

Student.prototype = Object.create(Person.prototype);

// greet method, override
// Prints a student-specific string
Student.prototype.greet = function() {
    console.log("I am a student")
}

// Tests

// Setup
bob = new Person("Bob", "1992/08/15")
jon = new Person("Jon", "1985/02/05")
cara = new Person("Cara", "1971/07/22")
// Test Person methods
bob.greet()
bob.addFriend(jon)
bob.addFriend(cara)
// Test getAge
console.log(bob.getAge())
console.log(jon.getAge())
console.log(cara.getAge())
// Test state updates
console.log(bob.friends)
console.log(jon.name)
jon.setName("John")
console.log(jon.name)
// Test student
ben = new Student("Ben", "1997/03/12")
ben.greet()
console.log(ben.getAge())
ben.addFriend(cara)
console.log(ben.friends)