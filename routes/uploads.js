const express = require('express');
const router = express.Router();
const authJwt = require('../config/jwt');
const upload = require('../helpers/storage')
const House = require('../models/house');
const Record = require('../models/records');
const Rating = require('../models/ratings');
const Date = require('../models/date');



router.post('/house', upload.upload, authJwt, (req,res, next) => {
    var newHouse;


   if(req.body.type === 'condominium' || req.body.type === 'apartment')
   {

 
   newHouse = new House({
       type: req.body.type,
       userID: req.renter._id,
       rooms: req.body.rooms,
       location:req.body.location,
       city:req.body.city,
       roomType: req.body.roomType,
       floor: req.body.floor,
       bedroom:req.body.bedroom,
       area:'',
       neighbours: 0,
       saleOrRent: req.body.saleOrRent,
       price:req.body.price,
       stair:0
    
   })

}

else if(req.body.type === "villa")
{
   newHouse = new House({
       type: req.body.type,
       userID: req.renter._id,
       rooms: req.body.rooms,
       location:req.body.location,
       city:req.body.city,
       roomType: req.body.roomType,
       floor: '',
       bedroom:0,
       area:'',
       neighbours: 0,
       saleOrRent: req.body.saleOrRent,
       price:req.body.price,
       stair: req.body.stair
    
   })

}
else {
   newHouse = new House({
       type: req.body.type,
       userID: req.renter._id,
       rooms: req.body.rooms,
       location:req.body.location,
       city:req.body.city,
       roomType: req.body.roomType,
       floor: '',
       bedroom:0,
       area:req.body.area,
       neighbours: req.body.neighbours,
       saleOrRent: req.body.saleOrRent,
       price:req.body.price,
       stair: 0

    
   })
  
}


if(upload.saveUpload(newHouse))
{
    res.json({
        success: true,
        msg:'Uploaded'
        })
}
else {
    res.json({
        success: false,
        msg:'Uploaded'
        })
}
})



router.post('/city',upload.uploadCity, authJwt, (req, res)=> {


    let newCity = {name: req.body.name, region: req.body.region};
    
     console.log(newCity)
    if(upload.saveUploadCity(newCity))
    {
        res.json({
            success: true,
            msg:'Uploaded'
            })
    }
    else {
        res.json({
            success: false,
            msg:'Something went wrong'
            })
    }
    
    
})
router.post('/location', upload.uploadLocation, authJwt, (req, res)=> {


    let newLocation = {name: req.body.name, city: req.body.city};
    console.log(newLocation)

    if(upload.saveUploadLocation(newLocation))
    {
        res.json({
            success: true,
            msg:'Uploaded'
            })
    }
    else {
        res.json({
            success: false,
            msg:'Uploaded'
            })
    }
    
    
})

router.post('/addRecord', (req,res) => {
    
    let update = req.body.update;
    const record = new Record({
        houseId: req.body.houseId,
        saleOrRent: req.body.saleOrRent,
        userId: req.body.userId,
        dateStart: req.body.dateStart,
        dateEnd:req.body.dateEnd,
        status:req.body.status,
        clientPhone:req.body.clientPhone,
        duration:req.body.duration 
    })
    if(!update)
    {

        Record.addRecord(record, (err) => {  
            if(err)
            {   
                res.json({
                    success: false,
                    msg:'not uploaded'
                    });
                
            }
            else {
                res.json({
                    success: true,
                    msg:'Uploaded'
                    });
            }
   }) 
    }
    else {

        Record.extendRecord(record, (err) => {  
            if(err)
            {   
                res.json({
                    success: false,
                    msg:'not extended'
                    });
                
            }
            else {
                res.json({
                    success: true,
                    msg:'Extended '
                    });
            }
   }) 

    }

         
     
})

