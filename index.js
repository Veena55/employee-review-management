const express = require('express');
const app = express();
const PORT = 8000;
const db = require('./config/mongoose');
const passport = require('passport');
const passportLocalStrategy = require('./config/passport-local-strategy');

// setup layout for view
const expressLayout = require('express-ejs-layouts');
app.use(express.urlencoded());
app.use(express.static('assets'));
app.use(expressLayout);
app.set('view engine','ejs');
app.set('views','./views');

app.use(passport.initialize());
// app.use(passport.session());
app.use(passport.setAuthenticatedUser);

app.use('/', require('./routes'));

app.listen(PORT,(err)=>{
    if(err) {
        console.log("Something went wrong!!"+err);
    } else{
        console.log(`Server is runningon PORT - ${PORT}`);
    }
});