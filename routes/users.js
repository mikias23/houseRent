const express = require('express');
const router = express.Router();
const User = require('../models/users');
const jwt = require('jsonwebtoken');
const authJwt = require('../config/jwt');
const upload = require('../helpers/storage')
// const House = require('../model/house');
// const Admin = require('../model/admin');
var fs = require('fs');
var path = require('path');
const House = require('../models/house');
const City = require('../models/city');
const Location = require('../models/location');
const Record = require('../models/records')
const Date = require('../models/date');
const Rating = require('../models/ratings');

router.post('/register',(req,res) => {
  
     let newUser = new User({
              
         username:req.body.username,
         phoneNumber:req.body.phoneNumber,
         firstName: req.body.firstName,
         lastName: req.body.lastName,
         email: req.body.email,
         password:req.body.password
     })


     User.authenticateUser(newUser.username, (err, user) => {

        if(!user)
        {
            User.addUser(newUser, (err,user) => {
                if(err){
                 res.json({success:false, msg:"failed to register user"});
                  
                }
                 else {
                     res.json({success: true, msg:'User registered'});
                     
               }
            })
        }
        else {
            if(newUser.username == "Admin" || newUser.username == "admin" || newUser.username == "Adminstrator" || newUser.username == "adminstrator" ||
            newUser.username == "admin")
            {

                res.json({success:false, msg:"Change Username"});
            }
            else
            {

                res.json({success:false, msg:"User Exists"});
            }



        }
     })




})

router.post('/login',(req,res) => {
  
    let authenticateUser = {
        username:req.body.username,
        password:req.body.password
     };


    User.authenticateUser(authenticateUser.username ,(err,user) => {

        console.log(user)
        if(err){
            throw err;
        }
     if(!user){
            return res.json({
                success:false,
                msg:'user not found. Enter the correct username'
            })
        }

        
        User.comparePassword(authenticateUser.password, user.password, (err, isMatch) =>
        {

            if(err){
                res.json(
                    {
                        success:false, msg:"Incorrect password"});
                 
               }
                else {
                    if(isMatch){

                        token  = jwt.sign({_id: user._id}, 'secret', {
                           expiresIn: 604800
                       });

                       console.log(token);
                       return res.send({
                           user:user, token:token
                        });
                 
                   }

                   else {
                    return res.send({
                        msg:"Password Does not Match"
                     });
                   }
                                       
              }

        }) 

     })

})


router.get('/getHouse', (req, res) => {
    House.getHouse((err, houses) => {
        if(err)
        throw err;

        if(!houses){
            return res.json({
                success:false,
                msg:'Something went wrong.. perhaps empty database'
            })
        }
        else{
           

            return res.json({
                success:true,
                houses:houses
            })
        }
    } )
 })

router.get('/getCity',  (req,res) => {
   City.getCity((err, city) => {
        if(err)
        throw err;

        if(!city){
            return res.json({
                success:false,
                msg:'Something went wrong.. perhaps empty database'
            })
        }
        else{
           

            return res.json({
                success:true,
                city:city
            })
        }
    } )
})
router.get('/getLocation',  (req,res) => {
   Location.getLocation((err, location) => {
         if(err)
         throw err;
 
         if(!location){
             return res.json({
                 success:false,
                 msg:'Something went wrong.. perhaps empty database'
             })
         }
         else{
            
 
             return res.json({
                 success:true,
                 location:location
             })
         }
     } )
 })
 router.get('/getUsers',  (req,res) => {
    User.getUsers((err, users) => {
          if(err)
          throw err;
  
          if(!users){
              return res.json({
                  success:false,
                  msg:'Something went wrong.. perhaps empty database'
              })
          }
          else{
             
  
              return res.json({
                  success:true,
                  users:users
              })
          }
      } )
  })


// get Location

router.get('/getRecords',  (req,res) => {
    Record.getRecords((err, records) => {
          if(err)
          throw err;
  
          if(!records){
              return res.json({
                  success:false,
                  msg:'Something went wrong.. perhaps empty database'
              })
          }
          else{
             
  
              return res.json({
                  success:true,
                  records:records
              })
          }
      } )
  })

router.get('/getDateRecovery', (req,res) => {

    Date.getDate((err, date) => {
    
        if(err)
        {
            return res.json({
                success:false,
                msg:'Something went wrong.. perhaps empty database'
            })
        }
        else{
           

            console.log(date[0]);
            return res.json({
                success:true,
                date:date[0]
            })
        }
    })
}



)
   
router.get('/getHouseRate', (req,res) => {

    Rating.getRatings({},(err, ratings) => {
    
        if(err || !ratings)
        {
            return res.json({
                success:false,
                msg:'Something went wrong.. perhaps empty database'
            })
        }
        else{
           
            return res.json({
                success:true,
                ratings: ratings
            })
        }
    })


    
}



)
  
router.post('/getRatingsByPhone',  (req,res) => {

    let phone = req.body.phone;
    Rating.getRatingsByPhone(phone, (err, records) => {
          if(err)
          throw err;
  
          if(!records){
              return res.json({
                  success:false,
                  msg:'Something went wrong.. perhaps empty database'
              })
          }
          else{
             
  
              return res.json({
                  success:true,
                  records:records
              })
          }
      } )
  })
  router.post('/getRatingsByHouseId',  (req,res) => {

    let houseId = req.body.houseId;
    Rating.getRatingsByHouseId(houseId, (err, ratings) => {
          if(err)
          throw err;
  
          if(!ratings){
              return res.json({
                  success:false,
                  msg:'Something went wrong.. perhaps empty database'
              })
          }
          else{
             
  
              return res.json({
                  success:true,
                  ratings:ratings
              })
          }
      } )
  })
module.exports = router;