var express = require("express");
var bodyparser = require("body-parser");
var mongoose = require("mongoose");
var cookieparser = require("cookie-parser");

oppilasSchema = new mongoose.Schema({
    nimi: String,
    sukupuoli: String,
    ikä: Number,
    ryhmä: String,
    opintopisteitä: Number,
    valmistuu: Number
});

var oppilas = module.exports = mongoose.model("students",oppilasSchema);