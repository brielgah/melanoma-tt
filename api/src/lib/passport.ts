import User from '../models/user.model';
import { validatePassword } from '../api/routes/user';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';

passport.use(
  new LocalStrategy(
    { usernameField: 'userName', passwordField: 'password' },
    function verify(username: string, password: string, done) {
      User.findOne({ where: { userName: username } })
        .then(function (user) {
          if (!user || validatePassword(password, user.salt, user.hash)) {
            done(null, false, {
              message: 'email o contraseña equivocado(a)',
            });
            return;
          }
          done(null, user);
        })
        .catch(done);
    },
  ),
);
export default passport;
