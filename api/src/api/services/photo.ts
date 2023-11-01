import log from '../../lib/logger';
import { type RequestOptions } from '../../lib/types';
import Photo from '../../models/photo.model';
import { downloadImage, uploadImage } from '../../adapters/blobStorage';
import type Image from '../../models/image';

function photoFromRecord(record: any, image: Image): Photo {
  return {
    id: record.id_photo as number,
    name: record.name as string,
    dateOfCreation: record.creation_timestamp as number,
    description: record.description as string,
    blobName: record.blob_name as string,
    image,
  };
}

export const postPhoto = async (
  options: RequestOptions<Photo, { idLesion: number }>,
) => {
  try {
    const photo = new Photo({
      blobName: '',
      name: options.body.name,
      description: options.body.description,
      lesionId: options.params.idLesion,
    });
    await photo.save();
    log.info('Photo was inserted');
    const idPhoto = photo.id;
    await uploadImage({
      data: options.body.image.data,
      name: String(idPhoto),
      ext: 'jpg',
    });
    await photo.update({ blobName: `${photo.id}.jpg` });
    log.info('Photo blob name was updated');
    return {
      status: 200,
      data: {
        result: true,
        message: 'Ok',
      },
    };
  } catch (error) {
    log.error(error, 'Error inserting photo');
    return {
      status: 400,
      data: {
        result: false,
        message: 'Error inserting photo',
      },
    };
  }
};

export const getPhotosByLesionId = async (
  options: RequestOptions<unknown, { idLesion: number }>,
) => {
  try {
    const photos = await Photo.findAll({
      where: {
        lesionId: options.params.idLesion,
      },
    });
    return {
      status: 200,
      data: photos,
    };
  } catch (error) {
    log.error(error, 'Error getting photos');
    return {
      status: 400,
      data: {
        result: false,
        message: 'Error getting photos',
      },
    };
  }
};

export const getPhotobyId = async (
  options: RequestOptions<unknown, { idLesion: number; idPhoto: number }>,
) => {
  try {
    const photo = await Photo.findByPk(options.params.idPhoto);
    if (photo === null) {
      return {
        status: 404,
        data: {
          result: false,
          message: 'Photo does not exists',
        },
      };
    }
    log.info('Photo was returned');
    photo.image = await downloadImage(photo.blobName);
    return {
      status: 200,
      data: photo,
    };
  } catch (error) {
    log.error(error, 'Error getting photo');
    return {
      status: 400,
      data: {
        result: false,
        message: 'Error getting photo',
      },
    };
  }
};

type NullablePhoto = {
  [K in keyof Photo]: Photo[K] | null;
};

export const patchPhotoById = async (
  options: RequestOptions<NullablePhoto, { idLesion: number; idPhoto: number }>,
) => {
  try {
    const photo = await Photo.findByPk(options.params.idPhoto);
    if (photo === null) {
      return {
        status: 404,
        data: {
          result: false,
          message: 'Photo does not exists',
        },
      };
    }
    const update = {
      description: photo.description,
      name: photo.name,
    };
    if (options.body.description != null) {
      update.description = options.body.description;
    }
    if (options.body.name != null) {
      update.name = options.body.name;
    }
    await photo.update(update);
    log.info('Photo was updated');
    return {
      status: 200,
      data: {
        result: true,
        message: 'Updated successfully',
      },
    };
  } catch (error) {
    log.error(error, 'Error updating photo');
    return {
      status: 400,
      data: {
        result: false,
        message: 'Error updating photo',
      },
    };
  }
};

export const deletePhotoById = async (
  options: RequestOptions<unknown, { idPhoto: number; idLesion: number }>,
) => {
  try {
    log.info('Deleting photo');
    const photo = await Photo.findByPk(options.params.idPhoto);
    await photo?.destroy();
    log.info('Photo was deleted');
    return {
      status: 200,
      data: {
        result: true,
        message: 'Deleted successfully',
      },
    };
  } catch (error) {
    log.error(error, 'Error deleting photo');
    return {
      status: 400,
      data: {
        result: false,
        message: 'Error deleting photo',
      },
    };
  }
};
