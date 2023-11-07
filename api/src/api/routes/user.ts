import User from '../../models/user.model';
import { type RequestHandler, Router } from 'express';
import reminderRouter from './reminder';
import '../../lib/passport';
import Crypto from 'crypto';
import passport from 'passport';

const userRouter = Router();

userRouter.use('/:idUser/reminder', reminderRouter);

userRouter.post('/', (async (req, res, next) => {
  const body = req.body;
  const password = body.password;
  delete body.password;
  try {
    const user = User.build(body);
    const pass = createPassword(password);
    user.salt = pass.salt;
    user.hash = pass.hash;
    user.userName = user.userName.toLocaleLowerCase();
    user
      .save()
      .then((user) => {
        return res.status(201).json(toAuthJSON(user));
      })
      .catch(next);
  } catch (e) {
    next(e);
  }
}) as RequestHandler);

userRouter.get('/', (async (req, res, next) => {
  try {
    res.json(await User.findAll());
  } catch (e) {
    next(e);
  }
}) as RequestHandler);

userRouter.get('/:idUser', (async (req, res, next) => {
  User.findOne({ where: { id: req.params.idUser } })
    .then((user) => {
      if (!user) {
        return res
          .status(401)
          .send(`The user ${req.params.idUser} wasn't found `);
      }
      const response = {
        username: user.userName,
        name: user.name,
        lastname: user.lastName,
        id: user.id,
        reminders: user.reminders,
      };
      return res.json(response);
    })
    .catch(next);
}) as RequestHandler);

userRouter.patch('/:idUser', (async (req, res, next) => {
  const body = req.body;
  if ('password' in body) {
    const pass = createPassword(body.password);
    delete body.password;
    body.hash = pass.hash;
    body.salt = pass.salt;
  }
  body.userName = body.userName.toLocaleLowerCase();
  User.update(body, { where: { id: req.params.idUser } })
    .then(() => {
      res
        .status(201)
        .send(`The user ${req.params.idUser} was updated successfully`);
    })
    .catch(next);
}) as RequestHandler);

userRouter.delete('/:idUser', (async (req, res, next) => {
  await User.destroy({
    where: {
      id: req.params.idUser,
    },
  });
  res
    .status(201)
    .send(`The user ${req.params.idUser} was deleted successfully`);
}) as RequestHandler);

userRouter.post('/login', (async (req, res, next) => {
  if (req.body.userName == null) {
    return res.status(422).json({ error: 'The user is required' });
  }

  if (req.body.password == null) {
    return res.status(422).json({ error: 'The password is required' });
  }

  passport.authenticate(
    'local',
    { session: false },
    function (err: Error, user: User, info: any) {
      if (err != null) {
        next(err);
        return;
      }

      if (user != null) {
        return res.json({ user: toAuthJSON(user) });
      } else {
        return res.status(422).json(info);
      }
    },
  )(req, res, next);
}) as RequestHandler);

const createPassword = function (password: string) {
  const salt = Crypto.randomBytes(16).toString('hex');
  const hash = Crypto.pbkdf2Sync(password, salt, 10000, 512, 'sha512').toString(
    'hex',
  );
  return { salt, hash };
};

export const validatePassword = function (
  password: string,
  salt: string,
  hash: string,
) {
  const hashVerify = Crypto.pbkdf2Sync(
    password,
    salt,
    10000,
    512,
    'sha512',
  ).toString('hex');
  return hash === hashVerify;
};

export const toAuthJSON = function (user: User) {
  return {
    username: user.userName,
    id: user.id,
  };
};

export default userRouter;
