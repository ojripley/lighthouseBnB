DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS properties CASCADE;
DROP TABLE IF EXISTS reservations CASCADE;
DROP TABLE IF EXISTS property_reviews CASCADE;


CREATE TABLE users(
  id SERIAL PRIMARY KEY NOT NULL,

  name VARCHAR(255),
  email VARCHAR(255),
  password (VARCHAR(255)
);

CREATE TABLE properties(
  id SERIAL PRIMARY KEY NOT NULL,
  owner_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,

  title VARCHAR(255) NOT NULL,
  description TEXT,
  thumbnail_url TEXT NOT NULL,
  image_url TEXT NOT NULL,
  cost_per_night SMALLINT,

  street VARCHAR(255),
  city VARCHAR(255),
  province VARCHAR(255),
  country VARCHAR(255),
  postal_code VARCHAR(255),

  number_of_bedrooms SMALLINT NOT NULL DEFAULT 0,
  number_of_bathrooms SMALLINT NOT NULL DEFAULT 0,
  parking_spaces SMALLINT NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT TRUE
);

CREATE TABLE reservations(
  id SERIAL PRIMARY KEY NOT NULL,
  property_id INTEGER NOT NULL REFERENCES property(id) ON DELETE CASCADE,
  guest_id INTEGER NOT NULL REFERENCES user(id) ON DELETE CASCADE,

  start_date TIMESTAMP NOT NULL,
  end_date TIMESTAMP NOT NULL
);

CREATE TABLE property_reviews(
  id SERIAL PRIMARY KEY NOT NULL,
  property_id INTEGER NOT NULL REFERENCES property(id) ON DELETE CASCADE,
  guest_id INTEGER NOT NULL REFERENCES user(id) ON DELETE CASCADE,
  reservation_id INTEGER NOT NULL REFERENCES reservations(id) ON DELETE CASCADE,

  rating SMALLINT NOT NULL DEFAULT 0,
  message TEXT
);