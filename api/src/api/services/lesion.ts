import log from '../../lib/logger';
import { type RequestOptions } from '../../lib/types';
import Lesion from '../../models/lesion.model';
import Photo from '../../models/photo.model';
import User from '../../models/user.model';

type LesionPostRequestOptions = RequestOptions<Lesion, unknown>;

export const postLesion = async (options: LesionPostRequestOptions) => {
  try {
    log.info('Inserting new lesion');
    const lesion = new Lesion({
      name: options.body.name,
      idUser: options.body.idUser,
    });
    await lesion.save();
    log.info('Lesion was inserted');
    return {
      status: 200,
      data: {
        result: true,
        message: 'Ok',
        id: lesion.id,
      },
    };
  } catch (error) {
    log.error(error, 'Error inserting lesion');
    return {
      status: 400,
      data: {
        result: false,
        message: 'Error inserting lesion',
      },
    };
  }
};

type LesionGetRequestOptions = RequestOptions<unknown, { id: number }>;

export const getLesionbyId = async (options: LesionGetRequestOptions) => {
  try {
    const lesion = await Lesion.findByPk(options.params.id, {
      include: [
        Photo,
        {
          model: User,
          through: {
            attributes: [],
          },
          as: 'sharedWithUsers',
          attributes: ['id', 'userName'],
        },
        {
          model: User,
          as: 'owner',
        },
      ],
    });
    if (lesion === null) {
      return {
        status: 404,
        data: {
          result: false,
          message: 'Lesions does not exists',
        },
      };
    }
    log.info('Lesion was returned');
    // for await (const photo of lesion.photos) {
    //   await Photo.setImage(photo);
    // }
    return {
      status: 200,
      data: lesion,
    };
  } catch (error) {
    log.error(error, 'Error getting lesion');
    return {
      status: 400,
      data: {
        result: false,
        message: 'Error getting lesion',
      },
    };
  }
};

type LesionPatchRequestOptions = RequestOptions<Lesion, { id: number }>;

export const patchLesionById = async (options: LesionPatchRequestOptions) => {
  try {
    log.info('Updating lesion');
    await Lesion.update(
      {
        name: options.body.name,
      },
      {
        where: { id: options.params.id },
      },
    );
    log.info('Lesion was updated');
    return {
      status: 200,
      data: {
        result: true,
        message: 'Updated successfully',
      },
    };
  } catch (error) {
    log.error(error, 'Error updating lesion');
    return {
      status: 400,
      data: {
        result: false,
        message: 'Error updating lesion',
      },
    };
  }
};

type LesionDeleteRequestOptions = RequestOptions<unknown, { id: number }>;

export const deleteLesionById = async (options: LesionDeleteRequestOptions) => {
  try {
    const lesion = await Lesion.findByPk(options.params.id);
    await lesion?.destroy();
    log.info('Lesion was deleted');
    return {
      status: 200,
      data: {
        result: true,
        message: 'Deleted successfully',
      },
    };
  } catch (error) {
    log.error(error, 'Error deleting lesion');
    return {
      status: 400,
      data: {
        result: false,
        message: 'Error deleting lesion',
      },
    };
  }
};
