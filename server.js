// Dependencies
// =============================================================
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var diner = [
    {
        routeName: "john",
        name: "John",
        phone: "000-000-000",
        email:  "john@example.com"
    }
]

app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "index.html"));
  });

app.get("/add", function(req, res) {
    res.sendFile(path.join(__dirname, "add.html"));
  });

app.get("/api/diners", function(req, res) {
    return res.json(diner);
  });

app.get("/api/diners/:name", function(req, res) {
  var chosen = req.params.name;

  console.log(chosen);

  for (var i = 0; i < diner.length; i++) {
    if (chosen === diner[i].routeName) {
      return res.json(diner[i]);
    }
  }

  return res.json(false);
});

// Create New Characters - takes in JSON input
app.post("/api/diners", function(req, res) {
  // req.body hosts is equal to the JSON post sent from the user
  // This works because of our body-parser middleware
  var newdiner = req.body;

  // Using a RegEx Pattern to remove spaces from newdiner
  // You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html
  newdiner.routeName = newdiner.name.replace(/\s+/g, "").toLowerCase();

  console.log(newdiner);

  diner.push(newdiner);

  res.json(newdiner);
});

app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});