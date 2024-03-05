// server.js
const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.json());

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'bermet',
  database: 'rooms', 
  port: 3306,
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
  } else {
    console.log('Connected to MySQL database');
  }
});

// API endpoint to get room availability
app.get('/api/available-rooms', (req, res) => {
  const { date } = req.query;
  const sql = 'SELECT * FROM room WHERE date IS NULL OR date != ?';
  connection.query(sql, [date], (err, results) => {
    if (err) {
      console.error('Error fetching available rooms:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.json(results);
    }
  });
});

// API endpoint to book a room
app.post('/api/bookings', (req, res) => {
  const { room, date } = req.body;
  const sql = 'INSERT INTO room (name, date) VALUES (?, ?)'; // Update table name to 'room'
  connection.query(sql, [room, date], (err, results) => {
    if (err) {
      console.error('Error booking room:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.json({ message: 'Booking successful!' });
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
