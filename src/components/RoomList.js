import React, { useState, useEffect } from 'react';
import axios from 'axios';

const RoomList = () => {
  const [rooms, setRooms] = useState([]);
  const [selectedDate, setSelectedDate] = useState('');
  const [error, setError] = useState('');

  const fetchAvailableRooms = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/available-rooms', {
        params: {
          date: selectedDate,
        },
      });
      setRooms(response.data);
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        console.error('Error fetching available rooms:', error.response.data.error);
      } else {
        console.error('Error fetching available rooms:', error);
      }
    }
  }

  useEffect(() => {
    if (selectedDate) {
      fetchAvailableRooms();
    }
  }, [selectedDate]);

  const handleBooking = async (room) => {
    try {
      const response = await axios.post('http://localhost:3001/api/bookings', {
        room,
        date: selectedDate,
      });
      setBookingStatus(response.data.message);
      setError(''); 
    } catch (error) {
      setBookingStatus('');
      setError(
        error.response?.data?.error || 'An error occurred while booking the room.'
      )
    }
    
  }

  return (
    <div>
      <h2>Available Rooms</h2>
      <p>Select a date from calendar to view available rooms</p>
      <input
        type="date"
        value={selectedDate}
        onChange={(e) => setSelectedDate(e.target.value)}
      />
      {error && <p style={{ color: 'red' }}>{error}</p>} {"Error"}
      <ul>
        {rooms.map((room) => (
          <li key={room.id}>
            {room.name}
            {' '}
            <button onClick={() => handleBooking(room.name)}>Book room</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RoomList;
