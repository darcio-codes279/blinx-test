CREATE DATABASE health_apps;

USE health_apps;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    created TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    firstname VARCHAR(100) NOT NULL,
    lastname VARCHAR(100) NOT NULL,
    gender VARCHAR(100) NOT NULL,
    age INTEGER NOT NULL,
    health_condition VARCHAR(100) NOT NULL,
    health_symptoms VARCHAR(100),
    symptomsList VARCHAR(100)
    chronic_illness VARCHAR(100),
);

INSERT INTO users (firstname, lastname, gender, age, health_condition, health_symptoms) 
VALUES ('John', 'Doe', 'male', 30, 'healthy', '');