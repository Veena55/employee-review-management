const mongoose = require('mongoose');

const multer = require('multer');
const path = require('path');
const AVTAR_PATH = path.join('/upoads/users/avtars');

const reviewRequestSchema = new mongoose.Schema({
    emp : {
        type : mongoose.SchemaTypes.ObjectId,
        ref : 'User'
    },
    msg : {
        type : String
    },

    avtar : {
        type : String
    }
},
{timestamps : true}
);

const Registeration = mongoose.model('Registeration', reviewRequestSchema);
module.exports = Registeration;