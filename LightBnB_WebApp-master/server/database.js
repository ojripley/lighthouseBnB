// // const properties = require('./json/properties.json');
// const users = require('./json/users.json');
const { Pool } = require('pg');

const pool = new Pool({
  user: 'rips',
  password: 'ripsj',
  host: 'localhost',
  database: 'bnb'
});

/// Users

/**
 * Get a single user from the database given their email.
 * @param {String} email The email of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithEmail = function(email) {
  
  const queryVars = [email];

  return pool.query(`
    SELECT *
    FROM users
    WHERE users.email = $1
  `, queryVars)
    .then(res => {
      return res.rows[0];
    })
    .catch(error => {
      console.log(`query error: ${error.stack}`);
    });
};
exports.getUserWithEmail = getUserWithEmail;


/**
 * Get a single user from the database given their id.
 * @param {string} id The id of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithId = function(id) {
  const queryVars = [id];

  return pool.query(`
    SELECT *
    FROM users
    WHERE id = $1
  `, queryVars)
    .then(res => {
      return res.rows[0];
    })
    .catch(error => {
      console.log(`query error: ${error.stack}`);
    });
};
exports.getUserWithId = getUserWithId;


/**
 * Add a new user to the database.
 * @param {{name: string, password: string, email: string}} user
 * @return {Promise<{}>} A promise to the user.
 */
const addUser =  function(user) {
  
  const queryVars = [user.name, user.email, user.password];
  
  return pool.query(`
  INSERT INTO users (name, email, password)
  VALUES($1, $2, $3)
  RETURNING *;
  `, queryVars)
    .then(res => {
      return res;
    })
    .catch(error => {
      console.log(`query error: ${error.stack}`);
    });
};
exports.addUser = addUser;



/// Reservations

/**
 * Get all reservations for a single user.
 * @param {string} guest_id The id of the user.
 * @return {Promise<[{}]>} A promise to the reservations.
 */
const getAllReservations = function(guestId, limit = 10) {
  
  let queryVars = [guestId, limit];
  
  return pool.query(`
    SELECT reservations.*, properties.*, avg(property_reviews.rating) as average_rating
    FROM reservations
    JOIN properties ON reservations.property_id = properties.id
    JOIN property_reviews ON reservations.id = reservation_id
    WHERE reservations.guest_id = $1 
    AND reservations.end_date < now()::date
    GROUP BY reservations.id, properties.id
    ORDER BY average_rating desc
    LIMIT $2
  `, queryVars)
    .then(res => {
      return res.rows;
    })
    .catch(error => {
      console.error(`query error ${error.stack}`);
    });
};
exports.getAllReservations = getAllReservations;



/// Properties

/**
 * Get all properties.
 * @param {{}} options An object containing query options.
 * @param {*} limit The number of results to return.
 * @return {Promise<[{}]>}  A promise to the properties.
 */
const getAllProperties = function(options, limit = 10) {
  
  const queryVars = [];

  let queryString = `SELECT properties.*, avg(property_reviews.rating) as average_rating
  FROM properties
  JOIN property_reviews ON properties.id = property_id `;

  if (options.city) {
    queryVars.push(`%${options.city}%`);
    queryString += `WHERE city LIKE $${queryVars.length} `;
  }

  if (options.owner_id) {
    queryVars.push(`${options.owner_id}`);
    queryString += `WHERE owner_id LIKE $${queryVars.length} `;
  }

  if (options.minimum_price_per_night) {
    queryVars.push(`${options.minimum_price_per_night * 100}`);
    queryString += `AND cost_per_night >= $${queryVars.length} `;
  }

  if (options.maximum_price_per_night) {
    queryVars.push(`${options.maximum_price_per_night * 100}`);
    queryString += `AND cost_per_night <= $${queryVars.length} `;
  }

  queryString += `
  GROUP BY properties.id `;

  if (options.minimum_rating) {
    queryVars.push(`${options.minimum_rating}`);
    queryString += `HAVING avg(property_reviews.rating) >= $${queryVars.length} `;
  }

  queryVars.push(limit);
  queryString += `
  ORDER BY cost_per_night
  LIMIT $${queryVars.length};
  `;

  return pool.query(queryString, queryVars)
    .then(res => {
      return res.rows;
    })
    .catch(error => {
      console.log(`query error ${error.stack}`);
    });
};
exports.getAllProperties = getAllProperties;








/**
 * Add a property to the database
 * @param {{}} property An object containing all of the property details.
 * @return {Promise<{}>} A promise to the property.
 */
const addProperty = function(property) {
  
  const queryVars = Object.keys(property).map((key) => {
    return property[key];
  });
 
  console.log(property);


  return pool.query(`
    INSERT INTO properties ( 
      title, 
      description,
      number_of_bathrooms,
      number_of_bedrooms,
      parking_spaces,
      cost_per_night,
      thumbnail_photo_url,
      cover_photo_url,
      street,
      country,
      city,
      province,
      post_code,
      owner_id
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
      RETURNING *;
  `, queryVars)
    .then(res => {
      return res.rows;
    })
    .catch(error => {
      console.error(`query error ${error.stack}`);
    });


  
  
  
  
  
  // const propertyId = Object.keys(properties).length + 1;
  // property.id = propertyId;
  // properties[propertyId] = property;
  // return Promise.resolve(property);
};
exports.addProperty = addProperty;
