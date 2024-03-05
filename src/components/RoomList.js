// RoomList.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const RoomList = () => {
  const [rooms, setRooms] = useState([]);
  const [selectedDate, setSelectedDate] = useState('');

  useEffect(() => {
    const fetchAvailableRooms = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/available-rooms?date=${selectedDate}`);
        setRooms(response.data);
      } catch (error) {
        console.error('Error fetching available rooms:', error);
      }
    };

    if (selectedDate) {
      fetchAvailableRooms();
    }
  }, [selectedDate]);

  return (
    <div>
      <h2>Available Rooms</h2>
      <p>Select a date to view available rooms:</p>
      <input
        type="date"
        value={selectedDate}
        onChange={(e) => setSelectedDate(e.target.value)}
      />
      <ul>
        {rooms.map((room) => (
          <li key={room.id}>{room.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default RoomList;
