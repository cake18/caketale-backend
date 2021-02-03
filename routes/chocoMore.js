const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const dotEnv = require('dotenv').config();

const dburl = process.env.URL;

router.get('/chocMore',(req,res) => {

    MongoClient.connect(dburl,{useNewUrlParser:true,useUnifiedTopology:true},(err,client) => {
         
        if(err){
            console.log("Error",err);
        }
        else{

            
        }
     });
});

module.exports = router;