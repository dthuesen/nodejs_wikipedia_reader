var util = require('util');
var EventEmitter = require("events");

// Die Klasse Course:
function Course() {

}
// Durch util wird die Klasse 'Course' durch den
// EventEmitter erweitert - Diese Zeile liest sich 
// also so: "Cours inherits from EventEmitter"
util.inherits(Course, EventEmitter);

// Der Klasse Course wird jetzt die Property 'register'
// per prototype angefügt und mit einer Methode versehen 
Course.prototype.register = function() {
	this.emit("register", {
		"name": "NodeJS",
		"kapitel": "Event Emitter und seine Folgen.",
		"kapitellaenge": "4:04",
		"rating": 5
	})
}

var course = new Course();

course.on("register", function(data) {
	console.log('register wurde ausgeführt');
	console.log(data);
	console.log("Kapitellänge: " + data.kapitellaenge);
});
course.on("register", function() {
	console.log('register wurde ausgeführt(2)');
});

/*course.emit("register", {
	"name": "NodeJS",
	"kapitel": "Event Emitter und seine Folgen.",
	"kapitellaenge": "4:04",
	"rating": 5
});*/

course.register();
course.emit("watchLecture");
