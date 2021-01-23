const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const dotEnv = require('dotenv').config();

const dburl = process.env.URL;

router.get('/fetchChocMore',(req,res) => {

    MongoClient.connect(dburl,{useNewUrlParser:true,useUnifiedTopology:true},(err,client) => {

        if(err){
            console.log("Error",err);
        }
        else{

            const coll = client.db("CakeDb").collection("ChocoMore");
            coll.find({}).toArray((err,result) => {

                if(err){

                    console.log('Error' +err);
                }
                else{

                    output = result.map(r => ({'imgurl':r.imgurl}));

                    res.json(output);

                    client.close(); 
                }
            });
        }

    });
});

module.exports = router;