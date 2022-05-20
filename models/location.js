const mongoose = require('mongoose');


const locationSchema = mongoose.Schema({

    name:{
        type: String,
        required: true
    },
    city:{
        type: String,
        required: true
    },
    image:{
       type:String,
       required: true
    }})

const Location = module.exports = mongoose.model('Location',locationSchema);


 module.exports.addLocation = function(newLocation, callback){
  
     newLocation.save(callback);
    };
module.exports.getLocation= function(callback){

        Location.find({}, callback)
    };
 module.exports.deleteLocation= function(id, callback){
    
   
    if(typeof id === 'object')
    {
Location.deleteMany(id,callback);

    }
    else {
        const query = {_id: id};
        if(id === 'delete_all')
        {
        Location.deleteMany({},callback)
 
        }
        else {
        Location.deleteOne(query,callback)
 
        }

    }

  
    };