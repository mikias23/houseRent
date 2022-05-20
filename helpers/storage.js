const multer = require('multer');
const House= require('../models/house');
const City= require('../models/city')
const Location= require('../models/location')
var arrayFileName = [], imageCity, imageLocation;


const diskStorage = multer.diskStorage(
    {
       
        destination:(req, file, cb) => {
            cb(null, 'images')
        },
        filename:(req,file,cb) => {

         const fileName = `${Date.now()}_${file.originalname}`;
      
        arrayFileName.push("http://localhost:5000/images/"+ fileName);
            cb(null, fileName);
        }
    }
)

const storageCity = multer.diskStorage(
    {
       
        destination:(req, file, cb) => {
            cb(null, 'images/cities')
        },
        filename:(req,file,cb) => {

         const fileName = `${Date.now()}_${file.originalname}`;
         console.log(fileName);
         imageCity = "http://localhost:5000/images/cities"+ fileName;
         cb(null, fileName);
        }
    }
)
const storageLocation= multer.diskStorage(
    {
       
        destination:(req, file, cb) => {
            cb(null, 'images/locations')
        },
        filename:(req,file,cb) => {

         const fileName = `${Date.now()}_${file.originalname}`;
         console.log(fileName);
         imageLocation = "http://localhost:5000/images/locations"+ fileName;
         cb(null, fileName);
        }
    }
)
const upload= multer({storage: diskStorage}).array('roomImage');

const uploadCity = multer({storage: storageCity}).single('image');
const uploadLocation = multer({storage: storageLocation}).single('image');


module.exports.uploadCity = uploadCity;
module.exports.uploadLocation = uploadLocation;
module.exports.upload = upload;


module.exports.saveUpload = function(newHouse)
 {
   const newHouseUpdated = new House({
        type: newHouse.type,
        rooms: newHouse.rooms,
        saleOrRent: newHouse.saleOrRent,
        price: newHouse.price,
        floor: newHouse.floor,
        roomType: newHouse.roomType,
        location:newHouse.location,
        userID: newHouse.userID,
        roomImagePath:arrayFileName,
        stair: newHouse.stair,
        city: newHouse.city,
        area:newHouse.area,
        neighbours: newHouse.neighbours,
        bedroom:newHouse.bedroom
 })

    arrayFileName = [];

    async function uploadHouse()
    {
       
       const result = await  House.addHouse(newHouseUpdated, (err) => {  
            if(err)
            {   
             return false;
            }
            else {
            return true;
            }})

            return result;
    }


return  uploadHouse();


}

module.exports.saveUploadCity = function(newCity)
{
    
   const newCitySave = new City({
    region:newCity.region,
    name:newCity.name,
    image:imageCity
})



async function waitingUpload () 
   {
        const result = await City.addCity(newCitySave, (err) => {  

    
        if(err)
        {   
         return false;
        }
        else {
        return true;
        }});

        return result ;
    }

    return waitingUpload();


}
module.exports.saveUploadLocation = function(newLocation)
{
    
   const newLocationSave = new Location({
    city:newLocation.city,
    name:newLocation.name,
    image:imageLocation
})

async function waitingUpload () 
   {
        const result = await Location.addLocation(newLocationSave, (err) => {  

    
        if(err)
        {   
         return false;
        }
        else {
        return true;
        }});

        return result ;
    }

    return waitingUpload();


}