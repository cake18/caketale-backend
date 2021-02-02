const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const dotEnv = require('dotenv').config();

const dburl = process.env.URL;

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended:true}));

router.post('/sendOrder',(req,res) => {

    console.log("Response",req.body);
    MongoClient.connect(dburl,{useNewUrlParser:true,useUnifiedTopology:true},(err,client) => {

           if(err){
               console.log("Error",err);
           }
           else{
                const coll = client.db("CakeDb").collection("Orders");
                coll.insertMany(req.body,(err,resp) => {

                       if(err){
                           console.log("Error",err);
                       }
                       else{
                        res.json({message:'order successfull'});
 
                        client.close();
                       }
                });
           }

   });  

});

module.exports = router;