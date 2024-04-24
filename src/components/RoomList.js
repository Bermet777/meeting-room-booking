import React, { useState, useEffect } from 'react';
import axios from 'axios';

const RoomList = () => {
  const [rooms, setRooms] = useState([]);
  const [selectedDate, setSelectedDate] = useState('');
  const [error, setError] = useState('');
  const [bookingStatus, setBookingStatus] = useState('');

  const fetchAvailableRooms = async () => {
    try {
      const response = await axios.get('/api/available-rooms', {
        params: {
          date: selectedDate,
        },
      });
      setRooms(response.data);
    } catch (err) {
      handleError(err);
    }
  };

  const handleError = (err) => {
    const errorMessage = err.response?.data?.error || 'An error occurred.';
    setError(errorMessage);
    console.error('Error:', errorMessage);
  };

  useEffect(() => {
    if (selectedDate) {
      fetchAvailableRooms();
    }
  }, [selectedDate]);

  const bookRoom = async (room) => {
    try {
      const response = await axios.post('/api/bookings', {
        room,
        date: selectedDate,
      });
      setBookingStatus(response.data.message);
      setError('');
    } catch (err) {
      setBookingStatus('');
      handleError(err);
    }
  };

  return (
    <div>
      <h2>Available Rooms</h2>
      <p>Select a date to view available room:</p>
      <input
        type="date"
        value={selectedDate}
        onChange={(e) => setSelectedDate(e.target.value)}
      />
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ul>
        {rooms.map((room) => (
          <li key={room.id}>
            {room.name} <button onClick={() => bookRoom(room.name)}>Book</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RoomList;
