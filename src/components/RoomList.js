// src/components/RoomList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const RoomList = () => {
  const [rooms, setRooms] = useState([]);
  const [selectedDate, setSelectedDate] = useState('');

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/rooms?date=${selectedDate}`);
        setRooms(response.data);
      } catch (error) {
        console.error('Error fetching rooms:', error);
      }
    };

    fetchRooms();
  }, [selectedDate]);

  return (
    <div>
      <h2>Available Rooms</h2>
      <label>
        Select Date:
        <input type="date" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} />
      </label>
      <ul>
        {rooms.map((room) => (
          <li key={room.id}>
            {room.name} - {room.isAvailable ? 'Available' : 'Booked'}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RoomList;
