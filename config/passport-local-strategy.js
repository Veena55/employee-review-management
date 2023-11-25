const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy; 
const User =require('../models/users');


// let authUser = async (empId,password,done) => {
//     console.log("empId");
//     //Search the user, password in the DB to authenticate the user
// //Let's assume that a search within your DB returned the empId and password match for given in form".
// try {
//             const user = await User.findOne({empid : empId});
//             console.log(user+"user");
//             if(!user || user.password != password) {
//                return done(null, false);
//             }
            
//             return done(null, user);
            
//         } catch (error) {
//             console.log(error);
//         }
//     }
//     passport.use(new LocalStrategy (authUser));
 
    
passport.use(new LocalStrategy(
    {   
        usernameField: 'empId',
        passwordField: 'password',
        passReqToCallback: true
    },
async (req,empId,password,done)=>{
    console.log(req.body);
    try {
        const user = await User.findOne({empid : empId});
        console.log(user+"user");
        if(!user || user.password != password) {
           return done(null, false);
        }
        
        return done(null, user);
        
    } catch (error) {
        console.log(error);
    }
 //find a user and establish the identity
}
));

// serializing the user to decide which key is to be kept in the cookies
passport.serializeUser((user,done)=>{
    console.log("serialize user--"+user);
    done(null, user.id);
});

// deserializing the user from the key in the cookies
passport.deserializeUser(async(id,done)=>{
    console.log("deserialize user--"+id);
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
return res.redirect('/users/sign-in');
}

passport.setAuthenticatedUser = (req,res,next) => {
    if(req.isAuthenticated()) {
        //req.user contains the current sign user from the seesion cookie and  we are just sending this to the locals for the views
        res.locals.user = req.user;
    }
   return next();
}

module.exports = passport;