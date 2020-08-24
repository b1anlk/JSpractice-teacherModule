const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const path = require('path');

const Teachers = require('../models/teacher');
const db = require('../config/db');

mongoose.connect(db.url);
let con = mongoose.connection;
con.on('error', () => {
    console.log('Connection Error!');
});

router.get('/teacher-management', (req,res) => {
   res.sendFile(path.join(__dirname, '../public/teacherOps.html'));
});

router.get('/get-teacher-data', (req,res) => {
    Teachers.find()
        .then( (result) => {
            res.json(result)
        })
        .catch( (err) => {
            console.log(err);
        });
});

router.post('/add-teacher-data', (req,res) => {
   //console.log(req.body);
   const plan = new Teachers({
       name : req.body.name ,
       phnum : req.body.phnum ,
       age :req.body.age
    });
    plan.save()
        .then( (result) => {
            res.json({
                msg: 'Record Added!',
                obj: result
            });
        })
        .catch( (err) => {
            console.log(err);
        });
});

router.post('/update-teacher-data', (req,res) => {
    const plan = new Teachers({
        name : req.body.name ,
        phnum : req.body.phnum ,
        age :req.body.age
    });
    Teachers.updateOne( {_id: req.body._id}, {name : req.body.name , phnum : req.body.phnum , age :req.body.age}, (err,doc) => {
        if (err){
            console.log(err);
            res.json({
                msg: 'Error!'
            });
        }
        else{
            console.log(doc);
            res.json({
                msg: 'Record Updated!',
                obj: doc
            });
        }
    });
});

router.post('/delete-teacher-data', (req,res) => {
   Teachers.deleteOne( {_id: req.body._id}, (err,doc) => {
       if (err){
           console.log(err);
           res.json({
               msg: 'Error!'
           });
       }
       else{
           console.log(doc);
           res.json({
               msg: 'Record Deleted!',
               obj: doc
           });
       }
   });
});
module.exports = router;
