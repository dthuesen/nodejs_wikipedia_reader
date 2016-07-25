let https = require("https");
let querystring = require("querystring");
let express = require("express");
let app = express();

app.set("view engine", "ejs");
app.set("views", __dirname + "/views");

app.use("/public", express.static("public"));

app.get("/", function(req, res) {
	res.render("pages/landing");
});

app.get("/result", function(req, res) {
	let search = req.query.search;

	/*https://de.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrlimit=10&pilimit=10&pithumbsize=500&prop=extracts|pageimages&exintro=1&exsentences=10&exlimit=max&gsrsearch=hamburg*/

	// Umwandlung der Key/Value pairs in ein JavaScript Object:
	let options = {
		"format": "json",
		"action": "query",
		"generator": "search",
		"gsrlimit": "10",
		"pilimit": "10",
		"pithumbsize": "500",
		"prop": "extracts|pageimages",
		"exintro": "1",
		"exsentences": "10",
		"exlimit": "max",
		"gsrsearch": search
	};

	// Aufbau der Anfrageadresse aus der API-URL (Anfang) und
	// dem "options"-Object
	let url = "https://de.wikipedia.org/w/api.php?" + 
		querystring.stringify(options);

	// console.log(url);

	// Einrichtung des HTTP Requests:
	let httpRequest = https.request(url, function(httpResponse) {
		httpResponse.setEncoding("utf8"); // Encodierung eingehender Daten

		// Diese Variable wird nach und nach gefüllt
		let responseData = "";   

		// Die Daten kommen nach und nach an, deswegen ist hier ein 
		// ein EventListener notwendig. Sie werden dann konkateniert  
		httpResponse.on("data", function(data) {  
			responseData = responseData + data;    
		});                             
		// Diese Funktion wird ausgeführt, wenn alle Daten angekommen sind
		httpResponse.on("end", function() {   
			let responseObject = JSON.parse(responseData);

			res.render("pages/result", {
				search: search,
				response: responseObject

			});

			console.log(responseObject);      
		});
	});

	// erst mit diesem Aufruf wird httpRequest ausgeführt!!!
	httpRequest.end(); 

	

	
});

app.listen(8080);