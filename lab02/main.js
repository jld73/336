function Person(name, birth) {
    this.name = name
    this.birth = birth
    this.friends = []
}
Person.prototype.greet = function() {
    console.log("I am a person")
}
Person.prototype.setName = function(name) {
    this.name = name;
}
Person.prototype.addFriend = function(friend) {
    this.friends.push(friend)
}
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

function Student(name, birth, subject) {
    Person.call(this, name, birth);
    this.subject = subject;
}
Student.prototype = Object.create(Person.prototype)
Student.prototype.greet = function() {
    console.log("I am a student")
}

bob = new Person("Bob", "1992/08/15")
jon = new Person("Jon", "1985/02/05")
cara = new Person("Cara", "1971/07/22")
bob.greet()
bob.addFriend(jon)
bob.addFriend(cara)

console.log(bob.getAge())
console.log(jon.getAge())
console.log(cara.getAge())

console.log(bob.friends)
console.log(jon.name)
jon.setName("John")
console.log(jon.name)
ben = new Student("Ben", "1997/03/12")
ben.greet()
console.log(ben.getAge())
ben.addFriend(cara)
console.log(ben.friends)