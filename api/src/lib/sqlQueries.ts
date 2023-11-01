export const INSERT_LESION = `
INSERT INTO lesions (name, id_owner)
VALUES (@name, @id_owner)
`;

export const GET_LESION = `
SELECT * FROM lesions WHERE id_lesion = @id
`;

export const UPDATE_LESION = `
UPDATE lesions
SET name = @name
WHERE id_lesion = @id
`;

export const DELETE_LESION = `
DELETE FROM lesions WHERE id_lesion = @id
`;

export const INSERT_PHOTO = `
INSERT INTO photos (
  id_lesion,
  name,
  creation_timestamp,
  description)
OUTPUT Inserted.id_photo
VALUES (
  @idLesion,
  @name,
  @timestamp,
  @description
)
`;

export const ADD_BLOB_TO_PHOTO = `
UPDATE photos
SET
  blob_name = @blob
WHERE id_photo = @id
`;

export const INSERT_USER_HAS_PHOTO = `
INSERT INTO user_has_photos (id_photo, id_user)
VALUES (
  @id_photo,
  @id_user
)
`;

export const GET_PHOTO = `
SELECT * FROM photos
WHERE id_photo = @id
`;

export const GET_PHOTOS_BY_LESION_ID = `
SELECT * FROM photos
WHERE id_lesion = @id
`;

export const UPDATE_PHOTO = `
UPDATE photos
SET
  name = @name,
  description = @description
WHERE id_photo = @id
`;

export const DELETE_PHOTO = `
DELETE FROM photos WHERE id_photo = @id
`;
