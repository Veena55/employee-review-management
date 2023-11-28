const AssignReview = require('../models/assign_emplyees');
const Feedback = require('../models/feedbacks');
const Registeration = require('../models/review_requests');
const User = require('../models/users');
var ObjectId = require('mongoose').Types.ObjectId; 

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
module.exports.employeeRequests = async(req,res) => {
    const requests = await Registeration.find().populate('emp');
    return res.render('employee-request',{
        title : "Admin | Employee Requests",
        employeeList : requests
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

module.exports.approveRequests = async(req,res)=>{
    const userId = new ObjectId(req.params.emp);
    console.log(userId);
    const result = await Registeration.findOneAndUpdate({emp : userId},{
        status : "Approved"
    });
    if(result) {
        req.flash('success','Approved The Request!!');
    }
    return res.redirect('/users/assign-employees/'+req.params.emp);
}

module.exports.rejectRequests = async(req,res)=>{
    const userId = new ObjectId(req.params.emp);
    console.log(userId);
    const result = await Registeration.findOneAndDelete({emp : userId});
    if(result) {
        req.flash('success','Rejected The Request!!');
    }
    return res.redirect('/users/employee-requests');
}

module.exports.assignEmployeesForReviews = async(req,res)=>{    
    if(req.isAuthenticated()) {
    const result = await AssignReview.create({
        emp : req.body.emp,
        assign_employees : req.body.employeeList,
    });
    if(result) {        
        req.flash('success','Added successfully!!');
    }   
    return res.redirect('/users/dashboard');
    }
    return res.redirect('/users/sign-in');
}

module.exports.saveFeedback = async(req,res)=>{  
    var userId = req.user._id.toHexString();
    userId = new ObjectId(userId);  
    if(req.isAuthenticated()) {
    const result = await AssignReview.find({assign_employees : userId});
    console.log(result+" ====="+userId);
    return res.redirect('back');
    }
    return res.redirect('/users/sign-in');
}

module.exports.feedBackForm = async (req,res) => {  
    var userId = req.user.id;
    userId = new ObjectId(userId); 
    const result = await AssignReview.find({assign_employees : {$in : userId}}).populate('emp').exec();
    if(req.isAuthenticated()) {
        req.flash('msg','sign in successfully!!');
        return res.render('feedback-form',{
            title : "Feedback Form",    
            employeeList : result
            // message : req.flash('msg')
        });
    }  
    return res.redirect('/users/sign-in');
}

module.exports.saveReview = async(req,res) => {
   const feedback =  await Feedback.create({
    givento : req.body.givento,
    givenby : req.body.givenby,
    review : req.body.feedback,
   });
//    console.log(feedback);
   req.flash('success','Feedback Submitted successfully!!');
   return res.redirect('back');
}

module.exports.registerForFeedback = (req,res) => {
    if(req.isAuthenticated()) {
    return res.render('register-feedback',{
        title : "Regsiter Yourself"
    });
    }
    return res.redirect('/users/sign-in');
}

module.exports.registerFeedbackRequest = async(req,res) =>{
    if(!req.file) {
        avatar = ""
    } else {
        avatar =  req.file.filename
    }
    const Register = await Registeration.create({
        emp : req.body.emp, msg : req.body.msg, avatar : avatar
    });
    req.flash('success','Request Submitted successfully!!');
    return res.redirect('/users/feedback-form');
}

module.exports.allReviews = async(req,res)=> {
    if(req.isAuthenticated()) {
        const employees = await Feedback.find().populate('givenby').populate('givento');
        return res.render('review-lists',{
            title : 'All Reviews',
            employeeList : employees
        });
    }
    return res.redirect('/users/sign-in');
}