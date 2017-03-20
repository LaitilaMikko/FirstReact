var express = require("express");
var bodyparser = require("body-parser");
var mongoose = require("mongoose");
var cookieparser = require("cookie-parser");
var students = require("./schemas");


function checkDB(nimi, callback) {
    students.find({ nimi: nimi }, function (err, objs) {
        if (objs.length == 0) {
            callback(false);
        } else { callback(true); }
    });
}

function getFromDB(nimi, callback) {
    students.find({ nimi: nimi }, function (err, obj) {
        if (err) { console.error(err); }
        else { callback(obj); }
    });
}

function getAll(db, callback) {
    students.find(function (err, data) {
        if (err) { console.error(err); }
        else { callback(data); }
    })
}

function haeIdllä(id, callback) {
    students.find({ _id: id }, function (err, obj) {
        if (err) { console.error(err); }
        else { callback(obj); }
    });
}

function paivita(body,callback){
    students.update(
        {_id:body.id},
        {$set: 
            {
                nimi:body.nimi,
                ikä:body.ikä,
                ryhmä:body.ryhmä,
                opintopisteitä: body.opintopisteitä,
                valmistuu: body.valmistuu
            }},           
        function (err,result){
            if (err) {console.error(err);}
            else {callback(result);}
    });
}

function poista(id,callback){
    students.find({_id:id}).remove(callback);
}



module.exports.tarkistaDB = checkDB;
module.exports.haeKannasta = getFromDB;
module.exports.haeKaikki = getAll;
module.exports.haeIdllä = haeIdllä;
module.exports.paivita = paivita;
module.exports.poista = poista;