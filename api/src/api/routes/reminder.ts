import { type RequestHandler, Router } from 'express';
import type Reminder from '../../models/reminder.model';
import {
  deleteReminderById,
  getReminderById,
  patchReminderById,
  postReminder,
} from '../services/reminder';

const reminderRouter = Router({ mergeParams: true });

reminderRouter.post('/:idLesion', (async (req, res, next) => {
  const reminder = req.body;

  const idLesion = req.params.idLesion;
  const idUser = req.params.idUser;

  if (idUser == null) {
    return res.status(400).send({
      result: false,
      message: 'missing user id',
    });
  }
  if (idLesion == null) {
    return res.status(400).send({
      result: false,
      message: 'missing lesion id',
    });
  }
  if (reminder.targetTimeStamp == null) {
    return res.status(400).send({
      result: false,
      message: 'missing target date',
    });
  }
  const options = {
    body: reminder as Reminder,
    params: {
      idLesion: Number(idLesion),
      idUser: Number(idUser),
    },
  };

  try {
    const result = await postReminder(options);
    res.status(result.status).send(result.data);
  } catch (err) {
    next(err);
  }
}) as RequestHandler);

reminderRouter.get('/:idReminder', (async (req, res, next) => {
  if (req.params.idUser == null) {
    return res.status(400).send({
      result: false,
      message: 'missing user id',
    });
  }
  if (req.params.idReminder == null) {
    return res.status(400).send({
      result: false,
      message: 'missing reminder id',
    });
  }
  const options = {
    params: {
      idReminder: Number(req.params.idReminder),
      idUser: Number(req.params.idUser),
    },
    body: null,
  };

  try {
    const result = await getReminderById(options);
    res.status(result.status).send(result.data);
  } catch (err) {
    next(err);
  }
}) as RequestHandler);

reminderRouter.patch('/:idReminder', (async (req, res, next) => {
  const reminder = req.body;
  if (req.params.idReminder == null) {
    return res.status(400).send({
      result: false,
      message: 'missing reminder id',
    });
  }
  if (req.params.idUser == null) {
    return res.status(400).send({
      result: false,
      message: 'missing user id',
    });
  }
  const options = {
    params: {
      idReminder: Number(req.params.idReminder),
      idUser: Number(req.params.idUser),
    },
    body: reminder,
  };

  try {
    const result = await patchReminderById(options);
    res.status(result.status).send(result.data);
  } catch (err) {
    next(err);
  }
}) as RequestHandler);

reminderRouter.delete('/:idReminder', (async (req, res, next) => {
  if (req.params.idReminder == null) {
    return res.status(400).send({
      result: false,
      message: 'missing reminder id',
    });
  }
  if (req.params.idUser == null) {
    return res.status(400).send({
      result: false,
      message: 'missing user id',
    });
  }
  const options = {
    params: {
      idUser: Number(req.params.idUser),
      idReminder: Number(req.params.idReminder),
    },
    body: null,
  };

  try {
    const result = await deleteReminderById(options);
    res.status(result.status).send(result.data);
  } catch (err) {
    next(err);
  }
}) as RequestHandler);

export default reminderRouter;
