SELECT * FROM users
DELETE;

SELECT * FROM properties
DELETE;

SELECT * FROM reservations
DELETE;

SELECT * FROM property_reviews
DELETE;

INSERT INTO users (name, email, password)
VALUES ('Patrick', 'p@mail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u'),
('Morgan', 'm@mail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u'),
('Finley', 'f@mail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u');

INSERT INTO properties (owner_id, title, description, thumbnail_url, image_url, cost_per_night, street, city, province, country, postal_code, number_of_bedrooms, number_of_bathrooms, parking_spaces, is_active) 
VALUES (1, 'title', 'description', 'thumbnail.url', 'image.url', 42, 'road', 'town', 'territory', 'the North', 'N0P1A0', 2, 3, 1, false),
(2, 'title', 'description', 'thumbnail.url', 'image.url', 42, 'road', 'town', 'territory', 'the North', 'N0P2A0', 2, 3, 1, true),
(3, 'title', 'description', 'thumbnail.url', 'image.url', 42, 'road', 'town', 'territory', 'the North', 'N0P3A0', 2, 3, 1, false);

INSERT INTO reservations (guest_id, property_id, start_date, end_date) 
VALUES (2, 1, '2018-09-11', '2018-09-26'),
(3, 2, '2019-1-04', '2019-1-07'),
(1, 3, '2021-10-01', '2021-10-14');

INSERT INTO property_reviews (guest_id, reservation_id, property_id, rating, message)
VALUES (2, 1, 1, 5, 'message'),
(3, 2, 2, 4, 'message');