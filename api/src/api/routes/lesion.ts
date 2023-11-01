import { type RequestHandler, Router } from 'express';
import {
  deleteLesionById,
  getLesionbyId,
  patchLesionById,
  postLesion,
} from '../services/lesion';
import type Lesion from '../../models/lesion.model';
import photoRouter from './photo';

const lesionRouter = Router();

lesionRouter.post('/', (async (req, res, next) => {
  const lesion = req.body;
  if (lesion.name == null) {
    return res.status(400).send({
      result: false,
      message: 'missing lesion name',
    });
  }
  const options = {
    body: lesion as Lesion,
    params: {},
  };

  try {
    const result = await postLesion(options);
    res.status(result.status).send(result.data);
  } catch (err) {
    next(err);
  }
}) as RequestHandler);

lesionRouter.get('/:id', (async (req, res, next) => {
  if (req.params.id == null) {
    return res.status(400).send({
      result: false,
      message: 'missing lesion id',
    });
  }
  const options = {
    params: {
      id: Number(req.params.id),
    },
    body: null,
  };

  try {
    const result = await getLesionbyId(options);
    res.status(result.status).send(result.data);
  } catch (err) {
    next(err);
  }
}) as RequestHandler);

lesionRouter.patch('/:id', (async (req, res, next) => {
  const lesion = req.body;
  if (lesion.name == null) {
    return res.status(200).send({
      result: true,
      message: 'Nothing to update',
    });
  }
  const options = {
    params: {
      id: Number(req.params.id),
    },
    body: lesion,
  };

  try {
    const result = await patchLesionById(options);
    res.status(result.status).send(result.data);
  } catch (err) {
    next(err);
  }
}) as RequestHandler);

lesionRouter.delete('/:id', (async (req, res, next) => {
  if (req.params.id == null) {
    return res.status(400).send({
      result: false,
      message: 'missing lesion id',
    });
  }
  const options = {
    params: {
      id: Number(req.params.id),
    },
    body: null,
  };

  try {
    const result = await deleteLesionById(options);
    res.status(result.status).send(result.data);
  } catch (err) {
    next(err);
  }
}) as RequestHandler);

lesionRouter.use('/:idLesion/photo', photoRouter);

export default lesionRouter;
