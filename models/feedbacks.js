const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
    givento : {
        type : mongoose.SchemaTypes.ObjectId,
        ref : 'User'
    },

    givenby : {
        type : mongoose.SchemaTypes.ObjectId,
        ref : 'User'
    },
    review : {
        type : String
    }
}, 
{timestamps : true}
);

const Feedback = mongoose.model('Feedback', feedbackSchema);
module.exports = Feedback;