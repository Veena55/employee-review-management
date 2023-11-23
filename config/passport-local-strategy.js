const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy; 
const User =require('../models/users');

passport.use(new LocalStrategy({
    usernameField : 'employee_id'
},
async (empId,password,done)=>{
 //find a user and establish the identity
 const user = await User.findOne({employee_id : empId});
 if(!user || user.password != password) {
    return done(null, false);
 }
 return done(null, user);
}
));

// serializing the user to decide which key is to be kept in the cookies
passport.serializeUser((user,done)=>{
    done(null, user.id);
});

// deserializing the user from the key in the cookies
passport.deserializeUser(async(id,done)=>{
    const user = await User.findById(id);
    if(user) {
        return done(null,user);
    }
});

//check if the user is authenticated
passport.checkAuthentication = (req,res,next) => {
// if the user is signed in, then pass on the request to the next function(controller's action)
if(req.isAuthenticated()) {
    return next();
}
//if the user is not signed in
return res.redirect('/');
}

passport.setAuthenticatedUser = (req,res,next) => {
    if(req.isAuthenticated()) {
        //req.user contains the current sign user from the seesion cookie and  we are just sending this to the locals for the views
        res.locals.user = req.user;
    }
   return next();
}

module.exports = passport;