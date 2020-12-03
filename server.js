// '/home/super-rogatory/FirstPrecedence/staticlogin/index.html'
const LocalStrategy = require('passport-local').Strategy;

const express = require('express');
const app = express();

const authenticateUser = require('./auth');

const bcrypt = require('bcrypt');
const passport = require('passport');
const flash = require('express-flash');
const session = require('express-session');

const users = []; // TODO: Database Implementation. MongoDB implementation on the way

if(process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

app.set('view-engine', 'ejs');
app.use(express.static('/home/super-rogatory/FirstPrecedence/public')); //allows us to add CSS to our EJS files
app.use(express.urlencoded({ extended: false}));
app.use(flash());
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false, //do not resave anything if nothing has changed.
    saveUninitialized: false // do not save any empty files in the session
}));

app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req,res) => {
    res.render('index.ejs', {name: "Kyle"});

});

app.get('/login', (req, res) => {
    res.render('login.ejs');
});

// we will be posting from our ejs file to the route specified in app.post . SEE LOGIN.EJS line 21.
app.post('/login', passport.authenticate('local', {
    successRedirect: '/home',
    failureRedirect: '/login',
    failureFlash: true // will be equal to "Cannot find user", or "Email + Password do not match"
}));

app.get('/register', (req, res) => {
    res.render('register.ejs');
});

app.post('/register', async(req, res) => {
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

app.get('/home', (req, res) => {
    res.render('home.ejs');
});

// const authenticateUser = async(email, password, done) => {
//     const user = getUserByEmail(email);
//     if(user === null){
//         return done(null, false, {message: 'Cannot find user.'});
//     }
//     try {
//         if (await bcrypt.compare(password, user.password)) {

//         } else {
//             return done(null, false, {message: 'Email + Password does not match.'});
//         }
//     } catch(e) {
//         return(e);
//     }
// } 

// initialize our passport. 
function initialize(passport, getUserByEmail, getUserByID) {
    passport.use(new LocalStrategy({ usernameField: 'email'}, authenticateUser));
    passport.serializeUser((user, done) => done(null, user.id));
    passport.deserializeUser((id, done) => { 
        return done(null, getUserByID(id));
    });
}

initialize(passport, 
    email => users.find(user => user.email === email),
    id => users.find(user => user.id === id)
)

app.delete('./logout', (req,res) => {
    req.logOut();
    res.redirect('./login');
})
app.listen(3000);