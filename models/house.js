const mongoose = require('mongoose');


const houseSchema = mongoose.Schema({

    userID:{
        type: String,
        required: true
    },
    rooms:{
       type: Number,
       required: true
    },
    type: {
        type:String,
        required: true
    },
    saleOrRent: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    neighbours: {
        type: Number
    },
    area: {
        type: String
    },
    floor: {
        type: String
    },
    stair: {
        type: Number
        },
    bedroom: {
        type: Number
    },

    roomImagePath:[],
    roomType: []
    

    

});
const House = module.exports = mongoose.model('House', houseSchema);

module.exports.addHouse = function(newHouse, callback){
 newHouse.save(callback);
};
module.exports.getHouse= function(callback){

    House.find({}, callback)
};
module.exports.getHouseByType= function(renterHouseId,callback){
     let userIdRenter={userID: renterHouseId};
    House.find(userIdRenter, callback)
};
module.exports.getHouseById= function(id,callback){
    let houseId={_id:id};
   House.find(houseId, callback)
};
module.exports.deleteHouse= function(id, callback){
    const query = {_id: id};
   House.deleteOne(query,callback)
};
module.exports.deleteHouseBasedOnUserId= function(id, callback){
    const query = {userID: id};
   House.deleteOne(query,callback)
};
module.exports.deleteHouses= function(id, callback){
    const query = {userID: id};
    if(id)
    {
        House.deleteMany({query},callback)
   
    }
    else {
        House.deleteMany({},callback)

    }
};

