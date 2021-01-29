const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const dotEnv = require('dotenv').config();

const dburl = process.env.URL;

router.get('/cakeMore',(req,res) => {

    MongoClient.connect(dburl,{useNewUrlParser:true,useUnifiedTopology:true},(err,client) => {

         if(err){
             console.log("error",err);
         }
         else{

            const coll = client.db("CakeDb").collection("Cakes");
            coll.find({}).toArray((err,result) => {

                output = result.map(r => ({'id':r._id,'name':r.name,'imgurl':r.imgurl,'disprice':r.disprice,
                'price':r.price,'weight':r.weight,'type':r.type}));

                res.json(output);
            });
         }
    });
});

module.exports = router;