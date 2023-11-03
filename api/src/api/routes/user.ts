import User from '../../models/user.model';
import { Router } from 'express';
import reminderRouter from './reminder';
const Crypto = require('crypto');

const userRouter = Router();
const passport = require('passport');

userRouter.use('/:idUser/reminder', reminderRouter);

userRouter.post('/', async (req, res, next) => {
  const body = req.body;
  const password = body.password;
  delete body.password;
  try {
    const user = User.build(body);
    const pass = createPassword(password);
    user.salt = pass.salt;
    user.hash = pass.hash;
    user.save().then(user => {
      return res.status(201).json(toAuthJSON(user));
    }).catch(next);
  } catch (e) {
    next(e);
  }
});

userRouter.get('/', async (req, res, next) => {
  try {
    res.json(await User.findAll());
  } catch (e) {
    next(e);
  }
});

userRouter.get('/:id', async (req, res, next) => {
  const body = req.body;
  User.findOne({ where: { id: req.params.id } })
    .then(user => {
      if (!user) {
        return res.status(401).send('No se encontró el usuario.');
      }
      const response = {
        username: user.userName,
        name: user.name,
        lastname: user.lastName,
        id: user.id,
        images: user.images,
        reminders: user.reminders,
        patients: user.patients
      };
      return res.json(response);
    }).catch(next);
});

userRouter.patch('/:id', async (req, res, next) => {
  const body = req.body;
  if ('password' in body) {
    const pass = createPassword(body.password);
    delete body.password;
    body.hash = pass.hash;
    body.salt = pass.salt;
  }
  User.update(body, { where: { id: req.params.id } })
    .then(() => {
      res.status(201).send(`Se modifico el usuario ${req.params.id}`);
    }).catch(next);
});

userRouter.delete('/:id', async (req, res, next) => {
  const body = req.body;
  User.destroy({
    where: {
      id: req.params.id
    }
  }).then(user =>
    res.status(201).send(`Se elimino el usuario ${user}`));
});

userRouter.post('/login', async (req, res, next) => {
  const body = req.body;
  if (!req.body.userName) {
    return res.status(422).json({ error: 'El usuario es requerido' });
  }

  if (!req.body.password) {
    return res.status(422).json({ error: 'La contraseña es requerida' });
  }

  passport.authenticate('local', { session: false }, function (err, user, info) {
    if (err) {
      next(err); return;
    }

    if (user) {
      return res.json({ user: toAuthJSON(user) });
    } else {
      return res.status(422).json(info);
    }
  })(req, res, next);
});

const createPassword = function (password: string) {
  const salt = Crypto.randomBytes(16).toString('hex');
  const hash = Crypto
    .pbkdf2Sync(password, salt, 10000, 512, 'sha512')
    .toString('hex');
  return { salt, hash };
};

export const validatePassword = function (password: string, salt: string, hash: string) {
  const hashVerify = Crypto
    .pbkdf2Sync(password, salt, 10000, 512, 'sha512')
    .toString('hex');
  return hash === hashVerify;
};

export const toAuthJSON = function(user: User) {
  return {
    username: user.userName,
    id: user.id,
  };
};

export default userRouter;
