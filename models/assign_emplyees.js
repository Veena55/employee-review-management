const mongoose = require('mongoose');


const assignReviews = new mongoose.Schema({
    emp : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    },
    assign_employees : [{
        type: mongoose.Schema.Types.ObjectId,
        ref : 'User'
    }],
},
{timestamps : true}
);

const AssignReview = mongoose.model('AssignReview', assignReviews);
module.exports = AssignReview;