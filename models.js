const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Konfiguracja bazy danych
const db = mysql.createConnection({
    host: "localhost", //IP serwera
    user: "root", // użytkownika MySQL
    password: "password", // hasło MySQL
    database: "pizzeria_db"
});

// Połączenie z bazą danych
db.connect(err => {
    if (err) {
        console.error("Błąd połączenia z MySQL:", err);
        return;
    }
    console.log("Połączono z bazą danych MySQL");
});

// Tworzenie zamówienia
app.post("/api/zamowienia", (req, res) => {
    const { imie, telefon, adres, pizza, ilosc } = req.body;
    const sql = "INSERT INTO zamowienia (imie, telefon, adres, pizza, ilosc) VALUES (?, ?, ?, ?, ?)";
    db.query(sql, [imie, telefon, adres, pizza, ilosc], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ message: "Zamówienie przyjęte", id: result.insertId });
    });
});

// Pobieranie wszystkich zamówień
app.get("/api/zamowienia", (req, res) => {
    db.query("SELECT * FROM zamowienia", (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
});

// Start serwera
app.listen(PORT, () => {
    console.log(`Serwer działa na http://localhost:${PORT}`);
});
