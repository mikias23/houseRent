const express = require('express');
const router = express.Router();
const authJwt = require('../config/jwt');

const House = require('../models/house');
const Record = require('../models/records')

const User = require('../models/users')

const Location = require('../models/location');

const City = require('../models/city');

router.post('/house', authJwt, (req,res) => {

    if(req.body._id !== 'delete_all')
    {
        House.deleteHouse(req.body._id , err => {
            

            if(err){
                return res.json({
                    success:false,
                    msg:'something is wrong'
                })
            }
            else{
               
            
                Record.deleteRecord(req.body._id, err=> {
                    if(err)
                    {
                        return res.json({
                            success:true,
                            msg:'House Deleted but no records associated'
                        })
                    }
                    else {
                        return res.json({
                            success:true,
                            msg:'House  and  records associated deleted'
                        })
                    }
                } )
          
            }
        })

    }
    else {
        House.deleteHouses(null , err => {
            

            if(err){
                return res.json({
                    success:false,
                    msg:'something went wrong'
                })
            }
            else{
                Record.deleteRecords(null, err=> {
                    if(err)
                    {
                        return res.json({
                            success:true,
                            msg:'All Uploaded Houses cleared but not records: Perhaps records are empty'
                        })
                    }
                    else {
                        return res.json({
                            success:true,
                            msg:'All Houses  and  records associated are deleted'
                        })
                    }
                } )
            
       
            }
        })
    }
})
router.post('/user', authJwt, (req,res) => {


    if(req.body._id !== 'delete_all')
    {
        User.deleteUser(req.body._id , err => {
            
             if(err){
                return res.json({
                    success:false,
                    msg:'something is wrong'
                })
            }
            else{
               
            
                House.deleteHouseBasedOnUserId(req.body._id, err=> {
                    if(err)
                    {
                        return res.json({
                            success:true,
                            msg:'User Deleted'
                        })
                    }
                    else {
                        Record.deleteRecordBasedOnUserId(req.body._id, err=> {
                            if(err)
                            {
                                return res.json({
                                    success:true,
                                    msg:'USer Deleted'
                                })
                            }
                            else {
                                return res.json({
                                    success:true,
                                    msg:'User, House  and  records associated deleted'
                                })
                            }
                        } )
              
                    }
                } )
          
            }
        })

    }
    else {
        House.deleteHouses(null , err => {
            

            if(err){
                return res.json({
                    success:false,
                    msg:'something went wrong'
                })
            }
            else{
                Record.deleteRecords(null, err=> {
                    if(err)
                    {
                        return res.json({
                            success:true,
                            msg:'All Uploaded Houses cleared but not records: Perhaps records are empty'
                        })
                    }
                    else {
                        return res.json({
                            success:true,
                            msg:'All Houses  and  records associated deleted'
                        })
                    }
                } )
            
       
            }
        })
    }
})
router.post('/location', authJwt, (req,res) => {


       Location.deleteLocation(req.body._id , err => {
            
             if(err){
                return res.json({
                    success:false,
                    msg:'something is wrong'
                })
            }
            else{
               
            
                return res.json({
                    success:true,
                    msg:'Deletion Successful'
                })
          
            }
        })

    

})
router.post('/city', authJwt, (req,res) => {


    City.deleteCity(req.body._id , err => {
         
          if(err){
             return res.json({
                 success:false,
                 msg:'something is wrong'
             })
         }
         else{
        
            Location.deleteLocation({city:req.body.cityName }, err => {
            
                if(err){
                   return res.json({
                       success:false,
                       msg:'something is wrong'
                   })
               }
               else{
                  
               
                   return res.json({
                       success:true,
                       msg:'City and associated locations deleted'
                   })
             
               }
           })
       
         }
     })

 

})

module.exports = router;