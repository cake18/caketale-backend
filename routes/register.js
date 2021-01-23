const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const dotEnv = require('dotenv').config();

const dburl = process.env.URL;

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended:true}));

const d = new Date();

router.post('/register',(req,res) => {

    var data = {

        name:req.body.name,
        phone:req.body.phone,
        email:req.body.email,
        dob:req.body.dob,
        password:req.body.password,
        Joining_date:("0" + d.getDate() + "-" + (d.getMonth()+1) + "-" + d.getFullYear()),
        Joining_time:d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds()
    };

    MongoClient.connect(dburl,{useNewUrlParser:true,useUnifiedTopology:true},(err,client) => {

          if(err){
              console.log("error",err);;
          }
          else{
              const coll = client.db("CakeDb").collection("Users");
              coll.findOne({phone:req.body.phone},function(err,user) {

                if(err){

                    res.json({message:err});
                    console.log("Error:".red +err);
                  }
                  if(user){

                   //   res.send("User exists");
                   //   console.log("User exists");

                      res.json({message:'user exists'});
                  }
                  else{

                    const collection = client.db("CakeDb").collection("Users");
                    collection.insertOne(data,(err,resp) => {

                        if(err){

                            // res.send("Error:" +err);
                            res.json({message:err}); 
                            console.log("Error:".red +err);
                         }
                         else{
                            // res.send("User created");
                            // console.log("User created");
                            res.json({message:'user created'});
 
                             client.close();
                         }
                    });
                  }

              }); 
          }

    });

});

module.exports = router;