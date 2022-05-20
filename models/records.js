const mongoose = require('mongoose');


const RecordSchema = mongoose.Schema({

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
     status: {
        type:String,
        required: true
    },
    duration: {
        type:String,
        required: true
    }
    });


const Record = module.exports = mongoose.model('Record', RecordSchema);



 module.exports.addRecord = function(record, callback){
  
    record.save(callback);
    };
 module.exports.getRecordById = function(id, callback){
        Record.findById(id,callback);
    }
module.exports.getRecords = function(callback){
  Record.find({}, callback);
        };


module.exports.deleteRecord= function(id, callback){
            const query = {_id: id};
           Record.deleteOne(query,callback)
        };

module.exports.updateRecord = function(id, callback)
{
    const query = {_id:id};
    Record.findOneAndUpdate(query, {status: 'accepted'}  , {upsert:false},  callback);

} 

module.exports.extendRecord = function(record, callback)
{
    const query = {houseId: record.houseId };
    Record.findOneAndUpdate(query, {dateStart: record.dateStart, dateEnd: record.dateEnd, status: 'accepted'}  , {upsert:false},  callback);
}
module.exports.updateRecords = function(id, callback)
{
    const query = {_id:id};
    Record.findOneAndUpdate(query, {status: 'over'}  , {upsert:false},  callback);

}         
module.exports.deleteRecordBasedOnUserId= function(id, callback){
            const query = {userId: id};
           Record.deleteMany(query,callback)
        };
 module.exports.deleteRecords= function(id, callback){
            if(id)
            {
               Record.deleteMany({},callback)
           
            }
            else {
                Record.deleteMany({},callback)
        
            }
        };
        