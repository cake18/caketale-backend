const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const dotEnv = require('dotenv').config();

const dburl = process.env.URL;

router.get('/fetchOffers',(req,res) => {
         
    MongoClient.connect(dburl,{useNewUrlParser:true,useUnifiedTopology:true},(err,client) => {

           if(err){
               console.log("error",err);
           }
           else{

               const coll = client.db("CakeDb").collection("Offers");

               coll.find({}).toArray((err,result) => {

                output = result.map(r => ({'offer_image':r.offer_image}));

                res.json(output);
 
                client.close(); 
            });
               
        }
    });
});

module.exports = router;
