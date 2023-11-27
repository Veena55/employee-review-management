const AssignReview = require('../models/assign_emplyees');
const Registeration = require('../models/review_requests');
const User = require('../models/users');

module.exports.dashboard = async(req,res) => {
    const Employees = await User.find();
    if(req.isAuthenticated()) {
        return res.render('dashboard',{
            title : "Admin | Dashboard",
            employees : Employees,
            message : req.flash('msg')
        });
    }
}
module.exports.enrolledEmployees = (req,res) => {
    return res.render('enrolled-employees',{
        title : "Admin | Dashboard"
    });
}

module.exports.assignEmployees = async(req,res) => {
    const Employee = await User.findById(req.params.emp);
    const Employees = await User.find();
    return res.render('assign-employees',{
        title : "Admin | Dashboard",
        employee : Employee,
        employees : Employees,
    });
}

module.exports.assignEmployeesForReviews = async(req,res)=>{    
    const result = await AssignReview.create({
        emp : req.body.emp,
        assign_employees : req.body.employeeList,
    });
    if(result) {        
        req.flash('success','Added successfully!!');
    }
    return res.redirect('/users/dashboard');
}

module.exports.feedBackForm = (req,res) => {  
    if(req.isAuthenticated()) {
        req.flash('msg','sign in successfully!!');
        return res.render('feedback-form',{
            title : "Feedback Form",    
            // message : req.flash('msg')
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
    const Register = await Registeration.create({
        emp : req.body.emp, msg : req.body.msg, avatar : req.file.filename
    });
    return res.redirect('/users/feedback-form');
}