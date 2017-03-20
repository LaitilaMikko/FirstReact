var express = require("express");
var bodyparser = require("body-parser");
var mongoose = require("mongoose");
var cookieparser = require("cookie-parser");
var app = express();
var oppilas = require("./models/schemas");
var oppilaskanta = require("./models/functions");

var server = require("http").Server(app);
var io = require("socket.io")(server);


app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));
app.use(cookieparser());

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header("Access-Control-Allow-Origin", "http://localhost:8080");
    res.header("Access-Control-Allow-Credentials", "true");
    next();
});


app.get('/', function (req, res) {
    res.send("toimii vallan mainiosti");
});
app.post("/addStudent", function (req, res) {
    var nimi = req.body.nimi;
    var spuoli = req.body.sukupuoli;
    var ikä = req.body.ikä;
    var ryhmä = req.body.ryhmä;
    var opintopisteitä = req.body.opintopisteitä;
    var valmistuu = req.body.valmistuu;
    oppilaskanta.tarkistaDB(nimi, function (data) {
        if (data == true) {
            res.send(nimi + " löytyy jo tietokannasta, eikä häntä lisätä");
        } else if (data == false) {
            var student = new oppilas({
                nimi: nimi, sukupuoli: spuoli, ikä: ikä, ryhmä: ryhmä, opintopisteitä: opintopisteitä,
                valmistuu: valmistuu
            });
            student.save(function (err, student) {
                if (err) return console.error(err);
            });
            res.json(student);
        }
    });
});
app.post("/hae", function (req, res) {
    var nimi = req.body.nimi;
    oppilaskanta.haeKannasta(nimi, function (data) {
        return res.json(data);
    });

});

app.get("/haeKaikki", function (req, res) {
    oppilaskanta.haeKaikki(db, function (data) {
        return res.json(data);
    });
});

app.post("/haevol2", function (req, res) {
    var id = req.body._id;
    oppilaskanta.haeIdllä(id, function (data) {
        return res.json(data);
    });
});

app.post("/update", function (req, res) {
    oppilaskanta.paivita(req.body, function (data) {
        return res.json(data);
    });
});

app.post("/delete", function(req,res){
    oppilaskanta.poista(req.body.id,function(data){

    }); 
});


//portin kuuntelu ja db:n avaus:
app.listen(3000, function () {
    console.log("Appi kuuntelee portista 3000!");
});


mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/oppilaskanta");
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {

});