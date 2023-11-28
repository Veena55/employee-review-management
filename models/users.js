const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    empid : {
        type : String
    },
    username : {
        type : String
    },
    password : {
        type : String,
    
    },
    role : {
        type : String
    }
}, 
{timestamps : true}
);

const User = mongoose.model('User',userSchema);
module.exports = User;