drop database if exists eyewear;
create database eyewear;
use eyewear;

DROP TABLE IF EXISTS eyewear;
CREATE TABLE eyewear
(id int NOT NULL PRIMARY KEY,
category varchar(255) not null,
name varchar(255) not null,
price float NOT NULL,
url varchar(255) NOT NULL
);
