const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');


const UserSchema = mongoose.Schema({
    firstName:{
        type: String,
        required: true
    },
    lastName:{
        type: String,
        required: true
    },
    username:{
        type: String,
        required: true
    },
    password:{
       type: String,
       required: true
    },
    phoneNumber: {
        type:String,
        required: true
    },

    email: {
        type: String,
        required: true
    }

})


const User = module.exports = mongoose.model('User', UserSchema);


module.exports.getUserById = function(id, callback){
    User.findById(id,callback);
}
module.exports.authenticateUser = function(username, callback){
    
    const query = {username: username};
    User.findOne(query,callback)
}
module.exports.addUser = function(newUser, callback){
    bcrypt.genSalt(10, (err,salt) => {
        bcrypt.hash(newUser.password, salt, (err,hash) => {

            if(err) throw err;
            newUser.password = hash;
            newUser.save(callback);

        })
    })
}
module.exports.comparePassword = 
function(candidatePasword, hash , callback){
    bcrypt.compare(candidatePasword , hash ,(err, isMatch) => {

        if(err) throw err;

        callback(null, isMatch);
        
    })
}
module.exports.getAllUser = function(callback){
    User.find({}, callback)

}
module.exports.getUserByPhone = function(phone, callback){
    let phonenumber = {phonenumber:phone}
    User.find(phonenumber, callback)

}
module.exports.deleteUser= function(id, callback){
    const query = {_id: id};
   User.deleteOne(query,callback)
}
module.exports.deleteAllUser= function(callback){
    console.log('reached here')
   User.deleteMany({ },callback)
}
module.exports.getUsers = function(callback)
{
    User.find({}, callback)
}
module.exports.updatePassword = function(updateUser, callback){
    bcrypt.genSalt(10, (err,salt) => {
        bcrypt.hash(updateUser.password, salt, (err,hash) => {

            if(err) throw err;
            updateUser.password = hash;
            var query = {username : updateUser.username};

            User.findOneAndUpdate(query, {password: updateUser.password},
                {upsert: true}, callback);

        })
        // MyModel.findOneAndUpdate(query, req.newData, {upsert: true}, function(err, doc) {
        //     if (err) return res.send(500, {error: err});
        //     return res.send('Succesfully saved.');
        // });
    })
}


module.exports.deleteUser= function(id, callback){
    const query = {_id: id};
   User.deleteOne(query,callback)
};
// module.exports.deleteHouses= function(id, callback){
//     const query = {userID: id};
//     if(id)
//     {
//         House.deleteMany({query},callback)
   
//     }
//     else {
//         House.deleteMany({},callback)

//     }
// };