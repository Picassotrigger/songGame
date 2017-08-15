CREATE DATABASE songGameDB;
USE songGameDB;

CREATE TABLE songs
(
	id int NOT NULL AUTO_INCREMENT,
	song varchar(255) NOT NULL,
  artist varchar(255) NOT NULL,
  clip varchar(255),
  genre varchar(255) NOT NULL,
	PRIMARY KEY (id)
);

CREATE TABLE users
(
	id int NOT NULL AUTO_INCREMENT,
	username varchar(255) NOT NULL,
	user_id int NOT NULL,
	first_name varchar(255) NOT NULL,
	last_name varchar(255) NOT NULL,
  email varchar(255) NOT NULL,
	PRIMARY KEY (id),
);
