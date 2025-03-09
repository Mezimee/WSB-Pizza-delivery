CREATE DATABASE pizzeria_db;
USE pizzeria_db;

CREATE TABLE zamowienia (
    id INT AUTO_INCREMENT PRIMARY KEY,
    imie VARCHAR(100) NOT NULL,
    telefon VARCHAR(20) NOT NULL,
    adres TEXT NOT NULL,
    godzina_dostawy TIME NULL,
    zamowienie JSON NOT NULL,
    data_zamowienia TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
