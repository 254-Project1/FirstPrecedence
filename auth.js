const bcrypt = require('bcrypt');
const authenticateUser = async(email, password, done) => {
    const user = getUserByEmail(email);
    if(user === null){
        return done(null, false, {message: 'Cannot find user.'});
    }
    try {
        if (await bcrypt.compare(password, user.password)) {
            return done(null, user);
        } else {
            return done(null, false, {message: 'Email + Password does not match.'});
        }
    } catch(e) {
        return(e);
    }
} 
module.exports = authenticateUser;