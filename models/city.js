const mongoose = require('mongoose');


const citySchema = mongoose.Schema({

    name:{
        type: String,
        required: true
    },
    region:{
        type: String,
        required: true
    },
    image:{
       type:String,
       required: true
    }})

const City = module.exports = mongoose.model('City',citySchema);


 module.exports.addCity = function(newCity, callback){
  
     newCity.save(callback);
    };
module.exports.getCity= function(callback){

        City.find({}, callback)
    };
 module.exports.deleteCity= function(id, callback){
        const query = {_id: id};
       if(id === 'delete_all')
       {
       City.deleteMany({},callback)

       }
       else {
       City.deleteOne(query,callback)

       }
    };