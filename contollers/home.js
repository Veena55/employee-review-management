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
    return res.render('feedback-form',{
        title : "Feedback Form"
    });
}
module.exports.registerForFeedback = (req,res) => {
    return res.render('register-feedback',{
        title : "Regsiter Yourself"
    });
}