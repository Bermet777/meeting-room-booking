// src/components/BookingForm.js
import React, { useState } from 'react';
import axios from 'axios';

const BookingForm = () => {
  const [selectedRoom, setSelectedRoom] = useState('');
  const [bookingDate, setBookingDate] = useState('');
  const [bookingStatus, setBookingStatus] = useState('');

  const handleBooking = async () => {
    try {
      await axios.post('http://localhost:3001/api/bookings', {
        room: selectedRoom,
        date: bookingDate,
      });
      setBookingStatus('Booking successful!');
    } catch (error) {
      console.error('Error booking room:', error);
      setBookingStatus('Error booking room. Please try again');
    }
  };

  return (
    <div>
      <h2>Book a Room</h2>
      <label>
        Select a Room:
        <select value={selectedRoom} onChange={(e) => setSelectedRoom(e.target.value)}>
          <option value="room1">Room 1</option>
          <option value="room2">Room 2</option>
          <option value="room3">Room 3</option>
          <option value="room4">Room 4</option>
        </select>
      </label>
      <br />
      <label>
        Booking Date:
        <input type="date" value={bookingDate} onChange={(e) => setBookingDate(e.target.value)} />
      </label>
      <br />
      <button onClick={handleBooking}>Book Now</button>
      {bookingStatus && <p>{bookingStatus}</p>}
    </div>
  );
};

export default BookingForm;
