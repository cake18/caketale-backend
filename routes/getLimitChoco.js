const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const dotEnv = require('dotenv').config();

const dburl = process.env.URL;

router.get('/getLimitChoco',(req,res) => {

    MongoClient.connect(dburl,{useNewUrlParser:true,useUnifiedTopology:true},(err,client) => {

        if(err){
            console.log("Error",err);
        }
        else{

            const coll = client.db("CakeDb").collection("chocolates");
            coll.find({}).limit(2).toArray((err,result) => {

                if(err){
                    console.log("Error",err);
                }
                else{
                    output = result.map(r => ({'name':r.name,'imgurl':r.imgurl,'disprice':r.disprice,
                    'price':r.price}));

                    res.json(output);
 
                    client.close(); 
                }

            });
        }

    });

});

module.exports = router;