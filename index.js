const express = require('express');
const app = express();
const PORT = 8000;
const db = require('./config/mongoose');
// const MongoStore = require('connect-mongodb-session')(session);
const flash = require('connect-flash');
const customMiddleware = require('./config/middleware');

// //Import the main Passport and Express-Session library
const passport = require('passport');
const session = require('express-session');
const passportLocalStrategy = require('./config/passport-local-strategy');
const MongoStore = require('connect-mongodb-session')(session);

// setup layout for view
const expressLayout = require('express-ejs-layouts');
app.use(express.urlencoded({ extended: false }));
app.use(express.static('assets'));
app.use(expressLayout);
app.set('view engine','ejs');
app.set('views','./views');


// initialize the middleare for passport js to maintain session or attach authentocated user to req.session
app.use(session({
    name : "employee-review-management",
    secret : "employee-review-management-data",
    resave : false,
    saveUninitialized : false,
    cookie : {
        maxAge : (1000*60*100)
    },
    store : new MongoStore({
        uri : 'mongodb://0.0.0.0:27017/review_management',
        collection: 'mySessions'
    })
}))
// This is the basic express session({..}) initialization.
app.use(flash());
app.use(customMiddleware.setFlash);

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);
    



app.use('/', require('./routes'));

process.on('uncaughtException', err => {
    console.log(`Uncaught Exception: ${err.message}`)
    process.exit(1)
});

app.listen(PORT,(err)=>{
    if(err) {
        console.log("Something went wrong!!"+err);
    } else{
        console.log(`Server is running on PORT - ${PORT}`);
    }
});