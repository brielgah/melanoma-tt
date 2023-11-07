import { type RequestHandler, Router } from 'express';
import {
  deleteDummyById,
  getDummybyId,
  patchDummyById,
  postDummy,
} from '../services/dummy';
import getSequelize from '../../adapters/database';
import type Dummy from '../../models/dummy';

// add http routes for an endpoint in src/routes,
// example:
//   - POST dummy/
//   - GET dummy/id
//   - PATCH dummy/id
//   - DELETE dummy/id

const dummyRouter = Router();

dummyRouter.post('/', (async (req, res, next) => {
  const options = {
    body: req.body as Dummy,
    params: { id: 1 },
  };

  try {
    const result = await postDummy(options);
    res.status(result.status).send(result.data);
  } catch (err) {
    next(err);
  }
}) as RequestHandler);

dummyRouter.get('/:id', (async (req, res, next) => {
  const options = {
    params: { id: Number(req.params.id) },
    body: req.body as Dummy,
  };

  await getSequelize();

  // const file = 'asdasdasdadasdads';
  // await uploadImage({ name: 'test', data: file, ext: 'jpg' });
  // const download = await downloadImage('test.jpg');
  // console.log(download);

  try {
    const result = await getDummybyId(options);
    res.status(result.status).send(result.data);
  } catch (err) {
    next(err);
  }
}) as RequestHandler);

dummyRouter.patch('/:id', (async (req, res, next) => {
  const options = {
    params: { id: Number(req.params.id) },
    body: req.body as Dummy,
  };

  try {
    const result = await patchDummyById(options);
    res.status(result.status).send(result.data);
  } catch (err) {
    next(err);
  }
}) as RequestHandler);

dummyRouter.delete('/:id', (async (req, res, next) => {
  const options = {
    params: { id: Number(req.params.id) },
    body: req.body as Dummy,
  };

  try {
    const result = await deleteDummyById(options);
    res.status(result.status).send(result.data);
  } catch (err) {
    next(err);
  }
}) as RequestHandler);

export default dummyRouter;
