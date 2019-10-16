-- SELECT reservations.id as res_id, properties.id as prop_id, avg(property_reviews.rating) as average_rating
-- FROM reservations
-- JOIN properties ON reservations.property_id = properties.id
-- JOIN property_reviews ON reservations.id = reservation_id
-- WHERE reservations.guest_id = 1
-- GROUP BY reservations.id, properties.id
-- ORDER BY average_rating desc
-- LIMIT 10;

SELECT reservations.*, properties.*, avg(property_reviews.rating) as average_rating
FROM reservations
JOIN properties ON reservations.property_id = properties.id
JOIN property_reviews ON reservations.id = reservation_id
WHERE reservations.guest_id = 1 
AND reservations.end_date < now()::date
GROUP BY reservations.id, properties.id
ORDER BY average_rating desc
LIMIT 10;