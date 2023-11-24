import log from '../../lib/logger';
import { type RequestOptions } from '../../lib/types';
import Reminder from '../../models/reminder.model';

export const postReminder = async (
  options: RequestOptions<Reminder, { idUser: number; idLesion: number }>,
) => {
  try {
    const reminder = new Reminder({
      idLesion: options.params.idLesion,
      idUser: options.params.idUser,
      targetTimeStamp: options.body.targetTimeStamp,
      cycleLength: options.body.cycleLength,
    });
    await reminder.save();
    return {
      status: 200,
      data: {
        result: true,
        message: 'Ok',
      },
    };
  } catch (error) {
    log.error(error, 'Error inserting reminder');
    return {
      status: 400,
      data: {
        result: false,
        message: 'Error inserting reminder',
      },
    };
  }
};

export const getReminderById = async (
  options: RequestOptions<unknown, { idUser: number; idReminder: number }>,
) => {
  try {
    const reminder = await Reminder.findByPk(options.params.idReminder);
    if (reminder === null) {
      return {
        status: 404,
        data: {
          result: false,
          message: 'Reminder does not exists',
        },
      };
    }
    log.info('Reminder was returned');
    return {
      status: 200,
      data: reminder,
    };
  } catch (error) {
    log.error(error, 'Error getting reminder');
    return {
      status: 400,
      data: {
        result: false,
        message: 'Error getting reminder',
      },
    };
  }
};

type ReminderPatchRequestOptions = RequestOptions<
Reminder,
{ idUser: number; idReminder: number }
>;

export const patchReminderById = async (
  options: ReminderPatchRequestOptions,
) => {
  try {
    const reminder = await Reminder.findByPk(options.params.idReminder);
    if (reminder === null) {
      return {
        status: 404,
        data: {
          result: false,
          message: 'Reminder does not exists',
        },
      };
    }
    const update = {
      targetTimeStamp: options.body.targetTimeStamp,
    };
    await reminder.update(update);
    log.info('Reminder was updated');
    return {
      status: 200,
      data: {
        result: true,
        message: 'Updated successfully',
      },
    };
  } catch (error) {
    log.error(error, 'Error updating reminder');
    return {
      status: 400,
      data: {
        result: false,
        message: 'Error updating reminder',
      },
    };
  }
};

type ReminderDeleteRequestOptions = RequestOptions<
unknown,
{ idUser: number; idReminder: number }
>;

export const deleteReminderById = async (
  options: ReminderDeleteRequestOptions,
) => {
  try {
    log.info('Deleting reminder');
    const reminder = await Reminder.findByPk(options.params.idReminder);
    await reminder?.destroy();
    log.info('Reminder was deleted');
    return {
      status: 200,
      data: {
        result: true,
        message: 'Deleted successfully',
      },
    };
  } catch (error) {
    log.error(error, 'Error deleting reminder');
    return {
      status: 400,
      data: {
        result: false,
        message: 'Error deleting reminder',
      },
    };
  }
};

export const discardReminder = async (
  options: RequestOptions<
  unknown,
  { idUser: number; idReminder: number; erase: boolean }
  >,
) => {
  try {
    const reminder = await Reminder.findByPk(options.params.idReminder);
    if (reminder === null) {
      return {
        status: 404,
        data: {
          result: false,
          message: 'Reminder does not exists',
        },
      };
    }
    options.params.erase =
      reminder.cycleLength === 0 ||
      reminder.targetTimeStamp === undefined ||
      options.params.erase;
    log.info('Reminder was returned');
    if (options.params.erase) {
      return await deleteReminderById(options);
    }
    const current = reminder.targetTimeStamp ?? new Date();
    const future = new Date(
      current.getTime() + reminder.cycleLength * 60 * 60 * 1000,
    );
    reminder.targetTimeStamp = future;
    const patchOptions = {
      params: {
        idUser: options.params.idUser,
        idReminder: options.params.idReminder,
      },
      body: reminder,
    };
    return await patchReminderById(patchOptions);
  } catch (error) {
    log.error(error, 'Error discarding reminder');
    return {
      status: 400,
      data: {
        result: false,
        message: 'Error getting reminder',
      },
    };
  }
};
