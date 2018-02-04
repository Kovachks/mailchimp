console.log("test variable: " + process.env.apiKey)
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
var app = express();
var Mailchimp = require('mailchimp-api-v3')
//Declaring PORT for deployment and testing
var PORT = process.env.PORT || 8000;

var config = ""

if (process.env.apiKey) {
    config = process.env
} {
    console.log('test')
    config = require('./config.js')
}
console.log(config)

// Sets up the Express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

// Static directory
app.use(express.static("public"));

//Route to render home page
app.get("/", function(req, res) {
    res.sendFile(__dirname + "/public/html/home.html");
})
console.log(config.postRoute)
console.log(config.apiKey)
//---------------------------MOVE TO CONFIG FILE IN PRODUCTION---------------------------


//Initiating new mailChimp object
var mailchimp = new Mailchimp(config.apiKey);

//function to test the pulling of data from the correct email list
mailchimp.get({
    path : config.getRoute
  }, function (err, result) {
    console.log(result.stats)
  })


//Send route for user submitted email data
app.get("/send", function(req, res) {
    console.log(req.query)
    let data = req.query
    console.log("data to be posted " + JSON.stringify(data))
    mailchimp.post(config.postRoute, data
    ).then(function(results) {
        console.log("results " + JSON.stringify(results))
    }).catch(function (err) {
        console.log(err)
        console.log("error")
    })
       
})


//Initiating server
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
});