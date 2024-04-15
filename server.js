// server.js
const moment = require('moment');
const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');

const app = express();

app.use(cors());
app.use(express.json());

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'bermet', 
  database: 'rooms', 
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
  } else {
    console.log('Connected to MySQL database');
  }
});

const dateFormat = 'YYYY-MM-DD'

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

  // Check if the date is a valid date string
  if (!date || !moment(date, dateFormat, true).isValid()) {
    return res.status(400).json({ error: 'Invalid date format. Use YYYY-MM-DD.' })
  }

  // Check if the room is already booked on the selected date
  const checkBookingSql = 'SELECT * FROM room WHERE name = ? AND date = ?';
  connection.query(checkBookingSql, [room, date], (checkErr, checkResults) => {
    if (checkErr) {
      console.error('Error checking booking:', checkErr);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      if (checkResults.length > 0) {
        res.status(400).json({ error: 'Room already booked on this date' });
      } else {
        // Insert the new booking
        const insertBookingSql = 'INSERT INTO room (name, date) VALUES (?, ?)';
        connection.query(insertBookingSql, [room, date], (insertErr, insertResults) => {
          if (insertErr) {
            console.error('Error booking room:', insertErr);
            res.status(500).json({ error: 'Internal Server Error' });
          } else {
            res.json({ message: 'Booking successful!' });
          }
        });
      }
    }
  });
});

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
