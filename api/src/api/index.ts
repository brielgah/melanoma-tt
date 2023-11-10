import express, {
  type Request,
  type Response,
  type NextFunction,
} from 'express';
import log from '../lib/logger';
import dummyRouter from './routes/dummy';
import type ServerError from '../lib/error';
import bodyParser from 'body-parser';
import lesionRouter from './routes/lesion';
import userRouter from './routes/user';
import passport from '../lib/passport';
import session from 'express-session';
import operationRouter from './routes/operation';

const app = express();

app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: false }));
// Login components
app.use(
  session({
    secret: 'simpleExpressMVC',
    resave: true,
    saveUninitialized: true,
  }),
);
app.use(passport.initialize());
app.use(passport.session());
// register routes for each endpoints here
// Routes
app.use('/dummy', dummyRouter);
app.use('/lesion', lesionRouter);
app.use('/user', userRouter);
app.use('/operation', operationRouter);

// catch 404
app.use((req, res, next) => {
  log.error(`Error 404 on ${req.url}.`);
  res.status(404).send({ status: 404, error: 'Not found' });
});

// catch errors
app.use((err: ServerError, req: Request, res: Response, next: NextFunction) => {
  const status = err.status || 500;
  const msg = err.error || err.message;
  log.error(
    `Error ${status} (${msg}) on ${req.method} ${req.url} with payload ${req.body}.`,
  );
  res.status(status).send({ status, error: msg });
});

export default app;
