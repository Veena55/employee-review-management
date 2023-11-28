const User = require('../models/users');

module.exports.signIn = (req,res)=>{
    // if(req.isAuthenticated()) {
    //     return res.redirect('/users/feedback-form');
    // }
    return res.render('sign-in',{
        title : "Employee | Sign In"
    });
}

module.exports.sign_up = function (req,res) {
    return res.render('sign-up',{
        title: "Sign Up"
    });
}

module.exports.create = async (req,res) => {
    try {
        let user = await User.findOne({empid: req.body.empId});     
         if(!user) {
            const result = await User.create({empid : req.body.empId , username : req.body.username, password : req.body.password, role:req.body.role});
            return res.redirect('/users/sign-in');
    } else {
        console.log("Already Exists");
        return res.redirect('back');
    }
    } catch (error) {
        console.log("Something went wrong while signup", error);
    }

}


module.exports.createSession = (req,res)=>{
    console.log(req.user.role);
    req.flash('success','Logged in Successfully');
    if(req.user.role == 'Admin') {
        return res.redirect('/users/dashboard');
    } else {
        return res.redirect('/users/feedback-form');
    }
}