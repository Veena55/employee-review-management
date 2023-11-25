const Registeration = require('../models/review_requests');

module.exports.dashboard = (req,res) => {
    return res.render('dashboard',{
        title : "Admin | Dashboard"
    });
}
module.exports.enrolledEmployees = (req,res) => {
    return res.render('enrolled-employees',{
        title : "Admin | Dashboard"
    });
}
module.exports.feedBackForm = (req,res) => {  
    if(req.isAuthenticated()) {
        req.flash('msg','sign in successfully!!');
        return res.render('feedback-form',{
            title : "Feedback Form",    
            message : req.flash('msg')
        });
    }  
    return res.redirect('/users/sign-in');
}
module.exports.registerForFeedback = (req,res) => {
    return res.render('register-feedback',{
        title : "Regsiter Yourself"
    });
}

module.exports.registerFeedbackRequest = async(req,res) =>{
    // const Register = await Registeration.create({
    //     emp : req.body.empId, msg : req.body.msg, avatar : req.file
    // });
    return res.redirect('back');
}