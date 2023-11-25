const mongoose = require('mongoose');

// const multer = require('multer');
// const path = require('path');
// const AVATAR_PATH = path.join('/upoads/users/avatars');

const reviewRequestSchema = new mongoose.Schema({
    emp : {
        type : mongoose.SchemaTypes.ObjectId,
        ref : 'User'
    },
    msg : {
        type : String
    },

    avatar : {
        type : String
    }
},
{timestamps : true}
);

// let storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, path.join(__dirname , '..', AVATAR_PATH))
//     },
//     filename: function (req, file, cb) {
//       const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
//       cb(null, file.fieldname + '-' + uniqueSuffix)
//     }
//   });
  
  //static methods
//   reviewRequestSchema.statics.uploadedAvatar = multer({storage:storage}).single('avatar');
//   reviewRequestSchema.statics.avatarPath = AVATAR_PATH;

const Registeration = mongoose.model('Registeration', reviewRequestSchema);
module.exports = Registeration;