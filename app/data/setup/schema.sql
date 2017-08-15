
CREATE DATABASE songGameDB;

USE songGameDB;

CREATE TABLE songs
(
id int NOT NULL AUTO_INCREMENT,
song varchar(255) NOT NULL,
artist varchar(255) NOT NULL,
genre varchar(255) NOT NULL,
clip varchar(255),
PRIMARY KEY (id)
);

CREATE TABLE users
(
id int NOT NULL AUTO_INCREMENT,
username varchar(255) NOT NULL,
userID int NOT NULL,
firstName varchar(255),
lastName varchar(255),
email varchar(255),
PRIMARY KEY (id)
);