router.post('/ownerResponse', (req,res) => {


    if(req.body.response === 'notAccepted' )
    {

    Record.deleteRecord(req.body.id, (err) => {
    if(err)
    {
        res.json({
                                success: false,
                                msg:'Record Not Deleted'
                                });
    }

    else {
        res.json({
            success: true,
            msg:'Record Deleted'
            });
    }
})

    }
    else {



      Record.updateRecord(req.body.id, (err) => {
             if(err)
              {
        res.json({
                                success: false,
                                msg:'not updated'
                                });
    }
      
    else {

     
Record.getRecordById(req.body.id, (err, record) => {
    if(!record)
    {
        res.json({
            success: false,
            msg:'Not Updated'
            });
    }
    else {
    

let objChecker = {
    clientPhone: req.body.clientPhone,
    houseId: record.houseId
}

   
  Rating.findByClientPhoneAndHouseId(objChecker, (err,data)=> {
      if(err)
      {
          throw err
      }
      else if(!data)
      {
          
        var newRateable = new Rating({
            houseId: record.houseId,
            saleOrRent: record.saleOrRent,
            userId: record.userId,
            dateStart: record.dateStart,
            dateEnd: record.dateEnd,
            clientPhone: record.clientPhone,
            duration: record.duration,
            
        });
           
        Rating.addRating(newRateable, (err)=> {
           if(err)
                {
                    res.json({
                        success: false,
                        msg:'Not Updated'
                        });
                }
    
          else 
          {
                    res.json({
                        success: true,
                        msg:'Updatedand client registered for rating'
                        });
          }
            })   
      }
      else {
        res.json({
            success: true,
            msg:'Updated but clien phone already registered for ratings'
            });
      }
  })




    }

})
//
        
    }
})


    }


})


router.post('/recoveryDateSetter', (req,res) => {

   
    if(req.body.newOrUpdate === 'update' )
    {

        var updateRecoveryInfo =
        {
         dateStart:req.body.dateStart,
         recoveryInterval: req.body.recoveryInterval,
         id: req.body.idRateForUpdate,

        }
        Date.updateDate(updateRecoveryInfo, (err)=> {
            if(err)
            {
                res.json({
                    success: false,
                    msg:'Recovery Date not updated for Records for unknown reason'
                    });
            }

            else {
                res.json({
                    success: true,
                    msg:'Recovery Date updated for Records '
                    });

            }
        })
    
    }

     else if(req.body.newOrUpdate === 'new') {
         
        var updateRecoveryInfo =
        Date({
         dateStart:req.body.dateStart,
         recoveryInterval: req.body.recoveryInterval
         
        })
        
         Date.addDate(updateRecoveryInfo, (err)=> {
             if(err)
             {
                 res.json({
                     success: false,
                     msg:'Recovery Date not set for Records for unknown reason'
                     });
             }

             else {
                 res.json({
                     success: true,
                     msg:'Recovery Date set for Records '
                     });

             }
         })

     }


     else
     {
        var updateRecoveryInfo =
        {
         dateStart:req.body.dateStart,
         recoveryInterval: req.body.recoveryInterval,
         id: req.body.idRateForUpdate

        }
        Date.updateDate(updateRecoveryInfo, (err)=> {
            if(err)
            {
                res.json({
                    success: false,
                    msg:'Recovery Date not extended for Records for unknown reason'
                    });
            }

            else {
                res.json({
                    success: true,
                    msg:'Recovery Date Extended '
                    });

            }
        })
     }

})


// recovery update of house records based on date set by admin 
router.post('/updateRentRecords', (req,res) => {

  let tobeUpdated = req.body.ids;

   for(let i = 0 ; i < tobeUpdated.length; i++)
   {
    
    Record.updateRecords(tobeUpdated[i], (err)=> {

        if(i === (tobeUpdated.length-1))
        {
            if(err)
            {
                res.json({
                    success: false,
                    msg:'Not Updated'
                    });
            }
    
            else{
                res.json({
                    success: true,
                    msg:'Info: Rent Records Database recovered'
                    });
            }
        }
    
    })
   }

})



module.exports = router;


