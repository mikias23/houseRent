const mongoose = require('mongoose');


const DateSchema = mongoose.Schema({
    
    recoveryInterval: {
        type: Number,
        required: true
    },
    dateStart:{
        type: Date,
        required: true
     },
  
    });


const Dates = module.exports = mongoose.model('Dates', DateSchema);



 module.exports.addDate = function(date, callback){
  
    date.save(callback);
    };

 module.exports.getDate = function(callback){
        Dates.find({},callback);
    }

 module.exports.updateDate = function(updatedPost, callback)
 {
     const query = {_id:updatedPost.id};

    Dates.findOneAndUpdate(query, {dateStart: updatedPost.dateStart, recoveryInterval: updatedPost.recoveryInterval}  , {upsert:false},  callback);

 }        

        