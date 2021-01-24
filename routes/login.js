const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const dotEnv = require('dotenv').config();

const dburl = process.env.URL;

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended:true}));

router.post('/login',(req,res) => {

   /* var data = {

        phone:req.body.phone,
        password:req.body.password
    };  */

    MongoClient.connect(dburl,{useNewUrlParser:true,useUnifiedTopology:true},(err,client) => {

           if(err){
               console.log("Error",err);
           }
           else{

            const coll = client.db("CakeDb").collection("Users");
            coll.findOne({$and:[{phone:req.body.phone},{password:req.body.password}]},function(err,user) {
                    
                if(err){

                    res.json({message:err});
                    console.log("Error:".red +err);
                }
                if(user){
    
                   res.json({message:user.name});
                }
                else{
                    res.json({message:'Phone number or password is incorrect'})
                }

           });
        }
    });
});

module.exports = router;