import React, { useState, useEffect } from 'react';
import axios from 'axios';

const RoomList = () => {
  const [rooms, setRooms] = useState([]);
  const [selectedDate, setSelectedDate] = useState('');

  const fetchAvailableRooms = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/rooms', {
        params: {
          date: selectedDate,
        },
      });
      setRooms(response.rooms);
    } catch (error) {
      console.error('Error fetching available rooms:', error.response.error);
    }
  };

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
      console.log(response.data.message);
    } catch (error) {
      console.error('Error booking room:', error.response.data.error);
    }
  };

  return (
    <div>
      <h2>Available Rooms</h2>
      <p>Select a date from calendar to view available room</p>
      <input
        type="date"
        value={selectedDate}
        onChange={(e) => setSelectedDate(e.target.value)}
      />
      <ul>
        {rooms.map((room) => (
          <li key={room.id}>
            {room.name}
            {' '}
            <button onClick={() => handleBooking(room.name)}>Book</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RoomList;
