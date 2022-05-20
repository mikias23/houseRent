const mongoose = require('mongoose');

const RatingSchema = mongoose.Schema({

    houseId:{
        type: String,
        required: true
    },
    saleOrRent:{
        type: String,
        required: true
    },
    userId:{
        type: String,
        required: true
    },
    dateStart:{
       type:Date,
       required: true
    },
    dateEnd:{
        type:Date,
        required: true
     },
    clientPhone: {
        type:String,
        required: true
    }
    ,
    duration: {
        type:String,
        required: true
    },
    ratings: [],
    comment: {
        type: String
    }
    });

const Rating = module.exports = mongoose.model('Rating', RatingSchema);

module.exports.addRating = function(rating, callback){
      rating.save(callback);
    };

module.exports.getRatings = function(callback){
  Rating.find({}, callback);
 };

module.exports.findByClientPhoneAndHouseId = (objChecker, callback)=> {
    

    Rating.find({clientPhone: objChecker.clientPhone, houseId: objChecker.houseId}, callback)
}
module.exports.deleteRating= function(id, callback){
            const query = {_id: id};
          Rating.deleteOne(query,callback)
        };

module.exports.updateRating = function(id, callback)
{
    const query = {_id:id};
    Rating.findOneAndUpdate(query,  callback);

}


module.exports.getRatingsByPhone = function(phone, callback){
    console.log(phone +'In ratings model')       
    Rating.find({clientPhone:phone}, callback);
  };
module.exports.getRatingsByHouseId = function(houseId, callback){
    Rating.find({houseId:houseId}, callback);
  };