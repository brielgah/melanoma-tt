DROP TABLE user_has_photos;
DROP TABLE photos;
DROP TABLE reminders;
DROP TABLE lesions;
DROP TABLE users;

CREATE TABLE users (
	id_user BIGINT NOT NULL IDENTITY,
	username VARCHAR(255) NOT NULL UNIQUE,
	PRIMARY KEY (id_user)
);

CREATE TABLE lesions (
	id_lesion BIGINT NOT NULL IDENTITY,
	name VARCHAR(255) NOT NULL,
	id_owner BIGINT NOT NULL,
	PRIMARY KEY (id_lesion)
);

CREATE TABLE photos (
	id_photo BIGINT NOT NULL IDENTITY,
	id_lesion BIGINT NOT NULL,
	name VARCHAR(255) NOT NULL,
	creation_timestamp BIGINT NOT NULL,
	description VARCHAR(1024),
	blob_name VARCHAR(1024),
	PRIMARY KEY (id_photo)
);

CREATE TABLE reminders (
	id_reminder BIGINT NOT NULL IDENTITY,
	id_lesion BIGINT NOT NULL,
	target_timestamp BIGINT NOT NULL,
	is_autorenew BIT NOT NULL,
	auto_renew_length BIGINT,
	PRIMARY KEY (id_reminder)
);

CREATE TABLE user_has_photos (
	id_photo BIGINT NOT NULL,
	id_user BIGINT NOT NULL,
	PRIMARY KEY (id_photo, id_user)
);

ALTER TABLE photos
ADD FOREIGN KEY (id_lesion) REFERENCES lesions(id_lesion);

ALTER TABLE lesions
ADD FOREIGN KEY (id_owner) REFERENCES users(id_user);

ALTER TABLE reminders
ADD FOREIGN KEY (id_lesion) REFERENCES lesions(id_lesion);

ALTER TABLE user_has_photos
ADD FOREIGN KEY (id_photo) REFERENCES photos(id_photo);

ALTER TABLE user_has_photos
ADD FOREIGN KEY (id_user) REFERENCES users(id_user);
