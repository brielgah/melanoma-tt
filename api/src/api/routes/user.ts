import { User } from '../../models/user';
import { Router } from 'express';
const Crypto = require('crypto');
export const users = Router();
const passport = require('passport');

users.post('/', async (req, res, next) => {
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

users.get('/', async (req, res, next) => {
  try {
    res.json(await User.findAll());
  } catch (e) {
    next(e);
  }
});

users.get('/:id', async (req, res, next) => {
  const body = req.body;
  User.findOne({ where: { username: req.params.id } })
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

users.put('/:id', async (req, res, next) => {
  const body = req.body;
  if ('password' in body) {
    const pass = createPassword(body.password);
    delete body.password;
    body.hash = pass.hash;
    body.salt = pass.salt;
  }
  User.update(body, { where: { id: req.params.id } })
    .then(user => {
      res.status(201).send(`Se modifico el usuario ${user}`);
    }).catch(next);
});

users.delete('/:id', async (req, res, next) => {
  const body = req.body;
  User.destroy({
    where: {
      id: body.id
    }
  }).then(user =>
    res.status(201).send(`Se elimino el usuario ${user}`));
});

users.post('/login', async (req, res, next) => {
  const body = req.body;
  if (!req.body.email) {
    return res.status(422).json({ error: 'El email es requerido' });
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
