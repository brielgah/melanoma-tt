import { type RequestHandler, Router } from 'express';
import type Photo from '../../models/photo.model';
import {
  deletePhotoById,
  getPhotobyId,
  patchPhotoById,
  postPhoto,
} from '../services/photo';

const photoRouter = Router({ mergeParams: true });

photoRouter.post('/', (async (req, res, next) => {
  const photo = req.body;
  photo.dateOfCreation = Date.now();
  const idLesion = req.params.idLesion;
  if (idLesion == null) {
    return res.status(400).send({
      result: false,
      message: 'missing lesion id',
    });
  }
  if (photo.name == null) {
    photo.name = photo.dateOfCreation.tolocaleString();
  }
  if (photo.description == null) {
    photo.description = '';
  }
  if (photo.image?.data == null) {
    return res.status(400).send({
      result: false,
      message: 'missing image data',
    });
  }
  const options = {
    body: photo as Photo,
    params: {
      idLesion: Number(idLesion),
    },
  };

  try {
    const result = await postPhoto(options);
    res.status(result.status).send(result.data);
  } catch (err) {
    next(err);
  }
}) as RequestHandler);

photoRouter.get('/:idPhoto', (async (req, res, next) => {
  if (req.params.idLesion == null) {
    return res.status(400).send({
      result: false,
      message: 'missing lesion id',
    });
  }
  if (req.params.idPhoto == null) {
    return res.status(400).send({
      result: false,
      message: 'missing lesion id',
    });
  }
  const options = {
    params: {
      idPhoto: Number(req.params.idPhoto),
      idLesion: Number(req.params.idLesion),
    },
    body: null,
  };

  try {
    const result = await getPhotobyId(options);
    res.status(result.status).send(result.data);
  } catch (err) {
    next(err);
  }
}) as RequestHandler);

photoRouter.patch('/:idPhoto', (async (req, res, next) => {
  const photo = req.body;
  if (req.params.idPhoto == null) {
    return res.status(400).send({
      result: false,
      message: 'missing photo id',
    });
  }
  if (req.params.idLesion == null) {
    return res.status(400).send({
      result: false,
      message: 'missing lesion id',
    });
  }
  const options = {
    params: {
      idPhoto: Number(req.params.idPhoto),
      idLesion: Number(req.params.idLesion),
    },
    body: photo,
  };

  try {
    const result = await patchPhotoById(options);
    res.status(result.status).send(result.data);
  } catch (err) {
    next(err);
  }
}) as RequestHandler);

photoRouter.delete('/:idPhoto', (async (req, res, next) => {
  if (req.params.idPhoto == null) {
    return res.status(400).send({
      result: false,
      message: 'missing photo id',
    });
  }
  if (req.params.idLesion == null) {
    return res.status(400).send({
      result: false,
      message: 'missing lesion id',
    });
  }
  const options = {
    params: {
      idPhoto: Number(req.params.idPhoto),
      idLesion: Number(req.params.idLesion),
    },
    body: null,
  };

  try {
    const result = await deletePhotoById(options);
    res.status(result.status).send(result.data);
  } catch (err) {
    next(err);
  }
}) as RequestHandler);

export default photoRouter;
