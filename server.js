// '/home/super-rogatory/FirstPrecedence/staticlogin/index.html'
const LocalStrategy = require('passport-local').Strategy;

const express = require('express');
const app = express();


const bcrypt = require('bcrypt');
const passport = require('passport');
const flash = require('express-flash');
const session = require('express-session');
const methodOverride = require('method-override');

const passport_init = require('./passport-config');

passport_init(passport, email => users.find(user => user.email === email), id => users.find(user => user.id === id)); // anonymous functions, no name. Gets pass to passport-config for authentication

const users = []; // TODO: Database Implementation. MongoDB implementation on the way

var bodyParser = require("body-parser");

if(process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

app.set('view-engine', 'ejs');
app.use(express.static('/home/super-rogatory/FirstPrecedence/public')); //allows us to add CSS to our EJS files
app.use(express.urlencoded({ extended: false }));
app.use(flash());
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false, //do not resave anything if nothing has changed.
    saveUninitialized: false // do not save any empty files in the session
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(methodOverride('_method'));

app.get('/', checkAuthenticated, (req,res) => {
    res.render('index.ejs');

});

app.get('/login', checkNotAuthenticated, (req, res) => {
    res.render('login.ejs');
});

// we will be posting from our ejs file to the route specified in app.post . SEE LOGIN.EJS line 21.
app.post('/login', checkNotAuthenticated, passport.authenticate('local', {
    successRedirect: '/home',
    failureRedirect: '/login',
    failureFlash: true // will be equal to "Cannot find user", or "Email + Password do not match"
}));

app.get('/register', checkNotAuthenticated, (req, res) => {
    res.render('register.ejs');
});

app.post('/register', checkNotAuthenticated, async(req, res) => {
    // references name = email from the register ejs file.
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10); // we don't want to wait for bcrypt encryption. hence the asynchronous nature.
        users.push({
            id: Date.now().toString(), // ID is just the current timestamp, nothing truly fascinating
            email: req.body.email, // getting all of the data from our register file. This comes from our POST action in register.ejs. Then we create an object with it.
            password: hashedPassword
        }); // this is local storage of user data, implementation of databases will be used in the future.
        res.redirect('./login');
    } catch {
        res.redirect('/register');
    }

});
function checkAuthenticated(req, res, next) {
    if(req.isAuthenticated()) {
        return next();
    }
    res.redirect("./login");
}
function checkNotAuthenticated(req, res, next) {
    if(req.isAuthenticated()) {
        return res.redirect('/home');
    }
    next();
}

// THE TASK ARRAY WILL HOLD ALL OF THE INFORMATION THAT THE USER INPUTS DURING THE SESSION
var task = []; // this is a test array to comfirm the functionality of the program.

//post route for adding new task
app.post('/addtask', (req,res) => {
    var newTask = req.body.newtask;// from name="newtask", we are able to access that information from the post of the home.ejs
    task.push(newTask);//after adding to the array go back to the home route
    res.redirect("/home");
});
app.get("/home", checkAuthenticated, (req,res) => {    
  res.render("home.ejs", { task: task, complete:complete });
});

// THE COMPLETE ARRAY WILL HOLD ALL OF THE INFORMATION THAT HAS BEEN SUCCESSFULLY COMPLETED AND REMOVED. 
// because of javascript's hoist nature, we can use it in line 85 and be alright.
var complete = [];
app.post('/removetask', (req, res) => {
    var completeTask = req.body.check;


if(typeof completeTask === "string"){
    complete.push(completeTask);
    task.splice(task.indexOf(completeTask), 1); // will remove or replace any duplicate element. A completed task shouldn't exist in task. We will remove it from task.
} else if(typeof completeTask === "object") {
    for( let i = 0; i < completeTask.length; i++){
        complete.push(completeTask[i]);
        task.splice(task.indexOf(completeTask[i]), 1);
    }
}
    res.redirect('/home');
});
app.delete('/logout', (req,res) => {
    req.logOut();
    res.redirect('/login');
})


app.listen(3000);