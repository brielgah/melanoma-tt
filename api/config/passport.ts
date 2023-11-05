const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
import User from '../src/models/user.model';
import {validatePassword} from '../src/api/routes/user'
passport.use(new LocalStrategy({usernameField:'userName', passwordField:'password'},function verify(username:string, password:string, done) {
    User.findOne({ where : { userName: username }}).then(function (user) {
        if (!user || validatePassword(password, user.salt, user.hash)) {
            return done(null, false, { errors: { 'email o contraseña': 'equivocado(a)' } });
        }
        return done(null, user);
    }).catch(done);
}));
export default passport;